import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfirmProvider } from "material-ui-confirm";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ConfirmProvider>
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_CLIENT_ID } >
      <App />
      </GoogleOAuthProvider>
      </ConfirmProvider>
    </BrowserRouter>
  </StrictMode>,
)
