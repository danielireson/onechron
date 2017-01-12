import React, { Component } from 'react'
import Radium from 'radium'
import copy from 'copy-to-clipboard'
import { COLOURS, SIZE } from '../config/vars'

class TimerLink extends Component {
  constructor(props) {
    super(props)
    this.baseUrl = window.location.protocol + '//' + window.location.host + '/'
    this.tooltipDefault = 'Click to copy to clipboard'
    this.state = {
      tooltip: this.tooltipDefault,
    },
    this.handleClick = this.handleClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  handleClick() {
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
        display: 'inline-block',
        fontWeight: '300',
        marginBottom: SIZE.px(4),
        position: 'relative',
        userSelect: 'none',
        ':hover': {
          cursor: 'copy',
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

    return (
      <h1 onClick={this.handleClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={styles.url}>
        <span style={styles.tooltip}>{this.state.tooltip}</span>
        {this.baseUrl + this.props.path}
      </h1>
    )
  }
}

TimerLink.propTypes = {
  path: React.PropTypes.string.isRequired
}

export default Radium(TimerLink)
