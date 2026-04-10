import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store, { persistor } from './store';
import LoadingOverlay from './components/LoadingOverlay';
import { RootState } from '@/store';
import BookingCalendarScreen from './pages/booking';
import HomeScreen from './pages/home';
import InstructorsScreen from './pages/instractors';


const Stack = createNativeStackNavigator();

function AppContent(): React.JSX.Element {
  const loading = useSelector((state: RootState) => state.instructor?.loading);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Instructors" component={InstructorsScreen}/>
          <Stack.Screen name="Booking" component={BookingCalendarScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      <LoadingOverlay visible={loading} />
    </SafeAreaProvider>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
