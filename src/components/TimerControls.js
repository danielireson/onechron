import React, { Component } from 'react'
import Radium from 'radium'
import { SIZE } from '../config/vars.js'
import Button from '../components/Button'

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
    }

    if (this.props.isLoaded) {
      if (this.props.hasControls) {
        return (
          <div style={styles.container}>
            <Button icon='stop' onClick={() => this.props.setTime(0)} />
            <Button icon='clock-o' text='5m' onClick={() => this.props.setTime(5)} />
            <Button icon='clock-o' text='10m'  onClick={() => this.props.setTime(10)} />
            <Button icon='clock-o' text='15m'  onClick={() => this.props.setTime(15)} />
            <Button icon='clock-o' text='20m'  onClick={() => this.props.setTime(20)} />
            <Button icon='clock-o' text='Custom' onClick={this.getCustomInput.bind(this)} />
            <Button icon='lock' onClick={this.props.toggleControlsVisiblity} noMarginRight />
          </div>
        )
      } else {
        return (
          <div style={styles.container}>
            <Button icon='unlock-alt' type='info' onClick={this.props.toggleControlsVisiblity} noMarginRight />
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
}

export default Radium(TimerControls)
