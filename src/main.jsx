import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './ContextAPI/ContextShare.jsx'
import tokenAuthentication from './ContextAPI/tokenAuthentication.jsx'
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<tokenAuthentication>
    <ContextShare>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </ContextShare>
    </tokenAuthentication>
  </React.StrictMode>,
)
