import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import { APP_NAME, PREMIER_LEAGUE_NICKNAMES as SAMPLE_PATHS } from '../config/vars.js'
import Home from './Home'

class HomeContainer extends Component {
  constructor() {
    super()
    document.title = APP_NAME
    this.firebaseRef = null
    this.state = {
      path: '',
      isClearPath: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCreateTimerButton = this.handleCreateTimerButton.bind(this)
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref('/')
    this._setSamplePathToState()
  }

  componentDidMount() {
    this._clearOldFirebaseTimers()
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  handleInputChange(event) {
    let debounceInput = event.target.value.replace(' ', '')
    this.setState({
      path: debounceInput
    })
    window.clearTimeout(this.debounceTimer)
    if (debounceInput !== '') {
      this.debounceTimer = window.setTimeout(() => {
        this._checkFirebaseForClearPath(debounceInput)
      }, 100)
    } else {
      this.setState({
        isClearPath: false
      })
    }
  }

  handleCreateTimerButton() {
    this.firebaseRef.child(this.state.path.toLowerCase()).set({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      endTime: firebase.database.ServerValue.TIMESTAMP,
    }, () => {
      browserHistory.push(this.state.path)
    })
  }

  _checkFirebaseForClearPath(word) {
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

  _shuffleArray(array) {
    let i = 0
    while (i !== array.length) {
      let randomIndex = Math.floor(Math.random() * i)
      let tempItem = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = tempItem
      i++
    }
    return array
  }

  _getShuffledSamplePaths() {
    return this._shuffleArray(SAMPLE_PATHS).map((team) => {
      return team.replace(' ', '')
    })
  }

  _setSamplePathToState() {
    let samplePaths = this._getShuffledSamplePaths()
    this.firebaseRef.once('value').then((snapshot) => {
      for (let i = 0; i < samplePaths.length; i++) {
        if (this.state.path === '' && !snapshot.hasChild(samplePaths[i])) {
          this.setState({
            isClearPath: true
          })
          this._setPathStateByKeystroke(samplePaths[i])
          break
        }
      }
    })
  }

  _setPathStateByKeystroke(word, index = 1) {
    if (index !== word.length + 1) {
      window.setTimeout(() => {
        this.setState({
          path: word.substr(0, index)
        }, this._setPathStateByKeystroke(word, index + 1))
      }, 25);
    }
  }

  _clearOldFirebaseTimers() {
    this.firebaseRef.once('value').then((snapshot) => {
      snapshot.forEach((timer) => {
        let hours = (new Date(timer.val().endTime) - new Date()) / 1000 / 60 / 60
        // Delete timer if finished over 24 hours ago
        if (hours < -24) {
          this.firebaseRef.child(timer.key).remove()
        }
      })
    })
  }

  render() {
    return (
      <Home
        path={this.state.path}
        isClearPath={this.state.isClearPath}
        handleInputChange={this.handleInputChange} 
        handleCreateTimerButton={this.handleCreateTimerButton} />
    )
  }
}

export default HomeContainer
