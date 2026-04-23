/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee from '@notifee/react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {onNotifeeBackgroundEvent} from './src/services/notifications';

notifee.onBackgroundEvent(onNotifeeBackgroundEvent);

AppRegistry.registerComponent(appName, () => App);
