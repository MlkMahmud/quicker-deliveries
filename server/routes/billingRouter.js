import Router from 'koa-router';
import { billingController } from '../controllers';

const billingRouter = new Router();
const { createCharge, getCharge, topUpBalance } = billingController;

billingRouter
  .get('/charge', async (ctx) => {
    const { shop, accessToken } = ctx.session;
    const { charge_id: id } = ctx.query;
    const { price, status } = await getCharge(shop, accessToken, id);
    if (status === 'active') {
      await topUpBalance(shop, +price);
    }
    ctx.redirect('/');
  })
  .post('/charge', async (ctx) => {
    const { shop, accessToken } = ctx.session;
    const { price } = ctx.request.body;

    const {
      appPurchaseOneTimeCreate: { confirmationUrl },
    } = await createCharge(shop, accessToken, price);

    ctx.status = 200;
    ctx.body = JSON.stringify({
      confirmationUrl: confirmationUrl.slice(`https://${shop}/admin`.length),
    });
  });

export default billingRouter;
