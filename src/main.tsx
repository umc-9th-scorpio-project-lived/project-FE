import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

window.Kakao.init(import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY);
window.Kakao.isInitialized();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
