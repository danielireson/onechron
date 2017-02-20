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
      <TimerLink hasLink={props.hasLink} path={props.path} />
      <Timer isLoaded={props.isLoaded} endTime={props.endTime} />
      <TimerControls 
        isLoaded={props.isLoaded} 
        hasControls={props.hasControls} 
        setTime={props.setTime} 
        toggleControlsVisiblity={props.toggleControlsVisiblity} 
        toggleLinkVisibility={props.toggleLinkVisibility} />
      <Footer />
    </div>
  )
}

Live.PropTypes = {
  path: React.PropTypes.string.isRequired,
  isLoaded: React.PropTypes.bool.isRequired,
  hasControls: React.PropTypes.bool.isRequired,
  hasLink: React.PropTypes.bool.isRequired,
  endTime: React.PropTypes.number.isRequired,
  toggleControlsVisiblity: React.PropTypes.func.isRequired,
  toggleLinkVisibility: React.PropTypes.func.isRequired,
  setTime: React.PropTypes.func.isRequired,
}

export default Live
