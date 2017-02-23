import React, { Component } from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'
import screenfull from 'screenfull'
import { COLOURS, SIZE } from '../config/vars.js'

class FullScreenButton extends Component {
  _handleButtonClick() {
    screenfull.toggle()
  }

  _getButtonDisplayProperty() {
    if (screenfull.enabled) {
      return 'block'
    }
    return 'none'
  }

  render() {
    const styles = {
      button: {
        background: 'none',
        border: 'none',
        color: COLOURS.DARK_BLUE,
        cursor: 'pointer',
        display: this._getButtonDisplayProperty(),
        fontSize: SIZE.em(2),
        padding: 0,
        position: 'absolute',
        right: SIZE.px(4),
        top: SIZE.px(4),
      }
    }

    return (
      <button onClick={this._handleButtonClick} style={styles.button}>
        <FontAwesome name='arrows-alt' />
      </button>
    )
  }
}

export default Radium(FullScreenButton)
