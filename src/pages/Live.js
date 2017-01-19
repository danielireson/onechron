import React from 'react'
import Clock from '../components/Clock'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import Timer from '../components/Timer'
import TimerLink from '../components/TimerLink'
import TimerControls from '../components/TimerControls'

const Live = (props) => {
  return (
    <div>
      <Clock />
      <FullScreenButton />
      <TimerLink path={props.path} />
      <Timer isLoaded={props.isLoaded} endTime={props.endTime} />
      <TimerControls isLoaded={props.isLoaded} hasControls={props.hasControls} setTime={props.setTime} toggleControlsVisiblity={props.toggleControlsVisiblity} />
      <Footer />
    </div>
  )
}

export default Live
