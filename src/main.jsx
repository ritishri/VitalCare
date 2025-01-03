import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter } from 'react-router-dom'
//to add multiple pages we have to use react-router-dom
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AppContextProvider>
      <App />
   </AppContextProvider>
  </BrowserRouter>,
)

// wrapping the App in AppContextProvider ensures all the components in the app can access the shared data or functions provided by the context.
