export const getInteger = (min, max) => {
    let value = Math.floor(Math.random() * (max - min + 1) ) + min;
    if ((value + '').length == 1) { return '0' + value }
    return value + ''
  }

export const hourToAmPm = (hour) => {
    if (hour == 0 ) { hour = 12 }
    if (hour > 12) { hour = hour - 12 }
    return hour
  }