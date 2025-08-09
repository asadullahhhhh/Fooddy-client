import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { route } from './Routes/Route.jsx'
import ContextProvider from './Context/ContextProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryclient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="center" reverseOrder={false} />
    <QueryClientProvider client={queryclient}>
      <ContextProvider>
      <RouterProvider router={route}></RouterProvider>
    </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
