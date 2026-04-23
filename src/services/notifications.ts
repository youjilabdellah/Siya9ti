import {Platform} from 'react-native';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

const DEFAULT_CHANNEL_ID = 'default';

let notificationSystemReady = false;
let foregroundMessageUnsubscribe: (() => void) | null = null;

function toNotificationData(
  data?: FirebaseMessagingTypes.RemoteMessage['data'],
): {[key: string]: string} | undefined {
  if (!data) {
    return undefined;
  }

  const normalizedData: {[key: string]: string} = {};

  Object.entries(data).forEach(([key, value]) => {
    normalizedData[key] = value ?? '';
  });

  return normalizedData;
}

async function displayRemoteMessage(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> {
  const channelId = await createDefaultChannel();

  await notifee.displayNotification({
    title: remoteMessage.notification?.title ?? 'Siya9ati',
    body: remoteMessage.notification?.body ?? '',
    data: toNotificationData(remoteMessage.data),
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
  });
}

export async function handleIncomingRemoteMessage(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> {
  // Avoid duplicate system tray entries when FCM includes a notification payload.
  if (Platform.OS === 'android' && remoteMessage.notification) {
    return;
  }

  await displayRemoteMessage(remoteMessage);
}

export function unsubscribeNotificationListeners(): void {
  if (foregroundMessageUnsubscribe) {
    foregroundMessageUnsubscribe();
    foregroundMessageUnsubscribe = null;
  }
}

export async function createDefaultChannel(): Promise<string> {
  if (Platform.OS !== 'android') {
    return DEFAULT_CHANNEL_ID;
  }

  return notifee.createChannel({
    id: DEFAULT_CHANNEL_ID,
    name: 'General',
    importance: AndroidImportance.HIGH,
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();

  return (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  );
}

export async function initializeNotifications(): Promise<void> {
  if (notificationSystemReady) {
    return;
  }

  await messaging().registerDeviceForRemoteMessages();
  await createDefaultChannel();
  await requestNotificationPermission();

  foregroundMessageUnsubscribe = messaging().onMessage(async remoteMessage => {
    await handleIncomingRemoteMessage(remoteMessage);
  });

  notificationSystemReady = true;
}

export async function getFcmToken(): Promise<string | null> {
  try {
    const token = await messaging().getToken();
    return token ?? null;
  } catch (error) {
    console.warn('Failed to get FCM token:', error);
    return null;
  }
}

export async function displayLocalNotification(params?: {
  title?: string;
  body?: string;
  data?: {[key: string]: string | number | object};
}): Promise<void> {
  const channelId = await createDefaultChannel();

  await notifee.displayNotification({
    title: params?.title ?? 'Siya9ati',
    body: params?.body ?? 'Notification test',
    data: params?.data,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        banner: true,
        list: true,
        sound: true,
      },
    },
  });
}

export async function onNotifeeBackgroundEvent({
  type,
  detail,
}: {
  type: EventType;
  detail: {
    notification?: unknown;
    pressAction?: unknown;
  };
}): Promise<void> {
  if (type === EventType.PRESS) {
    console.log('Notification pressed in background:', detail.notification);
  }

  if (type === EventType.ACTION_PRESS) {
    console.log('Notification action pressed in background:', detail.pressAction);
  }
}
