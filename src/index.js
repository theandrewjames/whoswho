import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.js'
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  MOUNT_NODE
)
