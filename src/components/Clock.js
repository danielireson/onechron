import React, { Component } from 'react'
import Radium from 'radium'
import { COLOURS, SIZE } from '../config/vars.js'

class Clock extends Component {
  constructor() {
    super()
    this.timer = null
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  componentWillMount() {
    this.getTime()
    this.timer = window.setInterval(() => this.getTime(), 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  getTime() {
    let now = new Date()
    this.setState({
      hours: now.getHours(),
      minutes: this.prependZeroCheck(now.getMinutes()),
      seconds: this.prependZeroCheck(now.getSeconds()),
    })
  }

  prependZeroCheck(number) {
    let string = number.toString()
    if (string.length === 1) {
      return '0' + string
    }

    return number
  }

  render() {
    const styles = {
      clock: {
        backgroundColor: COLOURS.DARK_BLUE,
        borderRadius: SIZE.px(2),
        fontSize: SIZE.em(2),
        left: SIZE.px(4),
        padding: SIZE.px(2),
        position: 'absolute',
        top: SIZE.px(4),
      }
    }

    return (
      <div style={styles.clock}>
        { this.state.hours }:{ this.state.minutes }
      </div>
    )
  }
}

export default Radium(Clock)
