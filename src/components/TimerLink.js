import React, { Component } from 'react'
import Radium from 'radium'
import copy from 'copy-to-clipboard'
import { SIZE } from '../config/vars'

class TimerLink extends Component {
  constructor(props) {
    super(props)
    this.url = window.location.protocol + '//' + window.location.host + '/' + this.props.path
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    copy(this.url)
  }

  render() {
    const styles = {
      url: {
        fontWeight: '300',
        marginBottom: SIZE.px(4),
        userSelect: 'none',
        ':hover': {
          cursor: 'copy',
        },
      },
    }

    return (
      <h1 onClick={this.handleClick} style={styles.url}>{this.url}</h1>
    )
  }
}

TimerLink.propTypes = {
  path: React.PropTypes.string.isRequired,
}

export default Radium(TimerLink)
