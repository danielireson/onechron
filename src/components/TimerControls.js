import React, { Component } from 'react'
import Radium from 'radium'
import { observer } from 'mobx-react'

import { BP, COLOURS, SIZE } from '../config/vars.js'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

import Button from './Button'

@observer
class TimerControls extends Component {
  constructor() {
    super()
    this.state = {
      hasCustomTimeControls: false
    }
    this._setCustomTime = this._setCustomTime.bind(this)
    this._toggleCustomTimeControls = this._toggleCustomTimeControls.bind(this)
  }

  _toggleCustomTimeControls() {
    let input = document.getElementById('custom-time-input')
    if (this.state.hasCustomTimeControls) {
      this.setState({
        hasCustomTimeControls: false
      })
    } else {
      this.setState({
        hasCustomTimeControls: true
      }, () => input.focus())      
    }
    input.value = ''
  }

  _setCustomTime() {
    let input = document.getElementById('custom-time-input')
    let time = Number(input.value)
    if (Number.isInteger(time)) {
      TimerStore.setTime(time)
      this._toggleCustomTimeControls()
    }
  }

  _getCustomTimeControlsDisplay() {
    if (this.state.hasCustomTimeControls) {
      return 'block'
    } else {
      return 'none'
    }
  }

  render() {
    const styles = {
      container: {
        marginBottom: SIZE.px(4),
      },
      controlsHeader: {
        fontSize: SIZE.em(1),
        textTransform: 'uppercase',
        marginTop: 0,
        marginBottom: SIZE.px(2),
      },
      hideOnMobile: {
        display: 'none',
        [BP.MEDIUM]: { 
          display: 'inline-block'
        }
      },
      customTimeControls: {
        display: this._getCustomTimeControlsDisplay()
      },
      input: {
        border: 'none',
        boxSizing: 'border-box',
        color: COLOURS.BLUE,
        fontSize: SIZE.em(1),
        marginBottom: SIZE.px(2),
        outline: 'none',
        padding: SIZE.px(2),
        textAlign: 'center',
        width: '100%',
        [BP.MEDIUM]: {
          borderRadius: SIZE.px(1),
          marginBottom: 0,
          marginRight: SIZE.px(1),
          width: SIZE.px(15),
        },
      }
    }

    if (!TimerStore.loading) {
      if (UiState.hasControls) {
        return (
          <div>
            <div style={styles.container}>
              <Button icon='bars' type='info' onClick={UiState.toggleControlsVisiblity} />
            </div>
            <div style={styles.container}>
              <h6 style={styles.controlsHeader}>Timer controls</h6>
              <span style={styles.hideOnMobile}>
                <Button icon='eye' onClick={UiState.toggleLinkVisibility} />
              </span>
              <Button icon='clock-o' text='1m' onClick={() => TimerStore.setTime(1)} />
              <Button icon='clock-o' text='5m' onClick={() => TimerStore.setTime(5)} />
              <Button icon='clock-o' text='10m'  onClick={() => TimerStore.setTime(10)} />
              <Button icon='clock-o' text='15m'  onClick={() => TimerStore.setTime(15)} />
              <Button icon='clock-o' text='20m'  onClick={() => TimerStore.setTime(20)} />
              <Button icon='clock-o' text='Custom' onClick={this._toggleCustomTimeControls} />
              <Button icon='stop' onClick={() => TimerStore.setTime(0)} noMarginRight />
            </div>
            <div style={[styles.customTimeControls, styles.container]}>
              <h6 style={styles.controlsHeader}>Set custom time (in minutes)</h6>
              <input id='custom-time-input' type='text' style={styles.input} placeholder='...' />
              <Button onClick={this._setCustomTime} type='success' text='Set' />
              <Button onClick={UiState.toggleCustomTimeControls} type='danger' text='Cancel' />
            </div>
            <div style={[styles.container, styles.hideOnMobile]}>
              <h6 style={styles.controlsHeader}>Timer font size</h6>
              <input type='range' min='100' max='200' value={UiState.fontSize} onChange={UiState.setFontSize} />
            </div>
          </div>
        )
      } else {
        return (
          <div style={styles.container}>
            <Button icon='bars' type='info' onClick={(UiState.toggleControlsVisiblity)} noMarginRight />
          </div>
        )
      }
    }

    return null
  }
}

export default Radium(TimerControls)
