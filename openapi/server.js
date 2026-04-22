const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const users = {
  'ahmed@example.com': {
    firstName: 'Ahmed',
    lastName: 'Benali',
    email: 'ahmed@example.com',
    phone: '+212612345678',
    password: 'password123', // Hash this in production
  },
};

const resetTokens = {}; // { token: { email, expiresAt } }
const authTokens = {}; // { token: email }

// Helper: Generate token
const generateToken = () => crypto.randomBytes(16).toString('hex');

// Helper: Generate JWT-like token (simplified)
const generateAuthToken = () => crypto.randomBytes(32).toString('hex');

// ────────────────────────────────────────────────────────────────────────────
// Apple App Site Association (for iOS deep linking)
// ────────────────────────────────────────────────────────────────────────────
app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.json({
    applinks: {
      details: [
        {
          appID: '9B6D8A7C.com.barberapp',
          paths: ['*'],
        },
      ],
    },
  });
});

// ────────────────────────────────────────────────────────────────────────────
// Android Asset Links (for Android deep linking)
// ────────────────────────────────────────────────────────────────────────────
app.get('/.well-known/assetlinks.json', (req, res) => {
  res.json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'com.barberapp',
        sha256_cert_fingerprints: [
          'AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88',
        ],
      },
    },
  ]);
});

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:8001',
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({
          error: 'Mock server unavailable',
          detail: err.message,
        });
      },
    },
    // Optional: log which requests hit the mock layer
    logger: console,
  })
);

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n────────────────────────────────────────────────────────`);
  console.log(`🚀 Express API Server running on http://127.0.0.1:${PORT}`);
  console.log(`────────────────────────────────────────────────────────\n`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /.well-known/apple-app-site-association`);
  console.log(`   GET  /.well-known/assetlinks.json`);
  console.log(`   GET  /cities`);
  console.log(`   POST /user/login`);
  console.log(`   POST /user/logout`);
  console.log(`   POST /user/reset-password`);
  console.log(`   POST /user/confirm-password-reset`);
  console.log(`   GET  /health\n`);
});
