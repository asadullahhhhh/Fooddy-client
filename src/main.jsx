import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { route } from './Routes/Route.jsx'
import ContextProvider from './Context/ContextProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <ContextProvider>
      <RouterProvider router={route}></RouterProvider>
    </ContextProvider>
  </StrictMode>
);
