import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import QuoraLayout from './QuoraLayout.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <QuoraLayout /> */}
  </StrictMode>,
)
