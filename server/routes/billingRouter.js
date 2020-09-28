import Router from 'koa-router';
import { billingController } from '../controllers';

const billingRouter = new Router();

billingRouter.post('/charge', async (ctx) => {
  const { shop, accessToken } = ctx.session;
  const { price } = ctx.request.body;

  const {
    appPurchaseOneTimeCreate: { confirmationUrl },
  } = await billingController.createCharge(shop, accessToken, price);

  ctx.status = 200;
  ctx.body = JSON.stringify({
    confirmationUrl: confirmationUrl.slice(`https://${shop}/admin`.length),
  });
});

export default billingRouter;
