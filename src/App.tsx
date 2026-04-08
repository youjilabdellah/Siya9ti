import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import HomeScreen from './pages/home';
//import ServicesScreen from './pages/services';
//import BarbersScreen from './pages/barbers';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
}

export default App;
