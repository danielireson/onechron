import React, { Component } from 'react'
import firebase from 'firebase'
import Clock from '../components/Clock'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import Timer from '../components/Timer'
import TimerLink from '../components/TimerLink'
import TimerControls from '../components/TimerControls'

class Live extends Component {
  constructor() {
    super()
    this.firebaseRef = null
    this.state = {
      controlsVisible: false,
      created_at: 0,
      end_time: 0,
      loaded: false,
      paused: false,
    }
    this.toggleControlsVisiblity = this.toggleControlsVisiblity.bind(this)
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref(this.props.params.path)
    this.firebaseRef.on('value', (snapshot) => {
      this.setState(snapshot.val())
      window.setTimeout(() => {
        this.setState({
          loaded: true
        })
      }, 1000)
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  toggleControlsVisiblity() {
    if (this.state.controlsVisible) {
      this.setState({
        controlsVisible: false
      })
    } else {
      this.setState({
        controlsVisible: true
      })
    }
  }

  render() {
    return (
      <div>
        <Clock />
        <FullScreenButton />
        <TimerLink path={this.props.params.path} />
        <Timer loaded={this.state.loaded} end_time={this.state.end_time} paused={this.state.paused} />
        <Footer />
      </div>
    )
  }
}

export default Live
