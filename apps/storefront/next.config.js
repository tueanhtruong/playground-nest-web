const path = require('path');

module.exports = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
