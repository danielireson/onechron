import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import { APP_NAME } from '../config/vars.js'
import Clock from '../components/Clock'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import Timer from '../components/Timer'
import TimerLink from '../components/TimerLink'
import TimerControls from '../components/TimerControls'

class Live extends Component {
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
    this.firebaseRef = firebase.database().ref(this.props.params.path)
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

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  setTime(minutes) {
    let endTime = new Date().getTime() + minutes * 60 * 1000
    this.firebaseRef.update({
      endTime: endTime
    })
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

  render() {
    return (
      <div>
        <Clock />
        <FullScreenButton />
        <TimerLink path={this.props.params.path} />
        <Timer isLoaded={this.state.isLoaded} endTime={this.state.endTime} />
        <TimerControls isLoaded={this.state.isLoaded} hasControls={this.state.hasControls} setTime={this.setTime} toggleControlsVisiblity={this.toggleControlsVisiblity} />
        <Footer />
      </div>
    )
  }
}

export default Live
