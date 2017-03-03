import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'
import { COLOURS, SIZE, BP } from '../config/vars.js'

class Button extends Component {
  getButtonStyle(styles) {
    let buttonStyle = []
    buttonStyle.push(styles.button)

    if (this.props.type) {
      buttonStyle.push(styles[this.props.type])
    }

    if (this.props.noMarginRight) {
      buttonStyle.push(styles.noMarginRight)
    }

    return buttonStyle
  }

  render() {
    const styles = {
      button: {
        backgroundColor: COLOURS.GREY,
        border: 'none',
        color: COLOURS.BLUE,
        cursor: 'pointer',
        fontSize: SIZE.em(1),
        display: 'block',
        marginRight: SIZE.px(1),
        marginBottom: SIZE.px(2),
        padding: SIZE.px(2),
        transition: 'opacity 0.25s ease-in-out',
        width: '100%',
        whiteSpace: 'nowrap',
        ':hover': {
          backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1))',
        },
        ':active': {
          backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.1) 40%,rgba(0,0,0,.15))',
        },
        ':disabled': {
          cursor: 'not-allowed',
          opacity: 0.4,
        },
        [BP.MEDIUM] : {
          borderRadius: SIZE.px(1),
          display: 'inline-block',
          marginBottom: 0,
          width: 'auto',
        },
      },
      info: {
        backgroundColor: COLOURS.DARK_BLUE,
        color: COLOURS.WHITE,
      },
      success: {
        backgroundColor: COLOURS.GREEN,
        color: COLOURS.WHITE,
      },
      danger: {
        backgroundColor: COLOURS.RED,
        color: COLOURS.WHITE,
      },
      transparent: {
        backgroundColor: 'transparent',
        color: COLOURS.WHITE,
      },
      noMarginRight: {
        marginRight: 0,
      },
    }

    if (!this.props.isHidden) {
      return (
        <button onClick={this.props.onClick} style={this.getButtonStyle(styles)} disabled={this.props.isDisabled}>
          {this.props.icon && <FontAwesome name={this.props.icon} />} {this.props.text}
        </button>
      )
    }

    return null
  }
}

Button.propTypes = {
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
  type: React.PropTypes.oneOf(['info', 'success', 'danger', 'transparent']),
  onClick: React.PropTypes.func,
  noMarginRight: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  isHidden: React.PropTypes.bool,
}

export default Radium(Button)
