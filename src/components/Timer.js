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
    this._calculateTime()
    TimerStore.timer.timerRef = window.setInterval(() => this._calculateTime(), 1000)
  }

  componentWillUnmount() {
    window.clearInterval(TimerStore.timer.timerRef)
  }

  _calculateTime() {
    let totalSeconds = (new Date(TimerStore.timer.endTime) - new Date()) / 1000
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds - (minutes * 60))
    if (minutes >= 0) {
      TimerStore.timer.minutes = minutes
      TimerStore.timer.seconds = seconds    
    } else {
      TimerStore.timer.minutes = 0
      TimerStore.timer.seconds = 0
    }
    document.title = this._generatePageTitle()
  }

  _generatePageTitle() {
    return TimerStore.timer.minutes + 'm ' + TimerStore.timer.seconds + 's - ' + APP_NAME
  }

  _getFontSize() {
    return UiState.fontSize.toString() + '%'
  }

  render() {
    const styles = {
      timer: {
        fontSize: this._getFontSize()
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

    if (!TimerStore.loading) {
      return (
        <div style={styles.timer}>
          <h1 style={styles.h1}>{TimerStore.timer.minutes}<small style={styles.small}>M</small></h1>
          <h1 style={[styles.h1, styles.noMarginRight]}>{TimerStore.timer.seconds}<small style={styles.small}>S</small></h1>
        </div>
      )
    }

    return <FontAwesome style={styles.spinner} name='spinner' size='4x' spin />
  }
}

export default Radium(Timer)
