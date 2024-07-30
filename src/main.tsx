import React from 'react'
import { routes } from '@/routes'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Styles
import './assets/style/style.scss'
import { AuthProvider } from './context/auth'

// Components

const router = createBrowserRouter(routes)
const rootElement: HTMLElement = document.getElementById('root')!

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider tokenKey='token'>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
