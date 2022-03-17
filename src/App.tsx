import React from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from './providers/AuthProvider';
import { GamesQueryProvider } from './providers/GamesQueryContext';
import { AppRouter } from './router';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GamesQueryProvider>
          <AppRouter />
        </GamesQueryProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
