import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ✅ FIX: Removed StrictMode to prevent double-rendering in development
// Note: This only affects development mode. Production builds are not affected.
createRoot(document.getElementById('root')).render(
  <App />
)
