/*
 * Erp System - Mark II No 19 (Baruch Series)
 * Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
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
