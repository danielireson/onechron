import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { StyleRoot, Style } from 'radium'
import DevTools from 'mobx-react-devtools'
import { COLOURS, SIZE } from './config/vars.js'
import HomeContainer from './pages/HomeContainer'
import LiveContainer from './pages/LiveContainer'

class App extends Component {
  render() {
    const styles = {
      html: {
        backgroundColor: COLOURS.BLUE,
      },
      body: {
        color: COLOURS.WHITE,
        fontFamily: 'sans-serif',
        marginBottom: SIZE.px(20),
        marginLeft: 0,
        marginRight: 0,
        marginTop: SIZE.px(20),
        padding: 0,
        textAlign: 'center',
      },
      a: {
        color: COLOURS.WHITE,
        textDecoration: 'none',
      }
    }

    return (
      <StyleRoot>
        <Style rules={styles} />
        <Router history={browserHistory}>
          <Route path='/' component={HomeContainer} />
          <Route path='/:path' component={LiveContainer} />
        </Router>
        <DevTools />
      </StyleRoot>
    )
  }
}

export default App
