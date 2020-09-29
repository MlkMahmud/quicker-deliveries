import Router from 'koa-router';
import { billingController } from '../controllers';

const billingRouter = new Router();
const { createCharge, verifyCharge } = billingController;

billingRouter
  .get('/charge', async (ctx) => {
    const { shop, accessToken } = ctx.session;
    const { charge_id: id } = ctx.query;
    const paymentIsVerified = await verifyCharge(shop, accessToken, id);
    if (paymentIsVerified) {
      // update user's balance
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
