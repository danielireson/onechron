import React, { Component } from 'react'
import Radium from 'radium'
import copy from 'copy-to-clipboard'
import { COLOURS, SIZE, BP } from '../config/vars'

class TimerLink extends Component {
  constructor(props) {
    super(props)
    this.baseUrl = window.location.protocol + '//' + window.location.host + '/'
    this.tooltipDefault = 'Click to copy to clipboard'
    this.state = {
      tooltip: this.tooltipDefault,
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onClick() {
    let hasCopied = copy(this.baseUrl + this.props.path)
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

  onMouseEnter(event) {
    if (event.target.tagName === 'H1') {
      event.target.children[0].style.display = 'block'
    }
  }

  onMouseLeave(event) {
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

    if (this.props.hasLink) {
      return (
        <h1 onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={styles.url}>
          <span style={styles.tooltip}>{this.state.tooltip}</span>
          {this.baseUrl + this.props.path}
        </h1>
      )
    }

    return null
  }
}

TimerLink.propTypes = {
  path: React.PropTypes.string.isRequired,
  hasLink: React.PropTypes.bool.isRequired,
}

export default Radium(TimerLink)
