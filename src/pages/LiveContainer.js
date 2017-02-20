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
      fontSize: 100,
      isLoaded: false,
      hasControls: false,
      hasLink: true,
    }
    this.toggleControlsVisiblity = this.toggleControlsVisiblity.bind(this)
    this.toggleLinkVisibility = this.toggleLinkVisibility.bind(this)
    this.setTime = this.setTime.bind(this)
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this)
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

  toggleLinkVisibility() {
    if (this.state.hasLink) {
      this.setState({
        hasLink: false
      })
    } else {
      this.setState({
        hasLink: true
      })
    }    
  }

  handleFontSizeChange(event) {
    this.setState({
      fontSize: Number(event.target.value)
    })
  }

  setTime(minutes) {
    let endTime = new Date().getTime() + minutes * 60 * 1000 + 1000
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
        hasLink={this.state.hasLink}
        endTime={this.state.endTime}
        fontSize={this.state.fontSize}
        handleFontSizeChange={this.handleFontSizeChange}
        toggleControlsVisiblity={this.toggleControlsVisiblity}
        toggleLinkVisibility={this.toggleLinkVisibility}
        setTime={this.setTime}
      />
    )
  }
}

export default LiveContainer
