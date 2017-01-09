import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import Radium from 'radium'
import { APP_NAME, PREMIER_LEAGUE_NICKNAMES as SAMPLE_PATHS } from '../config/vars.js'
import UtilityService from '../services/utility.js'
import Button from '../components/Button'
import Clock from '../components/Clock'
import CustomPathInput from '../components/CustomPathInput'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import TimerLink from '../components/TimerLink'

class Home extends Component {
  constructor() {
    super()
    document.title = APP_NAME
    this.debounceTimer = null
    this.firebaseRef = null
    this.samplePaths = this.getSamplePaths()
    this.state = {
      path: '',
      isClearPath: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
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

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  setPathStateByKeystroke(word, index = 1) {
    if (index !== word.length + 1) {
      window.setTimeout(() => {
        this.setState({
          path: word.substr(0, index)
        }, this.setPathStateByKeystroke(word, index + 1))
      }, 25);
    }
  }

  getSamplePaths() {
    return UtilityService.shuffle(SAMPLE_PATHS).map((team) => {
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

  createFirebaseTimer() {
    this.firebaseRef.child(this.state.path).set({
      isPaused: false,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      endTime: firebase.database.ServerValue.TIMESTAMP,
    })
  }

  handleButtonClick() {
    this.createFirebaseTimer()
    browserHistory.push(this.state.path)
  }

  handleInputChange(event) {
    let debounceInput = event.target.value.replace(' ', '')
    this.setState({
      path: debounceInput
    })
    window.clearTimeout(this.debounceTimer)
    if (debounceInput !== '') {
      this.debounceTimer = window.setTimeout(() => {
        this.checkForClearPath(debounceInput)
      }, 100)
    } else {
      this.setState({
        isClearPath: false
      })
    }
  }

  render() {
    return (
      <div>
        <Clock />
        <FullScreenButton />
        <TimerLink path={this.state.path} />
        <CustomPathInput path={this.state.path} isClearPath={this.state.isClearPath} handleInputChange={this.handleInputChange} />
        <Button text='Create timer at the above URL' type='success' onClick={this.handleButtonClick} isDisabled={!this.state.isClearPath} noMarginRight />
        <Footer />
      </div>
    )
  }
}

export default Radium(Home)
