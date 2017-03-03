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

  getUrlOpacityProperty() {
    return UiState.hasLink ? 1 : 0   
  }

  getTooltipOpacityProperty() {
    return this.hasTooltip ? 1 : 0
  }

  render() {
    const styles = {
      url: {
        display: 'none',
        fontSize: SIZE.em(2),
        fontWeight: '300',
        marginBottom: SIZE.px(4),
        opacity: 0,
        position: 'relative',
        transition: 'opacity 0.25s ease-in-out',
        userSelect: 'none',
        ':hover': {
          cursor: 'copy',
        },
        [BP.MEDIUM] : {
          display: 'inline-block',
          opacity: this.getUrlOpacityProperty(),
        },
      },
      tooltip: {
        background: COLOURS.DARK_BLUE,
        borderRadius: SIZE.px(1),
        color: COLOURS.WHITE,
        fontSize: '50%',
        opacity: this.getTooltipOpacityProperty(),
        paddingTop: SIZE.px(2),
        paddingBottom: SIZE.px(2),
        position: 'absolute',
        top: '-' + SIZE.em(3),
        transition: 'opacity 0.25s ease-in-out',
        left: 0,
        width: '100%',
        zIndex: '100',
      },
    }

    return (
      <h1 onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={styles.url}>
        <span style={styles.tooltip}>{this.tooltip}</span>
        {this.baseUrl + TimerStore.path}
      </h1>
    )
  }
}

export default Radium(TimerLink)
