import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import LoadingOverlay from './components/LoadingOverlay';
import { RootState } from '@/store';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import HomeScreen from './pages/home';
//import ServicesScreen from './pages/services';
//import BarbersScreen from './pages/barbers';

function AppContent(): React.JSX.Element {
  const loading = useSelector((state: RootState) => state.instructor?.loading);

  return (
    <>
      <HomeScreen />
      <LoadingOverlay visible={loading || false} />
    </>
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
