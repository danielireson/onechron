import React, { Component } from 'react'
import Radium from 'radium'
import { SIZE } from '../config/vars.js'
import Button from '../components/Button'

class TimerControls extends Component {
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
            <Button icon='pause' />
            <Button icon='stop' />
            <Button icon='clock-o' text='5m' />
            <Button icon='clock-o' text='10m' />
            <Button icon='clock-o' text='15m' />
            <Button icon='clock-o' text='20m' />
            <Button icon='clock-o' text='Custom' />
            <Button icon='lock' onClick={this.props.toggleControlsVisiblity} noMarginRight />
          </div>
        )
      } else {
        return (
          <div style={styles.container}>
            <Button icon='unlock-alt' onClick={this.props.toggleControlsVisiblity} noMarginRight />
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
  toggleControlsVisiblity: React.PropTypes.func.isRequired,
}

export default Radium(TimerControls)
