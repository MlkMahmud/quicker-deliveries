import Router from 'koa-router';
import baseRouter from './baseRouter';
import billingRouter from './billingRouter';

const router = new Router();
router.use(baseRouter.routes());
router.use(baseRouter.allowedMethods());
router.use(billingRouter.routes());
router.use(billingRouter.allowedMethods());

export default router;
