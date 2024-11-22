import { StatusBar } from 'expo-status-bar';

import MainNavigator from './src/navigation/MainNavigation';

import { store } from './src/app/store';
import { Provider } from 'react-redux';

// import { init } from './src/db';
import { createSessionsTable } from './src/db';

createSessionsTable()
.then((result)=>console.log("tabla creada", result))
.catch((error)=>console.log("error al crear la talba", error))

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator/>
      <StatusBar style="auto" />
    </Provider>
  );
}
