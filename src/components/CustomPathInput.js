import React, { Component } from 'react'
import Radium from 'radium'

class CustomPathInput extends Component {
  constructor() {
    super()
  }

  render() {
    const styles = {
      input: {
        border: 'none',
        boxSizing: 'border-box',
        color: '#3498db',
        fontSize: '2em',
        marginBottom: '20px',
        padding: '20px',
        textAlign: 'center',
        width: '100%',
      }
    }

    return (
      <input 
        style={styles.input} 
        value={this.props.path} 
        onChange={this.props.updatePath} 
        type="text" 
        placeholder="..." />
    )
  }
}

export default Radium(CustomPathInput)
