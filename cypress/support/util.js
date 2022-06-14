export const getInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

export const hourToAmPm = (hour) => {
    hour = hour > 12 ? (hour - 12) : hour
    return hour
  }