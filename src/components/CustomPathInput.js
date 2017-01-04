import React, { Component } from 'react'
import Radium from 'radium'
import { COLOURS, SIZE } from '../config/vars.js'

class CustomPathInput extends Component {
  getStatusBackground() {
    if (this.props.isClearPath) {
      return COLOURS.GREEN
    }
    return COLOURS.RED
  }

  render() {
    const styles = {
      container: {
        position: 'relative',
        width: '100%',
      },
      status: {
        background: this.getStatusBackground(),
        borderRadius: SIZE.px(3),
        height: SIZE.px(6),
        position: 'absolute',
        right: SIZE.px(4),
        top: SIZE.px(2),
        width: SIZE.px(6),
      },
      input: {
        border: 'none',
        boxSizing: 'border-box',
        color: COLOURS.BLUE,
        fontSize: SIZE.em(2),
        marginBottom: SIZE.px(4),
        outline: 'none',
        padding: SIZE.px(4),
        textAlign: 'center',
        width: '100%',
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.status}></div>
        <input
          style={styles.input} 
          value={this.props.path} 
          onChange={this.props.handleInputChange} 
          type="text" 
          placeholder="..."
          autoFocus />
      </div>
    )
  }
}

export default Radium(CustomPathInput)
