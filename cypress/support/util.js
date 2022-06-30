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