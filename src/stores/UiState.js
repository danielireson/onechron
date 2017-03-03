import { action, observable } from 'mobx'

class UiState {
  @observable fontSize = 100 
  @observable hasControls = false
  @observable hasLink = true

  @action toggleControlsVisiblity = () => {
    if (this.hasControls) {
      this.hasControls = false
    } else {
      this.hasControls = true
    }
  }

  @action toggleLinkVisibility = () => {
    if (this.hasLink) {
      this.hasLink = false
    } else {
      this.hasLink = true
    }
  }

  @action setFontSize = (event) => {
    this.fontSize = Number(event.target.value)
  }
}

const uiState = new UiState()
export default uiState
