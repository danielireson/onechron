import { action, autorun, observable, reaction } from 'mobx'

import firebase from './FirebaseStore'

class TimerStore {
  @observable loading = true
  @observable path = ''
  @observable isClearPath = false
  @observable timer = {
    timerRef: null,
    createdAt: null,
    endTime: null,
    minutes: 0,
    seconds: 0
  }

  constructor() {
    this.subscribeToPathChecks()
  }

  setPath(path) {
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
      })
    }
  }

  @action subscribeToTimerUpdates() {
    autorun(() => {
      firebase.db.child(this.path).on('value', (snapshot) => {
        let data = snapshot.val()
        this.timer.createdAt = data.createdAt
        this.timer.endTime = data.endTime
      })
    })
    this.loading = false
  }

  setTime = (minutes) => {
    let endTime = new Date().getTime() + minutes * 60 * 1000 + 1000
    firebase.db.child(this.path).update({
      endTime: endTime
    })
  }
}

const timerStore = new TimerStore()
export default timerStore
