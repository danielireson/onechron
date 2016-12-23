import React, { Component } from 'react'
import Radium from 'radium'
import { COLOURS, SIZE } from '../vars.js'

class CustomPathInput extends Component {
  render() {
    const styles = {
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
      <input 
        style={styles.input} 
        value={this.props.path} 
        onChange={this.props.updatePath} 
        type="text" 
        placeholder="..."
        autoFocus />
    )
  }
}

export default Radium(CustomPathInput)
