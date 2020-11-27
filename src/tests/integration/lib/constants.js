const path = require("path")

// FIXME have submodules or package dependency
module.exports.portAcquisitionServerLauncher = path.join(
  __dirname,
  "../../../../../port_acquisition_server/main.js",
)
module.exports.portAcquisitionAddressFile = path.join(
  __dirname,
  "../.portAcquisitionAddress",
)
module.exports.serverLauncher = path.join(__dirname, "../../../main.js")
