import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { GigProvider, SongProvider } from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GigProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </GigProvider>
  </BrowserRouter>,
);
