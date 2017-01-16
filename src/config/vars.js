export const APP_NAME = 'OneClock'

export const COLOURS = {
  BLUE: '#3498db',
  DARK_BLUE: '#2980b9',
  GREEN: '#2ecc71',
  RED: '#e74c3c',
  GREY: '#e6e6e6',
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
  },
}

export const PREMIER_LEAGUE_NICKNAMES = [
  'baggies',
  'black cats',
  'blues',
  'boro',
  'canaries',
  'cherries',
  'citizens',
  'clarets',
  'eagles',
  'foxes',
  'gunners',
  'hammers',
  'hornets',
  'magpies',
  'potters',
  'red devils',
  'reds',
  'saints',
  'swans',
  'tigers',
  'toffees',
]
