const { createProxyMiddleware } = require("http-proxy-middleware");
const { API_URL } = require("./components/Config");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: `${API_URL}`,
      changeOrigin: true,
    })
  );
};
