import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import { APP_NAME } from '../config/vars.js'
import Live from './Live.js'

class LiveContainer extends Component {
  constructor() {
    super()
    document.title = APP_NAME
    this.firebaseRef = null
    this.state = {
      createdAt: 0,
      endTime: 0,
      isLoaded: false,
      hasControls: false,
    }
    this.toggleControlsVisiblity = this.toggleControlsVisiblity.bind(this)
    this.setTime = this.setTime.bind(this)
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref(this.props.params.path.toLowerCase())
    this._setStateFromFirebaseOrRedirectHome()
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  toggleControlsVisiblity() {
    if (this.state.hasControls) {
      this.setState({
        hasControls: false
      })
    } else {
      this.setState({
        hasControls: true
      })
    }
  }

  setTime(minutes) {
    let endTime = new Date().getTime() + minutes * 60 * 1000
    this.firebaseRef.update({
      endTime: endTime
    })
  }

  _setStateFromFirebaseOrRedirectHome() {
    this.firebaseRef.on('value', (snapshot) => {
      let data = snapshot.val()
      if (data) {
        this.setState(snapshot.val(), () => {
          window.setTimeout(() => {
            this.setState({
              isLoaded: true
            })
          }, 500)
        })
      } else {
        // Timer doesn't exist
        browserHistory.push('/')
      }
    })    
  }

  render() {
    return (
      <Live 
        path={this.props.params.path}
        isLoaded={this.state.isLoaded}
        hasControls={this.state.hasControls}
        endTime={this.state.endTime}
        toggleControlsVisiblity={this.toggleControlsVisiblity}
        setTime={this.setTime}
      />
    )
  }
}

export default LiveContainer
