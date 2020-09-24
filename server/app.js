import 'isomorphic-fetch';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import session from 'koa-session';
import createShopifyAuth, { verifyRequest } from '@shopify/koa-shopify-auth';

const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY } = process.env;
const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});
app.use(helmet({ frameguard: false }));
app.use(session({ secure: true, sameSite: 'none' }, app));
app.keys = [SHOPIFY_API_SECRET];
app.use(
  createShopifyAuth({
    apiKey: SHOPIFY_API_KEY,
    secret: SHOPIFY_API_SECRET,
    scopes: ['read_orders'],
    async afterAuth(ctx) {
      const { shop } = ctx.session;
      ctx.cookies.set('shopOrigin', shop, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });
      ctx.redirect('/');
    },
  }),
);

app.use(verifyRequest());
app.use(bodyParser());

export default app;
