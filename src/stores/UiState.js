import { action, observable } from 'mobx'

class UiState {
  @observable fontSize = 100 
  @observable hasControls = false
  @observable hasLink = true
  @observable loading = true

  @action toggleControlsVisiblity = () => {
    this.hasControls = !this.hasControls
  }

  @action toggleLinkVisibility = () => {
    this.hasLink = !this.hasLink
  }

  @action setFontSize = (event) => {
    this.fontSize = Number(event.target.value)
  }
}

const uiState = new UiState()
export default uiState
