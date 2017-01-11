import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'
import { COLOURS, SIZE } from '../config/vars.js'

class Notification extends Component {
  getNotificationStyle(styles) {
    let style = []
    style.push(styles.notificaton)

    if (this.props.type) {
      style.push(styles[this.props.type])
    }

    return style
  }

  render() {
    const styles = {
      notificaton: {
        borderRadius: SIZE.px(2),
        bottom: SIZE.px(4),
        color: COLOURS.WHITE,
        padding: SIZE.px(2),
        position: 'absolute',
        right: SIZE.px(4),
      },
      info: {
        backgroundColor: COLOURS.DARK_BLUE,
      },
      success: {
        backgroundColor: COLOURS.GREEN,
      },
      danger: {
        backgroundColor: COLOURS.RED,
      },
    }

    if (this.props.text) {
      return (
        <div style={this.getNotificationStyle(styles)}>
          {this.props.type === 'success' && <FontAwesome name='bell-o' />}
          {this.props.type === 'danger' && <FontAwesome name='exclamation-circle' />}
          {this.props.text}
        </div>
      )
    }

    return null
  }
}

Notification.propTypes = {
  text: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['info', 'success', 'danger']),
}

export default Radium(Notification)
