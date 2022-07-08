//  Faker is currently having some issues so a custom function is used instead. See: https://github.com/faker-js/faker/issues/1073
// import { faker } from '@faker-js/faker'
// export const getRandomEmail = () => faker.internet.email()

/**
 * It generates a random valid email that follows the 'xxxx@gmail.com' format
 * @returns {string} The generated email
 */
export const getRandomEmail = () => {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for(var ii=0; ii<15; ii++){
      string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + '@gmail.com'
}

/**
 * It generates an integer number between 'min' and 'max'. This function is mainly used to generate a random day or month for a date. 
 * @param {number} min 
 * @param {number} max 
 * @returns The generated integer in string format
 */
export const getInteger = (min, max) => {
    let value = Math.floor(Math.random() * (max - min + 1) ) + min;
    if ((value + '').length == 1) { return '0' + value }
    return value + ''
  }

/**
 * It takes an hour in 24H format and turns it to an 12H format
 * @param {number} hour 
 * @returns 
 */
export const hourToAmPm = (hour) => {
    if (hour == 0 ) { hour = 12 }
    if (hour > 12) { hour = hour - 12 }
    return hour
  }

/**
 * It generates a random invalid email.
 * @returns {string} The generated email wiht an invalid format
 */
  export const invalidEmail = () => {
    //more invalid emails can be added to the array
    let emails = [' ', 'asdsa', '1234', '@.com', 'asdsa.com', 'asdsa@sadsad', 'sadsad@asdsad.', '.com', 'asas@', '@sadsa', '@sadsa.']
    let randomPos = Math.floor(Math.random() * (emails.length-1) ) + 1
    let email = emails[randomPos]
    return email
  }

  /**
   * It turn a date into a MM/DD/YYYY format
   * @param {string} date A date with the 'Day, Mon DD, YYYY' format, ex. 'Monday, May 5, 2022'
   * @returns {string} The formated date
   */ 
  export const changeDateENFormatToMMDDYYY = (date) =>{
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let dateArray = date.split(' ') //['Day,', 'Month', 'day,', 'year']
    let month = dateArray[1]
    let day = dateArray[2].split(',')[0] //to erase the ',' from the day
    month = months.indexOf(month) + 1 //get the position of the month in the array and add 1 because the array index starts with 0
    let year = dateArray[3]
    return month + '/' + day + '/' + year
  }

  /**
   * It turn a date into a MM/DD/YYYY format
   * @param {string} date A date with the 'Dia, day de Month de year' format, ex. 'Lunes, 5 de Mayo de 2022'
   * @returns {string} The formated date
   */ 
   export const changeDateESFormatToMMDDYYY = (date) =>{
    let months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    let dateArray = date.split(' ') //['Día,', 'day', 'De', 'Month', 'De', 'year']
    let month = dateArray[3]
    let day = dateArray[1]
    month = months.indexOf(month) + 1 //get the position of the month in the array and add 1 because the array index starts with 0
    let year = dateArray[5]
    return month + '/' + day + '/' + year
  }

  /**
   * It get today's date and put it into an array. It also erases the '0' in one-digit days (Ex. '06' --> '6')
   * @returns An array with today's date, [Mon, DD, YYYY]. Ex ['May', '15', '2022']
   */
  export const getTodayDateArray = () => {
    let today = new Date().toDateString().split(' ') // the event was created with today's date. Ex. of eventDate: ['Wed', 'Jun', '15', '2022']
    let month = today[1]
    let day = ((today[2])[0] =='0')?(today[2])[1]:(today[2]) //Ex. turn day '06' to '6'
    let year = today[3]
    return [month, day, year]
  }