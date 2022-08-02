function setupProxy({ tls }) {
  const conf = [
    {
      context: [
        '/api',
        '/services',
        '/management',
        '/swagger-resources',
        '/v2/api-docs',
        '/v3/api-docs',
        '/h2-console',
        '/auth',
        '/health',
      ],
      // target: `http${tls ? 's' : ''}://localhost:8980`,
      target: process.env.SERVER_API_URL_URL,
      secure: false,
      changeOrigin: tls,
    },
    {
      context: ['/websocket'],
      // target: 'ws://127.0.0.1:8980',
      target: process.env.SERVER_API_WS_URL,
      ws: true,
    },
  ];
  return conf;
}

module.exports = setupProxy;
