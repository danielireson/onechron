import React, { Component } from 'react'
import Radium from 'radium'
import { SIZE } from '../config/vars'

class TimerLink extends Component {
  render() {
    const styles = {
      url: {
        fontWeight: '300',
        marginBottom: SIZE.px(4),
      },
    }

    let url = window.location.protocol + '//' + window.location.host + '/' + this.props.path
    return (
      <h1 style={styles.url}>{ url }</h1>
    )
  }
}

export default Radium(TimerLink)
