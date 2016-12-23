import React, { Component } from 'react'
import Clock from './components/Clock'
import CustomPathInput from './components/CustomPathInput'

class App extends Component {
  constructor() {
    super()
    this.state = {
      path: ''
    }
    this.updatePath = this.updatePath.bind(this)
  }

  updatePath(event) {
    this.setState({
      path: event.target.value
    })
  }

  render() {
    const styles = {
      url: {
        fontWeight: '300'
      },
      a: {
        color: '#2980b9',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }
    }

    let url = window.location.protocol + '//' + window.location.host + '/' + this.state.path
    return (
      <div>
        <h1 style={styles.url}>{ url }</h1>
        <Clock />
        <CustomPathInput path={this.state.path} updatePath={this.updatePath} />
        <footer>
          <a style={styles.a} href="http://digitalbydan.com">digitalbydan.com</a>
        </footer>
      </div>
    )
  }
}

export default App
