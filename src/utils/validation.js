export function isNotEmptyString(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}