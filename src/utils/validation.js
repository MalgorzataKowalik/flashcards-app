const passwordErrorText = `<span>Password must</span>
<span>• be 8 to 15 characters long,</span>
<span>• contain no spaces,</span>
<span>• contain at least one lowercase letter and at least one uppercase letter,</span>
<span>• contain at least one number,</span>
<span>• contain at least one special character.</span>`

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

export function getInvalidPasswordError(value) {
  if (!isValidPassword(value)) {
    return passwordErrorText
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



