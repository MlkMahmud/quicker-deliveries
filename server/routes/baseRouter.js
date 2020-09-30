import Router from 'koa-router';
import { baseController } from '../controllers';

const baseRouter = new Router();
const { addNewLocation, getShopData } = baseController;

baseRouter.get('/shop', async (ctx) => {
  const { shop } = ctx.session;
  const data = await getShopData(shop);
  ctx.status = 200;
  ctx.body = JSON.stringify(data);
});

baseRouter.post('/location', async (ctx) => {
  const { shop } = ctx.session;
  const { address, latLng } = ctx.request.body;
  const location = await addNewLocation(shop, { address, latLng });
  ctx.status = 201;
  ctx.body = JSON.stringify(location);
});

export default baseRouter;
