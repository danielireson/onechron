import React, { Component } from 'react'
import Radium from 'radium'
import { observer } from 'mobx-react'
import FontAwesome from 'react-fontawesome'

import { APP_NAME, COLOURS, SIZE, BP } from '../config/vars.js'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

@observer
class Timer extends Component {
  componentWillMount() {
    TimerStore.subscribeToTimerUpdates()
    this.calculateTime()
    TimerStore.timer.timerRef = window.setInterval(() => this.calculateTime(), 1000)
  }

  componentWillUnmount() {
    window.clearInterval(TimerStore.timer.timerRef)
  }

  calculateTime() {
    let totalSeconds = (new Date(TimerStore.timer.endTime) - new Date()) / 1000
    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds / 60) - (hours * 60))
    let seconds = Math.floor(totalSeconds - (minutes * 60) - (hours * 3600))
    if (hours >= 0) {
      TimerStore.timer.hours = hours
      TimerStore.timer.minutes = minutes
      TimerStore.timer.seconds = seconds
    } else {
      TimerStore.timer.hours = 0
      TimerStore.timer.minutes = 0
      TimerStore.timer.seconds = 0
    }
    document.title = this.generatePageTitle()
  }

  generatePageTitle() {
    if(TimerStore.timer.hours>0){
      return TimerStore.timer.hours + 'h ' + TimerStore.timer.minutes + 'm ' + TimerStore.timer.seconds + 's - ' + APP_NAME
    }else{
      return TimerStore.timer.minutes + 'm ' + TimerStore.timer.seconds + 's - ' + APP_NAME
    }
  }

  getFontSizeProperty() {
    return UiState.fontSize.toString() + '%'
  }

  render() {
    const styles = {
      timer: {
        fontSize: this.getFontSizeProperty()
      },
      msg:{
        display: 'none',
        fontSize: SIZE.em(2),
        fontWeight: '300',
        marginBottom: SIZE.px(4),
        opacity: 0,
        position: 'relative',
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

    if (!UiState.loading) {
      if(TimerStore. timer.hours > 0){
        return (
          <div>
            <div>
              <h1 style={styles.msg}>{TimerStore.message}</h1>
            </div>
            <div style={styles.timer}>
              <h1 style={styles.h1}>{TimerStore.timer.hours}<small style={styles.small}>H</small></h1>
              <h1 style={styles.h1}>{TimerStore.timer.minutes}<small style={styles.small}>M</small></h1>
              <h1 style={[styles.h1, styles.noMarginRight]}>{TimerStore.timer.seconds}<small style={styles.small}>S</small></h1>
            </div>
          </div>
        )
      }else{
        return (
          <div>
            <div>
              <h1 style={styles.msg}>{TimerStore.message}</h1>
            </div>
            <div style={styles.timer}>
              <h1 style={styles.msg}>{TimerStore.message}</h1>
              <h1 style={styles.h1}>{TimerStore.timer.minutes}<small style={styles.small}>M</small></h1>
              <h1 style={[styles.h1, styles.noMarginRight]}>{TimerStore.timer.seconds}<small style={styles.small}>S</small></h1>
            </div>
          </div>
        )
      }
    }

    return <FontAwesome style={styles.spinner} name='spinner' size='4x' spin />
  }
}

export default Radium(Timer)
