import React, { Component } from 'react'
import firebase from 'firebase'
import Clock from '../components/Clock'
import Footer from '../components/Footer'
import TimerLink from '../components/TimerLink'

class Live extends Component {
  constructor() {
    super()
    this.firebaseRef = null
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref(this.props.params.path)
  }

  render() {
    return (
      <div>
        <Clock />
        <TimerLink path={this.props.params.path} />
        <h3>Timer</h3>
        <Footer />
      </div>
    )
  }
}

export default Live
