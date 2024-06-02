import React from 'react'
import ReactDOM from 'react-dom/client'

// Styles
import './assets/style/style.scss'

// Components
import App from './App.js'

const rootElement: HTMLElement = document.getElementById('root')!

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
