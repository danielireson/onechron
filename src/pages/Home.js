import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { observer } from 'mobx-react'

import { APP_NAME } from '../config/vars'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

import Button from '../components/Button'
import Clock from '../components/Clock'
import CustomPathInput from '../components/CustomPathInput'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import TimerLink from '../components/TimerLink'

@observer
class Home extends Component {
  constructor() {
    super()
    document.title = APP_NAME
    UiState.hasLink = true
  }

  handleCreateTimerButton() {
    TimerStore.createTimer().then(() => {
      browserHistory.push(TimerStore.path)
    })
  }

  render() {
    return (
      <div>
        <Clock />
        <FullScreenButton />
        <TimerLink hasLink={true} />
        <CustomPathInput />
        <Button text='Create timer' type='success' onClick={this.handleCreateTimerButton} isDisabled={!TimerStore.isClearPath} noMarginRight />
        <Footer />
      </div>
    )
  }
}

export default Home
