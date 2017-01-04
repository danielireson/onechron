import React, { Component } from 'react'
import firebase from 'firebase'
import Clock from '../components/Clock'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import Timer from '../components/Timer'
import TimerLink from '../components/TimerLink'

class Live extends Component {
  constructor() {
    super()
    this.firebaseRef = null
    this.state = {
      controlsVisible: false,
      created_at: 0,
      end_time: 0,
      paused: false
    }
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref(this.props.params.path)
    this.firebaseRef.on('value', (snapshot) => {
      this.setState(snapshot.val())
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  render() {
    return (
      <div>
        <Clock />
        <FullScreenButton />
        <TimerLink path={this.props.params.path} />
        <Timer end_time={this.state.end_time} paused={this.state.paused} />
        <Footer />
      </div>
    )
  }
}

export default Live
