export const COLOURS = {
  BLUE: '#3498db',
  DARK_BLUE: '#2980b9',
  GREEN: '#2ecc71',
  WHITE: '#fff',
}

export const SIZE = {
  BASE_PX: '5',
  BASE_EM: '1',
  px(multiple) {
    return (this.BASE_PX * multiple).toString() + 'px'
  },
  em(multiple) {
    return (this.BASE_EM * multiple).toString() + 'em'
  }
}
