import React, { Component } from 'react'
import Radium from 'radium'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { COLOURS, SIZE } from '../config/vars.js'

@observer
class Clock extends Component {
  @observable time = {
    hours: 0,
    minutes: 0
  }

  constructor() {
    super()
    this.timer = null
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
    this.time.hours = this.prependZeroCheck(now.getHours())
    this.time.minutes = this.prependZeroCheck(now.getMinutes())
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
        {this.time.hours}:{this.time.minutes}
      </div>
    )
  }
}

export default Radium(Clock)
