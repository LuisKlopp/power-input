import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './styles/GlobalStyles';
import App from './App';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
