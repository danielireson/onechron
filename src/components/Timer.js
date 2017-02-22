import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'
import { APP_NAME, COLOURS, SIZE, BP } from '../config/vars.js'

class Timer extends Component {
  constructor() {
    super()
    this.timer = null
    this.state = {
      minutes: 0,
      seconds: 0,
    }
  }

  componentWillMount() {
    this.calculateTime()
    this.timer = window.setInterval(() => this.calculateTime(), 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  calculateTime() {
    let totalSeconds = (new Date(this.props.endTime) - new Date()) / 1000
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds - (minutes * 60))
    if (minutes >= 0) {
      this.setStateTime(minutes, seconds)
    } else {
      this.setStateTime(0, 0)
    }
  }

  setStateTime(minutes, seconds) {
    this.setState({
      minutes: minutes,
      seconds: seconds,      
    }, () => {
      document.title = this.generatePageTitle()
    })
  }

  generatePageTitle() {
    return this.state.minutes + 'm ' + this.state.seconds + 's - ' + APP_NAME
  }

  getFontSize() {
    return this.props.fontSize.toString() + '%'
  }

  render() {
    const styles = {
      timer: {
        fontSize: this.getFontSize()
      },
      h1: {
        display: 'inline-block',
        fontSize: SIZE.em(5),
        marginBottom: SIZE.px(2),
        marginRight: SIZE.px(4),
        marginTop: 0,
        [BP.MEDIUM] : {
          fontSize: SIZE.em(14),
        },
        [BP.LARGE] : {
          fontSize: SIZE.em(20),
        },
      },
      noMarginRight: {
        marginRight: 0, 
      },
      small: {
        color: COLOURS.DARK_BLUE,
        fontSize: '50%',
      },
      spinner: {
        display: 'block',
      },
    }

    if (this.props.isLoaded) {
      return (
        <div style={styles.timer}>
          <h1 style={styles.h1}>{this.state.minutes}<small style={styles.small}>M</small></h1>
          <h1 style={[styles.h1, styles.noMarginRight]}>{this.state.seconds}<small style={styles.small}>S</small></h1>
        </div>
      )
    }

    return <FontAwesome style={styles.spinner} name='spinner' size='4x' spin />
  }
}

Timer.propTypes = {
  endTime: React.PropTypes.number.isRequired,
  isLoaded: React.PropTypes.bool.isRequired,
  fontSize: React.PropTypes.number.isRequired,
}

export default Radium(Timer)
