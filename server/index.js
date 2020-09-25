import mongoose from 'mongoose';
import next from 'next';
import path from 'path';
import app from './app';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV === 'development';
const server = next({ dev, dir: path.join(__dirname, '..') });
const handle = server.getRequestHandler();

(async function main() {
  try {
    await server.prepare();
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    app.use(async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
    });

    app.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}());
