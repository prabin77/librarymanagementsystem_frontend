import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './router'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing></Routing>
  </React.StrictMode>,
)
