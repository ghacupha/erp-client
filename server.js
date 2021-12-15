const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
// Configuration
const PORT = 8981;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:8980";

// Logging
app.use(morgan('dev'));

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
