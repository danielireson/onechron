import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import TimerStore from '../stores/TimerStore'

import Clock from '../components/Clock'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import Timer from '../components/Timer'
import TimerLink from '../components/TimerLink'
import TimerControls from '../components/TimerControls'

class View extends Component {
  constructor() {
    super()
    TimerStore.resetTimer()
  }

  componentWillMount() {
    this.checkTimerExists()
  }

  checkTimerExists() {
    TimerStore.setPath(this.props.params.path)
    TimerStore.checkForClearPath().then((isClearPath) => {
      if (isClearPath) {
        // No timer at this URL therefore redirect home
        browserHistory.push('/')
      }
    })    
  }

  render() {
    return (
      <div>
        <Timer />
      </div>
    )
  }  
}

export default View
