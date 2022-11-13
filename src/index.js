import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import '../node_modules/modern-normalize/modern-normalize.css'

import { theme } from './theme'
import {ThemeProvider} from 'styled-components'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
  </React.StrictMode>
);
