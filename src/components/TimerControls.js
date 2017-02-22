import React, { Component } from 'react'
import Radium from 'radium'
import { BP, COLOURS, SIZE } from '../config/vars.js'
import Button from './Button'

class TimerControls extends Component {
  constructor() {
    super()
    this.state = {
      hasCustomTimeControls: false
    }
    this.setCustomTime = this.setCustomTime.bind(this)
    this.toggleCustomTimeControls = this.toggleCustomTimeControls.bind(this)
  }

  toggleCustomTimeControls() {
    if (this.state.hasCustomTimeControls) {
      this.setState({
        hasCustomTimeControls: false
      })
    } else {
      this.setState({
        hasCustomTimeControls: true
      }, () => {
        document.getElementById('custom-time-input').focus()
      })      
    }
    let input = document.getElementById('custom-time-input')
    input.value = ''
  }

  setCustomTime() {
    let input = document.getElementById('custom-time-input')
    let time = Number(input.value)
    if (Number.isInteger(time)) {
      this.props.setTime(time)
      this.toggleCustomTimeControls()
    }
  }

  getCustomTimeControlsDisplay() {
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
        display: this.getCustomTimeControlsDisplay()
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

    if (this.props.isLoaded) {
      if (this.props.hasControls) {
        return (
          <div>
            <div style={styles.container}>
              <Button icon='bars' type='info' onClick={this.props.toggleControlsVisiblity} />
            </div>
            <div style={styles.container}>
              <h6 style={styles.controlsHeader}>Timer controls</h6>
              <span style={styles.hideOnMobile}>
                <Button icon='eye' onClick={this.props.toggleLinkVisibility} />
              </span>
              <Button icon='clock-o' text='1m' onClick={() => this.props.setTime(1)} />
              <Button icon='clock-o' text='5m' onClick={() => this.props.setTime(5)} />
              <Button icon='clock-o' text='10m'  onClick={() => this.props.setTime(10)} />
              <Button icon='clock-o' text='15m'  onClick={() => this.props.setTime(15)} />
              <Button icon='clock-o' text='20m'  onClick={() => this.props.setTime(20)} />
              <Button icon='clock-o' text='Custom' onClick={this.toggleCustomTimeControls} />
              <Button icon='stop' onClick={() => this.props.setTime(0)} noMarginRight />
            </div>
            <div style={[styles.customTimeControls, styles.container]}>
              <h6 style={styles.controlsHeader}>Set custom time (in minutes)</h6>
              <input id='custom-time-input' type='text' style={styles.input} placeholder='...' />
              <Button onClick={this.setCustomTime} type='success' text='Set' />
              <Button onClick={this.toggleCustomTimeControls} type='danger' text='Cancel' />
            </div>
            <div style={[styles.container, styles.hideOnMobile]}>
              <h6 style={styles.controlsHeader}>Timer font size</h6>
              <input type='range' min='100' max='200' value={this.props.fontSize} onChange={this.props.handleFontSizeChange} />
            </div>
          </div>
        )
      } else {
        return (
          <div style={styles.container}>
            <Button icon='bars' type='info' onClick={this.props.toggleControlsVisiblity} noMarginRight />
          </div>
        )
      }
    }

    return null
  }
}

TimerControls.PropTypes = {
  isLoaded: React.PropTypes.bool.isRequired,
  hasControls: React.PropTypes.bool.isRequired,
  setTime: React.PropTypes.func.isRequired,
  toggleControlsVisiblity: React.PropTypes.func.isRequired,
  toggleLinkVisibility: React.PropTypes.func.isRequired,
}

export default Radium(TimerControls)
