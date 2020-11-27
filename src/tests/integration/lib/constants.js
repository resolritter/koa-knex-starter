const path = require("path")

// FIXME have submodules or package dependency
module.exports.daemonPath = path.join(
  __dirname,
  "../../../../../port_acquisition_daemon/main.js",
)
module.exports.portAcquisitionHostPort = 42237
module.exports.portAcquisitionHost = `http://127.0.0.1:${module.exports.portAcquisitionHostPort}`
// FIXME have submodules or package dependency
module.exports.portAcquisitionDaemonPath = path.join(
  __dirname,
  "../../../../../port_acquisition_daemon/main.js",
)
module.exports.serverPath = path.join(__dirname, "../../../main.js")
