const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ozdraviapp-be.onrender.com:8080",
      changeOrigin: true,
    })
  );
};