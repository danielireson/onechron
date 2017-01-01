import React, { Component } from 'react'
import Radium from 'radium'
import { COLOURS } from '../config/vars.js'

class Footer extends Component {
  render() {
    const styles = {
      a: {
        color: COLOURS.DARK_BLUE,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    }

    return (
      <footer>
        <a style={styles.a} href="http://digitalbydan.com">digitalbydan.com</a>
      </footer>
    )
  }
}

export default Radium(Footer)
