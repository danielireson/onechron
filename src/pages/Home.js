import React, { Component } from 'react'
import firebase from 'firebase'
import Radium from 'radium'
import RandomWords from 'random-words'
import { COLOURS, SIZE } from '../config/vars.js'
import Clock from '../components/Clock'
import CustomPathInput from '../components/CustomPathInput'
import Footer from '../components/Footer'
import TimerLink from '../components/TimerLink'

class Home extends Component {
  constructor() {
    super()
    this.debounceInput = ''
    this.debounceTimer = null
    this.firebaseRef = null
    this.state = {
      pathSuffix: '',
      isClearPath: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref('/')
    this.firebaseRef.once('value').then((snapshot) => {
      while (true) {
        var word = RandomWords()
        if (!snapshot.hasChild(word)) {
          this.setState({
            pathSuffix: word,
            isClearPath: true
          })
          break
        }
      }
    })
  }

  checkForClearPath(word) {
    this.firebaseRef.once('value').then((snapshot) => {
      if (snapshot.hasChild(word)) {
        this.setState({
          isClearPath: false
        })
      } else {
        this.setState({
          isClearPath: true
        })        
      }
    })
  }

  handleInputChange(event) {
    this.debounceInput = event.target.value
    this.setState({
      pathSuffix: this.debounceInput
    })
    clearTimeout(this.debounceTimer)
    if (this.debounceInput !== '') {
      this.debounceTimer = setTimeout(() => {
        this.checkForClearPath(this.debounceInput)
      }, 100)
    } else {
      this.setState({
        isClearPath: false
      })
    }
  }

  render() {
    const styles = {
      button: {
        backgroundColor: COLOURS.GREEN,
        border: 'none',
        borderRadius: SIZE.px(1),
        color: COLOURS.WHITE,
        cursor: 'pointer',
        fontSize: SIZE.em(1),
        fontWeight: 'bold',
        marginBottom: SIZE.px(4),
        padding: SIZE.px(2),
        ':hover': {
          backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1))',
        },
        ':disabled': {
          cursor: 'not-allowed',
          opacity: 0.4,
        }
      }
    }

    return (
      <div>
        <Clock />
        <TimerLink pathSuffix={this.state.pathSuffix} />
        <CustomPathInput pathSuffix={this.state.pathSuffix} isClearPath={this.state.isClearPath} handleInputChange={this.handleInputChange} />
        <button style={styles.button} disabled={!this.state.isClearPath}>Create timer at the above URL</button>
        <Footer />
      </div>
    )
  }
}

export default Radium(Home)
