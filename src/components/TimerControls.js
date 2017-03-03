import React, { Component } from 'react'
import Radium from 'radium'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { BP, COLOURS, SIZE } from '../config/vars.js'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

import Button from './Button'

@observer
class TimerControls extends Component {
  @observable hasCustomTimeControls = false

  constructor() {
    super()
    this.setCustomTime = this.setCustomTime.bind(this)
    this.toggleCustomTimeControls = this.toggleCustomTimeControls.bind(this)
  }

  toggleCustomTimeControls() {
    this.hasCustomTimeControls = !this.hasCustomTimeControls
  }

  setCustomTime() {
    let input = document.getElementById('custom-time-input')
    let time = Number(input.value)
    if (Number.isInteger(time)) {
      TimerStore.setTime(time)
      this.toggleCustomTimeControls()
    }
  }

  getControlsHeightProperty() {
    if (UiState.hasControls) {
      return '100vh'
    } else {
      return 0
    }
  }

  getCustomTimeHeightProperty() {
    if (this.hasCustomTimeControls) {
      return '100vh'
    } else {
      return 0
    }
  }

  render() {
    const styles = {
      container: {
        marginBottom: SIZE.px(4),
      },
      controls: {
        maxHeight: this.getControlsHeightProperty(),
        overflow: 'hidden',
        transition: 'max-height 1s ease',
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
        maxHeight: this.getCustomTimeHeightProperty(),
        overflow: 'hidden',
        transition: 'max-height 1s ease',
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

    if (!UiState.loading) {
      return (
        <div>
          <div style={styles.container}>
            <Button icon='bars' type='info' onClick={UiState.toggleControlsVisiblity} />
          </div>
          <div style={styles.controls}>
            <div style={[styles.container]}>
              <h6 style={styles.controlsHeader}>Timer controls</h6>
              <span style={styles.hideOnMobile}>
                <Button icon='eye' onClick={UiState.toggleLinkVisibility} />
              </span>
              <Button icon='clock-o' text='1m' onClick={() => TimerStore.setTime(1)} />
              <Button icon='clock-o' text='5m' onClick={() => TimerStore.setTime(5)} />
              <Button icon='clock-o' text='10m'  onClick={() => TimerStore.setTime(10)} />
              <Button icon='clock-o' text='15m'  onClick={() => TimerStore.setTime(15)} />
              <Button icon='clock-o' text='20m'  onClick={() => TimerStore.setTime(20)} />
              <Button icon='clock-o' text='Custom' onClick={this.toggleCustomTimeControls} />
              <Button icon='stop' onClick={() => TimerStore.setTime(0)} noMarginRight />
            </div>
            <div style={[styles.customTimeControls, styles.container]}>
              <h6 style={styles.controlsHeader}>Set custom time (in minutes)</h6>
              <input id='custom-time-input' type='text' style={styles.input} placeholder='...' />
              <Button onClick={this.setCustomTime} type='success' text='Set' />
              <Button onClick={this.toggleCustomTimeControls} type='danger' text='Cancel' />
            </div>
            <div style={[styles.container, styles.hideOnMobile]}>
              <h6 style={styles.controlsHeader}>Timer font size</h6>
              <input type='range' min='100' max='200' value={UiState.fontSize} onChange={UiState.setFontSize} />
            </div>
          </div>
        </div>
      )
    }

    return null
  }
}

export default Radium(TimerControls)
