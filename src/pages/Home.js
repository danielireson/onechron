import React, { Component } from 'react'
import Radium from 'radium'
import RandomWords from 'random-words'
import { COLOURS, SIZE } from '../vars.js'
import Clock from '../components/Clock'
import CustomPathInput from '../components/CustomPathInput'
import Footer from '../components/Footer'
import TimerLink from '../components/TimerLink'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      path: this.getUniqueWord()
    }
    this.updatePath = this.updatePath.bind(this)
  }

  getUniqueWord() {
    return RandomWords()
  }

  updatePath(event) {
    this.setState({
      path: event.target.value
    })
  }

  render() {
    const styles = {
      button: {
        backgroundColor: COLOURS.GREEN,
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

    return (
      <div>
        <Clock />
        <TimerLink path={this.state.path} />
        <CustomPathInput path={this.state.path} updatePath={this.updatePath} />
        <button style={styles.button}>Create timer at the above URL</button>
        <Footer />
      </div>
    )
  }
}

export default Radium(Home)
