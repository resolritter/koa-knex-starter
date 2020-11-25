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

let idCounter = 0
module.exports.getId = function () {
  return ++idCounter
}
