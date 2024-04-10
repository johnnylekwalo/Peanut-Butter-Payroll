// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/employees', // Specify the API endpoint you want to proxy
        createProxyMiddleware({
            target: 'http://localhost:5000', // URL of your Node.js server
            changeOrigin: true,
        })
    );
};
