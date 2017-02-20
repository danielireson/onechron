import React  from 'react'
import Button from '../components/Button'
import Clock from '../components/Clock'
import CustomPathInput from '../components/CustomPathInput'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import TimerLink from '../components/TimerLink'

const Home = (props) => {
  return (
    <div>
      <Clock />
      <FullScreenButton />
      <TimerLink hasLink={true} path={props.path} />
      <CustomPathInput path={props.path} isClearPath={props.isClearPath} handleInputChange={props.handleInputChange} />
      <Button text='Create timer' type='success' onClick={props.handleCreateTimerButton} isDisabled={!props.isClearPath} noMarginRight />
      <Footer />
    </div>
  )
}

Home.propTypes = {
  path: React.PropTypes.string.isRequired,
  isClearPath: React.PropTypes.bool.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
  handleCreateTimerButton: React.PropTypes.func.isRequired,
}

export default Home
