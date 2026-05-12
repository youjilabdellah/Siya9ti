/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import {name as appName} from './app.json';
import {
	handleIncomingRemoteMessage,
	onNotifeeBackgroundEvent,
} from './src/services/notifications';


notifee.onBackgroundEvent(onNotifeeBackgroundEvent);

if (Platform.OS === 'android') {
	messaging().setBackgroundMessageHandler(async remoteMessage => {
		await handleIncomingRemoteMessage(remoteMessage);
	});
}
AppRegistry.registerComponent(appName, () => App);
