import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Home from './pages/Home'
import Live from './pages/Live'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/:path' component={Live} />
      </Router>
    )
  }
}

export default App
