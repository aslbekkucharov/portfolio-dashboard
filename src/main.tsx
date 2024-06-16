import React from 'react'
import { routes } from '@/routes'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'

// Styles
import './assets/style/style.scss'

// Components

const router = createBrowserRouter(routes)
const rootElement: HTMLElement = document.getElementById('root')!

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
