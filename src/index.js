import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from './assets/Context/Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>

      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
