import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store, { persistor } from './store';
import LoadingOverlay from './components/LoadingOverlay';
import { RootState } from '@/store';
import BookingCalendarScreen from './pages/booking';
import BottomTabBar from './navigation/bottomTabBar';
import HomeScreen from './pages/home';
import InstructorsScreen from './pages/instractors';
import RegistrationScreen from './pages/registration';
import ReservationsScreen from './pages/reservations';
import ReservationConfirmationScreen from './pages/reservationConfirmation';
import ProfileScreen from './pages/profile';
import LoginScreen from './pages/login';
import ResetPasswordScreen from './pages/resetPassword/index';
import NewPasswordScreen from './pages/newPassword/index';
import { initializeNotifications } from './services/notifications';
import toastConfig from './utils/customToast';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const linking: LinkingOptions<any> = {
  prefixes: ['siya9ati://', 'https://17e3-41-249-136-184.ngrok-free.app/'],
  config: {
    screens: {
      Home: 'home',
      Instructors: 'instructors',
      Booking: 'booking',
      Registration: 'registration',
      ReservationConfirmation: 'reservation-confirmation/:bookingId',
      Login: 'login',
      ResetPassword: 'reset-password',
      NewPassword: 'reset-password/:token',
    },
  },
};

const renderBottomTabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />;

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={renderBottomTabBar}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="reservations" component={ReservationsScreen} />
      <Tab.Screen name="moi" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppContent(): React.JSX.Element {
  const loading = useSelector((state: RootState) => state.instructor?.loading);

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabNavigator}/>
          <Stack.Screen name="Instructors" component={InstructorsScreen}/>
          <Stack.Screen name="Booking" component={BookingCalendarScreen}/>
          <Stack.Screen name="Registration" component={RegistrationScreen}/>
          <Stack.Screen name="ReservationConfirmation" component={ReservationConfirmationScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
          <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      <LoadingOverlay visible={loading} />
    </SafeAreaProvider>
  );
}

function App(): React.JSX.Element {
  useEffect(() => {
    initializeNotifications().catch(error => {
      console.warn('Failed to initialize notifications:', error);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}

export default App;
