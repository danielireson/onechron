import React, { Component } from 'react'
import Radium from 'radium'
import { observer } from 'mobx-react'
import copy from 'copy-to-clipboard'

import { COLOURS, SIZE, BP } from '../config/vars'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

@observer
class TimerLink extends Component {
  constructor() {
    super()
    this.baseUrl = window.location.protocol + '//' + window.location.host + '/'
    this.tooltipDefault = 'Click to copy to clipboard'
    this.state = {
      tooltip: this.tooltipDefault,
    }
    this._onClick = this._onClick.bind(this)
    this._onMouseEnter = this._onMouseEnter.bind(this)
    this._onMouseLeave = this._onMouseLeave.bind(this)
  }

  _onClick() {
    let hasCopied = copy(this.baseUrl + TimerStore.path)
    if (hasCopied) {
      this.setState({
        tooltip: 'Copied!'
      }, () => {
        window.setTimeout(() => {
          this.setState({
            tooltip: this.tooltipDefault
          })
        }, 500);
      })
    }
  }

  _onMouseEnter(event) {
    if (event.target.tagName === 'H1') {
      event.target.children[0].style.display = 'block'
    }
  }

  _onMouseLeave(event) {
    if (event.target.tagName === 'H1') {
      event.target.children[0].style.display = 'none'
    }
  }

  render() {
    const styles = {
      url: {
        display: 'none',
        fontWeight: '300',
        fontSize: SIZE.em(2),
        marginBottom: SIZE.px(4),
        position: 'relative',
        userSelect: 'none',
        ':hover': {
          cursor: 'copy',
        },
        [BP.MEDIUM] : {
          display: 'inline-block',
        },
      },
      tooltip: {
        background: COLOURS.DARK_BLUE,
        borderRadius: SIZE.px(1),
        color: COLOURS.WHITE,
        display: 'none',
        fontSize: '50%',
        paddingTop: SIZE.px(2),
        paddingBottom: SIZE.px(2),
        position: 'absolute',
        top: '-' + SIZE.em(3),
        left: 0,
        width: '100%',
        zIndex: '100',
      },
    }

    if (UiState.hasLink) {
      return (
        <h1 onClick={this._onClick} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} style={styles.url}>
          <span style={styles.tooltip}>{this.state.tooltip}</span>
          {this.baseUrl + TimerStore.path}
        </h1>
      )
    }

    return null
  }
}

export default Radium(TimerLink)
