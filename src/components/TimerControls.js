import React, { Component } from 'react'
import Radium from 'radium'
import { SIZE } from '../config/vars.js'
import Button from './Button'

class TimerControls extends Component {
  getCustomInput() {
    let input = parseInt(prompt('Minutes to count down from'), 10)
    if (Number.isInteger(input)) {
      this.props.setTime(input)
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
        marginBottom: SIZE.px(2)
      }
    }

    if (this.props.isLoaded) {
      if (this.props.hasControls) {
        return (
          <div>
            <div style={styles.container}>
              <Button icon='bars' onClick={this.props.toggleControlsVisiblity} />
            </div>
            <div style={styles.container}>
              <h6 style={styles.controlsHeader}>Timer controls</h6>
              <Button icon='eye' onClick={this.props.toggleLinkVisibility} />
              <Button icon='clock-o' text='1m' onClick={() => this.props.setTime(1)} />
              <Button icon='clock-o' text='5m' onClick={() => this.props.setTime(5)} />
              <Button icon='clock-o' text='10m'  onClick={() => this.props.setTime(10)} />
              <Button icon='clock-o' text='15m'  onClick={() => this.props.setTime(15)} />
              <Button icon='clock-o' text='20m'  onClick={() => this.props.setTime(20)} />
              <Button icon='clock-o' text='Custom' onClick={this.getCustomInput.bind(this)} />
              <Button icon='stop' onClick={() => this.props.setTime(0)} noMarginRight />
            </div>
            <div style={styles.container}>
              <h6 style={styles.controlsHeader}>Timer font size</h6>
              <input type="range" min="100" max="200" value={this.props.fontSize} onChange={this.props.handleFontSizeChange} />
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
