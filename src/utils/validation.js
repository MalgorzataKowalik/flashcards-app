export function isNotEmptyString(value) {
  if (!(typeof value === 'string')) {
    return true
  }
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isNameRegexMatch(value) {
  const regex = new RegExp('^\\S{3,15}$')
  return regex.test(value);
}

export function getInvalidPasswordError(value, passwordError) {
  if (!isValidPassword(value)) {
    return passwordError
  }
  
  return ''
}

export function isValidPassword(value) {
  const regex = new RegExp('^(?=.*[!@#$%^&*()-_=+{};:,<.>?\\/\\\])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\\S{8,15}$')
  return regex.test(value);
}

export function getInvalidNameError(value, names) {
  if (!isNameRegexMatch(value)) {
    return 'Name must be 3 to 15 characters long and contain no spaces.'
  } else if (!names) {
    return 'Due to error occured name availability can not be check. Please again later.'
  } else if (names.find(name => name.toLowerCase() === value.toLowerCase())) {
    return 'This name is already taken'
  }

  return ''
}


