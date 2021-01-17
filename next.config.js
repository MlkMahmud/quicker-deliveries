module.exports = {
  env: {
    API_KEY: process.env.SHOPIFY_API_KEY,
    BASE_URL: process.env.BASE_URL,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    return config;
  },
};
