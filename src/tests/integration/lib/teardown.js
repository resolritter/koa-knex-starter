const fs = require("fs")
const cp = require("child_process")

module.exports = function () {
  if (global.PORT_ACQUISITION_DAEMON) {
    global.PORT_ACQUISITION_DAEMON.kill()
    global.PORT_ACQUISITION_DAEMON = undefined
  }
}
