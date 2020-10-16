import Router from 'koa-router';
import { baseController } from '../controllers';
import { deductBalance, getTotalCost } from '../utils';

const baseRouter = new Router();
const {
  addNewLocation, getOrders, getRouteUrl, getShopData,
} = baseController;

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

baseRouter.get('/orders', async (ctx) => {
  const { shop, accessToken } = ctx.session;
  const { cursor } = ctx.query;
  const orders = await getOrders(shop, accessToken, cursor);
  ctx.status = 200;
  ctx.body = JSON.stringify(orders);
});

baseRouter.post('/route', async (ctx) => {
  const { shop } = ctx.session;
  const { origin, destination, waypoints } = ctx.request.body;
  const routeUrl = await getRouteUrl({ origin, destination, waypoints });
  const totalCost = getTotalCost(waypoints);
  const balance = await deductBalance(shop, -totalCost);
  ctx.status = 200;
  ctx.body = JSON.stringify({ balance, routeUrl });
});

export default baseRouter;
