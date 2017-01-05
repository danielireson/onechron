import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'
import { COLOURS, SIZE } from '../config/vars.js'
import UtilityService from '../services/utility.js'

class TimerControls extends Component {
  getButtonStyle(styles) {
    if (!this.props.controls) {
      return {
        display: 'none'
      }
    }
    return styles.button
  }

  render() {
    const styles = {
      container: {
        marginBottom: SIZE.px(4),
      },
      button: {
        backgroundColor: '#E6E6E6',
        borderRadius: '2px',
        border: 'none transparent',
        boxSizing: 'border-box',
        color: COLOURS.BLUE,
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: '100%',
        marginRight: SIZE.px(2),
        padding: '.5em 1em',
        textAlign: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        zoom: 1,
      },
      noMarginRight: {
        marginRight: 0,
      },
    }

    if (this.props.loaded) {
      return (
        <div style={styles.container}>
          <button style={this.getButtonStyle(styles)}>
            <FontAwesome name='pause' />
          </button>
          <button style={this.getButtonStyle(styles)}>
            <FontAwesome name='stop' />
          </button>
          <button style={this.getButtonStyle(styles)}>
            <FontAwesome name='clock-o' /> 5m
          </button>
          <button style={this.getButtonStyle(styles)}>
            <FontAwesome name='clock-o' /> 10m
          </button>
          <button style={this.getButtonStyle(styles)}>
            <FontAwesome name='clock-o' /> 15m
          </button>
          <button style={this.getButtonStyle(styles)}>
            <FontAwesome name='clock-o' /> 20m
          </button>
          <button style={this.getButtonStyle(styles)}>
            <FontAwesome name='clock-o' /> Custom
          </button>
          <button style={UtilityService.merge(styles.button, styles.noMarginRight)} onClick={this.props.toggleControlsVisiblity}>
            { this.props.controls ? <FontAwesome name='lock' /> : <FontAwesome name='unlock-alt' /> }
          </button>
        </div>
      )
    }

    return null
  }
}

TimerControls.PropTypes = {
  loaded: React.PropTypes.bool.isRequired,
  controls: React.PropTypes.bool.isRequired,
  toggleControlsVisiblity: React.PropTypes.func.isRequired,
}

export default Radium(TimerControls)
