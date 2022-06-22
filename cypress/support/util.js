//  Faker is currently having some issues so a custom function is used instead. See: https://github.com/faker-js/faker/issues/1073
// import { faker } from '@faker-js/faker'
// export const getRandomEmail = () => faker.internet.email()

// Generates a random "Gmail"
export const getRandomEmail = () => {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for(var ii=0; ii<15; ii++){
      string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + '@gmail.com'
}

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

  export const invalidEmail = () => {
    let emails = [' ', 'asdsa', '1234', '@.com', 'asdsa.com', 'asdsa@sadsad', 'sadsad@asdsad.', '.com', 'asas@', '@sadsa', '@sadsa.']
    let randomPos = Math.floor(Math.random() * (emails.length-1) ) + 1
    let email = emails[randomPos]
    return email
  }