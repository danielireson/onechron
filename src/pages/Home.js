import React, { Component } from 'react'
import firebase from 'firebase'
import Radium from 'radium'
import { COLOURS, SIZE, PREMIER_LEAGUE_NICKNAMES } from '../config/vars.js'
import Clock from '../components/Clock'
import CustomPathInput from '../components/CustomPathInput'
import Footer from '../components/Footer'
import TimerLink from '../components/TimerLink'

class Home extends Component {
  constructor() {
    super()
    this.debounceTimer = null
    this.firebaseRef = null
    this.samplePaths = this.getSamplePaths()
    this.state = {
      path: '',
      isClearPath: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref('/')
    this.firebaseRef.once('value').then((snapshot) => {
      for (let i = 0; i < this.samplePaths.length; i++) {
        if (this.state.path === '' && !snapshot.hasChild(this.samplePaths[i])) {
          this.setState({
            isClearPath: true
          })
          this.setPathStateByKeystroke(this.samplePaths[i])
          break
        }
      }
    })
  }

  setPathStateByKeystroke(word, index = 1) {
    if (index !== word.length + 1) {
      setTimeout(() => {
        this.setState({
          path: word.substr(0, index)
        }, this.setPathStateByKeystroke(word, index + 1))
      }, 25);
    }
  }

  getSamplePaths() {
    return PREMIER_LEAGUE_NICKNAMES.map((team) => {
      return team.replace(' ', '')
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
    let debounceInput = event.target.value.replace(' ', '')
    this.setState({
      path: debounceInput
    })
    clearTimeout(this.debounceTimer)
    if (debounceInput !== '') {
      this.debounceTimer = setTimeout(() => {
        this.checkForClearPath(debounceInput)
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
        <TimerLink path={this.state.path} />
        <CustomPathInput path={this.state.path} isClearPath={this.state.isClearPath} handleInputChange={this.handleInputChange} />
        <button style={styles.button} disabled={!this.state.isClearPath}>Create timer at the above URL</button>
        <Footer />
      </div>
    )
  }
}

export default Radium(Home)
