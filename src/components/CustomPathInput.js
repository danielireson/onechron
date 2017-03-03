import React, { Component } from 'react'
import Radium from 'radium'
import { observer } from 'mobx-react'

import { COLOURS, SIZE } from '../config/vars.js'
import TimerStore from '../stores/TimerStore'

@observer
class CustomPathInput extends Component {
  _onChange(event) {
    let input = event.target.value.replace(' ', '').toLowerCase()
    TimerStore.setPath(input)
  }

  _getStatusBackground() {
    if (TimerStore.isClearPath) {
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
        background: this._getStatusBackground(),
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
          value={TimerStore.path} 
          onChange={this._onChange} 
          type='text'
          placeholder='...'
          spellCheck='false'
          autoFocus />
      </div>
    )
  }
}

export default Radium(CustomPathInput)
