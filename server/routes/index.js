import Router from 'koa-router';
import { getShopData } from '../controllers';

const router = new Router();

router.get('/shop', async (ctx) => {
  const { shop } = ctx.session;
  const data = await getShopData(shop);
  ctx.status = 200;
  ctx.body = JSON.stringify(data);
});

export default router;
