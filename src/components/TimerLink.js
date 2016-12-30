import React, { Component } from 'react'
import Radium from 'radium'

class TimerLink extends Component {
  render() {
    const styles = {
      url: {
        fontWeight: '300'
      },
    }

    let url = window.location.protocol + '//' + window.location.host + '/' + this.props.pathSuffix
    return (
      <h1 style={styles.url}>{ url }</h1>
    )
  }
}

export default Radium(TimerLink)
