import { action, observable, reaction } from 'mobx'

import firebase from './FirebaseStore'
import UiState from './UiState'

class TimerStore {
  @observable path = ''
  @observable isClearPath = false
  @observable message = ''
  @observable timer = {
    timerRef: null,
    createdAt: null,
    endTime: null,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  constructor() {
    this.subscribeToPathChecks()
    this.clearOldFirebaseTimers()
  }

  @action resetTimer() {
    this.timer = {
      timerRef: null,
      createdAt: null,
      endTime: null,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  @action setPath(path) {
    this.path = path
  }

  checkForClearPath() {
    return new Promise((resolve, reject) => {
      firebase.db.once('value').then((snapshot) => {
        if (snapshot.hasChild(this.path)) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  @action subscribeToPathChecks() {
    reaction(() => this.path, () => {
      if (this.path !== '') {
        this.checkForClearPath().then((isClearPath) => {
          if (isClearPath) {
            this.isClearPath = true
          } else {
            this.isClearPath = false
          }
        })
      } else {
        this.isClearPath = false
      }
    }, {delay: 100})
  }

  createTimer() {
    if (this.path !== '') {
      return firebase.db.child(this.path).set({
        createdAt: firebase.timestamp,
        endTime: firebase.timestamp,
        message: "Countdown",
      })
    }
  }

  @action subscribeToTimerUpdates() {
    firebase.db.child(this.path).on('value', (snapshot) => {
      let data = snapshot.val()
      this.timer.createdAt = data.createdAt
      this.timer.endTime = data.endTime
      this.message = data.message
    })
    UiState.loading = false
  }

  clearOldFirebaseTimers() {
    firebase.db.once('value').then((snapshot) => {
      snapshot.forEach((timer) => {
        let hours = (new Date(timer.val().endTime) - new Date()) / 1000 / 60 / 60
        // Delete timer if finished over 24 hours ago
        if (hours < -24) {
          firebase.db.child(timer.key).remove()
        }
      })
    })
  }

  setTime = (minutes) => {
    let endTime = new Date().getTime() + minutes * 60 * 1000 + 1000
    firebase.db.child(this.path).update({
      endTime: endTime
    })
  }

  setMessage = (msg) =>{
    firebase.db.child(this.path).update({
      message: msg
    })
  }
}

const timerStore = new TimerStore()
export default timerStore
