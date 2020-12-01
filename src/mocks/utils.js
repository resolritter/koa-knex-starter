const fakePool = new Map()

module.exports.getUnique = function (cb) {
  let value
  while (true) {
    value = cb()
    if (!fakePool.has(value)) {
      fakePool.set(value, undefined)
      break
    }
  }
  return value
}
