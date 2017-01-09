import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'
import { APP_NAME, COLOURS, SIZE } from '../config/vars.js'
import UtilityService from '../services/utility.js'

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
    if (minutes >= 0 && !this.props.paused) {
      this.setState({
        minutes: minutes,
        seconds: seconds,
      }, () => {
        document.title = this.generatePageTitle()
      })
    }
  }

  generatePageTitle() {
    return this.state.minutes + 'm ' + this.state.seconds + 's - ' + APP_NAME
  }

  render() {
    const styles = {
      h1: {
        display: 'inline-block',
        fontSize: SIZE.em(14),
        marginBottom: 0,
        marginRight: SIZE.px(4),
        marginTop: 0,
      },
      noMarginRight: {
        marginRight: 0,
      },
      small: {
        color: COLOURS.DARK_BLUE,
        fontSize: '50%',
      },
    }

    if (this.props.loaded) {
      return (
        <div>
          <h1 style={styles.h1}>{this.state.minutes}<small style={styles.small}>M</small></h1>
          <h1 style={UtilityService.merge(styles.h1, styles.noMarginRight)}>{this.state.seconds}<small style={styles.small}>S</small></h1>
        </div>
      )
    }

    return <FontAwesome style={styles.spinner} name='spinner' size='4x' spin />
  }
}

Timer.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  endTime: React.PropTypes.number.isRequired,
  paused: React.PropTypes.bool.isRequired,
}

export default Radium(Timer)
