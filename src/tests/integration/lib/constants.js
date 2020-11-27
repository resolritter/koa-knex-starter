const path = require("path")

module.exports.portAcquisitionServerLauncher = path.join(
  __dirname,
  "../../../../node_modules/port_acquisition_server/main.js",
)
module.exports.portAcquisitionAddressFile = path.join(
  __dirname,
  "../.portAcquisitionAddress",
)
module.exports.serverLauncher = path.join(__dirname, "../../../main.js")
