import Router from 'koa-router';
import { receiveWebhook } from '@shopify/koa-shopify-webhooks';
import { webhookController } from '../controllers';

const router = new Router();
const webhook = receiveWebhook({
  secret: process.env.SHOPIFY_API_SECRET,
});

router
  .post('/webhooks/customers/redact', webhook, async (ctx) => {
    ctx.status = 200;
  })
  .post('/webhooks/shop/redact', webhook, async (ctx) => {
    ctx.status = 200;
    const { payload } = ctx.state.webhook;
    await webhookController.archiveShopData(payload.shop_domain);
  })
  .post('/webhooks/customers/data-request', webhook, async (ctx) => {
    ctx.status = 200;
  });

export default router;
