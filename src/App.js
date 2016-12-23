import React, { Component } from 'react'
import Radium from 'radium'
import { COLOURS, SIZE } from './vars.js'
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
        color: COLOURS.DARK_BLUE,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      button: {
        background: COLOURS.GREEN,
        border: 'none',
        borderRadius: SIZE.px(1),
        color: COLOURS.WHITE,
        cursor: 'pointer',
        fontSize: SIZE.em(1),
        fontWeight: 'bold',
        marginBottom: SIZE.px(4),
        padding: SIZE.px(2),
        ':hover': {
          backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1))'
        }
      }
    }

    let url = window.location.protocol + '//' + window.location.host + '/' + this.state.path
    return (
      <div>
        <h1 style={styles.url}>{ url }</h1>
        <Clock />
        <CustomPathInput path={this.state.path} updatePath={this.updatePath} />
        <button style={styles.button}>Create timer at the above URL</button>
        <footer>
          <a style={styles.a} href="http://digitalbydan.com">digitalbydan.com</a>
        </footer>
      </div>
    )
  }
}

export default Radium(App)
