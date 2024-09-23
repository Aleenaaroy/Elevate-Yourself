import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {store , persistor} from './Redux/store/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <StrictMode>
      <Router> 
        <App />
      </Router>
    </StrictMode>
  </PersistGate>
</Provider>
)
