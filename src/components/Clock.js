import React, { Component } from 'react'

class Clock extends Component {
  constructor() {
    super()
    this.timer = null
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
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
      minutes: now.getMinutes(),
      seconds: this.formatSeconds(now.getSeconds())
    })
  }

  formatSeconds(seconds) {
    let stringSeconds = seconds.toString()
    if (stringSeconds.length === 1) {
      return '0' + stringSeconds
    }

    return seconds
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

export default Clock
