import * as Sentry from '@sentry/node';

const { NODE_ENV, SENTRY_DSN } = process.env;
const isProduction = NODE_ENV === 'production';

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: isProduction,
});

export default Sentry;
