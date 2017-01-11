export default {
  shuffle(array) {
    let i = 0
    while (i !== array.length) {
      let randomIndex = Math.floor(Math.random() * i)
      let tempItem = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = tempItem
      i++
    }
    return array  
  },
}
