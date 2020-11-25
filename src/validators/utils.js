module.exports.canBeParsedToInteger = function (value) {
  if (!value) {
    return
  }

  value = value.toString()
  for (let i = 0; i < value.length; ++i) {
    if (isNaN(parseInt(value[i]))) {
      return false
    }
  }

  return true
}
