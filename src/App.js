import React, { Component } from 'react'
import Clock from './components/Clock'

class App extends Component {
  constructor() {
    super()
    this.state = {
      customPath: ''
    }
  }

  render() {
    const styles = {
      url: {
        fontWeight: '300'
      }
    }

    let url = window.location.protocol + '//' + window.location.host + '/' + this.state.customPath
    return (
      <div>
        <h1 style={styles.url}>{ url }</h1>
        <Clock />
      </div>
    )
  }
}

export default App
