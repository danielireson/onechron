import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { COLOURS } from './config/vars.js'
import './config/firebase'
import './index.css'

document.documentElement.style.backgroundColor = COLOURS.BLUE

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
