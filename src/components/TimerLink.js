import React, { Component } from 'react'
import Radium from 'radium'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import copy from 'copy-to-clipboard'

import { COLOURS, SIZE, BP } from '../config/vars'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

@observer
class TimerLink extends Component {
  @observable tooltip = this.tooltipDefault
  @observable hasTooltip = false

  constructor() {
    super()
    this.baseUrl = window.location.protocol + '//' + window.location.host + '/'
    this.tooltipDefault = 'Click to copy to clipboard'
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onClick() {
    let hasCopied = copy(this.baseUrl + TimerStore.path)
    if (hasCopied) {
      this.tooltip = 'Copied!'
      setTimeout(() => {
        this.tooltip = this.tooltipDefault
      }, 500);
    }
  }

  onMouseEnter() {
    this.hasTooltip = true
  }

  onMouseLeave() {
    this.hasTooltip = false
  }

  getTooltipDisplayProperty() {
    if (this.hasTooltip) {
      return 'block'
    } else {
      return 'none'
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
        display: this.getTooltipDisplayProperty(),
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
        <h1 onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={styles.url}>
          <span style={styles.tooltip}>{this.tooltip}</span>
          {this.baseUrl + TimerStore.path}
        </h1>
      )
    }

    return null
  }
}

export default Radium(TimerLink)
