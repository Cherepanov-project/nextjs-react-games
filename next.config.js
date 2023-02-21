module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/auth/register',
        destination: 'http://91.241.64.78:8088/api/auth/register', // Proxy to Backend
      },
      {
        source: '/api/auth/token',
        destination: 'http://91.241.64.78:8088/api/auth/token', // Proxy to Backend
      },
    ];
  },
};
