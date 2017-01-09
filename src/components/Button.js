import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'
import { COLOURS, SIZE } from '../config/vars.js'
import UtilityService from '../services/utility.js'

class Button extends Component {
  getButtonStyle(styles) {
    let buttonStyle = []
    buttonStyle.push(styles.button)

    if (this.props.style) {
      buttonStyle.push(styles[this.props.style])
    }

    if (this.props.noMarginRight) {
      buttonStyle.push(styles.noMarginRight)
    }

    return UtilityService.merge(...buttonStyle)
  }

  render() {
    const styles = {
      button: {
        backgroundColor: COLOURS.GREY,
        border: 'none',
        borderRadius: SIZE.px(1),
        color: COLOURS.BLUE,
        cursor: 'pointer',
        fontSize: SIZE.em(1),
        marginRight: SIZE.px(1),
        padding: SIZE.px(2),
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
        }
      },
      success: {
        backgroundColor: COLOURS.GREEN,
        color: COLOURS.WHITE,
      },
      danger: {
        backgroundColor: COLOURS.RED,
        color: COLOURS.WHITE,
      },
      noMarginRight: {
        marginRight: 0,
      },
    }

    return (
      <button onClick={this.props.onClick} style={this.getButtonStyle(styles)} disabled={this.props.isDisabled}>
        {this.props.icon && <FontAwesome name={this.props.icon} />} {this.props.text}
      </button>
    )
  }
}

Button.propTypes = {
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
  style: React.PropTypes.oneOf(['success', 'danger']),
  onClick: React.PropTypes.func,
  noMarginRight: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
}

export default Radium(Button)
