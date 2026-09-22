import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AdminApp from './admin/AdminApp.jsx';

const path = window.location.pathname.replace(import.meta.env.BASE_URL, '/');
const Root = path.startsWith('/admin') ? AdminApp : App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
