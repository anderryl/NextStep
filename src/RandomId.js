function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function RandomId() {
  var conts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
   'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D',
    'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
  var ret = ''
  var i = 0
  while (i < 20) {
    ret = ret.concat(conts[getRandomInt(36)])
    i ++
  }
  return ret
}
