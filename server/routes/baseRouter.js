import Router from 'koa-router';
import { baseController } from '../controllers';

const baseRouter = new Router();

baseRouter.get('/shop', async (ctx) => {
  const { shop } = ctx.session;
  const data = await baseController.getShopData(shop);
  ctx.status = 200;
  ctx.body = JSON.stringify(data);
});

export default baseRouter;
