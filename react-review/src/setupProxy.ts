const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  app.use('/api', createProxyMiddleware({
    target: 'https://api.football-data.org/v4',
    changeOrigin: true,
    headers: {
      'X-Auth-Token': 'bb7ff2b2ebc34e639ed557d487951f77', 
    },
  }));
};