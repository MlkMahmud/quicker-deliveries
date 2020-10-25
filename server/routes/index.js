import Router from 'koa-router';
import baseRouter from './baseRouter';
import billingRouter from './billingRouter';
import webhookRouter from './webhookRouter';

const router = new Router();
router.use(baseRouter.routes());
router.use(baseRouter.allowedMethods());
router.use(billingRouter.routes());
router.use(billingRouter.allowedMethods());
router.use(webhookRouter.routes());
router.use(webhookRouter.allowedMethods());

export default router;
