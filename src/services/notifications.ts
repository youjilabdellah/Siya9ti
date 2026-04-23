import {Platform} from 'react-native';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';

const DEFAULT_CHANNEL_ID = 'default';

let notificationSystemReady = false;

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

  await createDefaultChannel();
  await requestNotificationPermission();
  notificationSystemReady = true;
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
