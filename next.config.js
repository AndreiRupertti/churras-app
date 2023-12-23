const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ["pg-mem"], serverActions: true },
  webpack(config, { isServer }) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;


    if (isServer) {
      // pg-mem workarounds
      config.externals.push({
        knex: 'commonjs knex'
      })
      config.externals.push('slonik')
      config.externals.push('pg-promise')
      config.externals.push('mikro-orm')
      config.externals.push('node-postgres')
      config.externals.push('kysely')

    }
    return config;
  },
};

module.exports = nextConfig;
