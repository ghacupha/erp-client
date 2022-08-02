// We sometimes use this server on a different port; for testing purposes
const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
// Configure the port of the backend server e.g. on unix export ERP_SYSTEM_DEV_PORT=8982
const SERVER_PORT=process.env.ERP_SYSTEM_DEV_PORT
const PORT = process.env.ERP_CLIENT_DEV_PORT;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:" + SERVER_PORT;

// Logging
app.use(morgan('dev'));

// You build the app on the dist folder with "ng build --prod --output-path ./dist"
app.use(express.static(__dirname + '/dist'));

// Proxy endpoints
app.use('/*', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
  }),
  function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
