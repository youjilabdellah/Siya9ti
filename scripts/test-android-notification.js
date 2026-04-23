#!/usr/bin/env node

/**
 * Sends a test Android push notification through Firebase Admin SDK.
 *
 * Required env vars:
 * - FIREBASE_SERVICE_ACCOUNT_PATH: Absolute or relative path to service account json
 * - FCM_DEVICE_TOKEN: Device registration token from the Android app
 *
 * Optional env vars:
 * - FCM_TITLE (default: "Siya9ati test")
 * - FCM_BODY (default: "Android notification test")
 * - FCM_CHANNEL_ID (default: "default")
 */

const path = require('path');
const admin = require('firebase-admin');

function fail(message) {
  console.error(`\n[FCM test] ${message}\n`);
  process.exit(1);
}

async function run() {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  const deviceToken = process.env.FCM_DEVICE_TOKEN;

  if (!serviceAccountPath) {
    fail('Missing FIREBASE_SERVICE_ACCOUNT_PATH.');
  }

  if (!deviceToken) {
    fail('Missing FCM_DEVICE_TOKEN.');
  }

  let serviceAccount;
  try {
    const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
    serviceAccount = require(resolvedPath);
  } catch (error) {
    fail(
      `Unable to read service account file (${serviceAccountPath}): ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const title = process.env.FCM_TITLE || 'Siya9ati test';
  const body = process.env.FCM_BODY || 'Android notification test';
  const channelId = process.env.FCM_CHANNEL_ID || 'default';

  const message = {
    token: deviceToken,
    notification: {
      title,
      body,
    },
    android: {
      priority: 'high',
      notification: {
        channelId,
      },
    },
    data: {
      source: 'manual_test_script',
      sentAt: new Date().toISOString(),
    },
  };

  const messageId = await admin.messaging().send(message);

  console.log('\n[FCM test] Notification sent successfully.\n');
  console.log(`[FCM test] message_id: ${messageId}\n`);
}

run().catch(error => {
  fail(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
});
