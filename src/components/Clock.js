import React, { Component } from 'react'
import Radium from 'radium'

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
  }

  componentDidMount() {
    this.timer = window.setInterval(() => this.getTime(), 1000)
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
        backgroundColor: '#2980b9',
        borderRadius: '10px',
        fontSize: '2em',
        left: '20px',
        padding: '10px',
        position: 'absolute',
        top: '20px',
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
