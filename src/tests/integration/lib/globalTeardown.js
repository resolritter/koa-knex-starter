module.exports = function () {
  if (global.PORT_ACQUISITION_SERVER) {
    global.PORT_ACQUISITION_SERVER.kill()
    global.PORT_ACQUISITION_SERVER = undefined
  }
}
