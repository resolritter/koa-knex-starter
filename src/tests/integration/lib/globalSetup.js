const path = require("path")
const { spawn } = require("child_process")
const fs = require("fs")

const {
  portAcquisitionHostPort,
  portAcquisitionDaemonPath,
} = require("./constants")
const globalTeardown = require("./globalTeardown.js")

module.exports = async function () {
  for (const ev of ["SIGINT", "SIGHUP", "SIGQUIT", "SIGTERM", "exit"]) {
    process.on(ev, globalTeardown)
  }
  console.log("\nSETUP: Setting up port acquisiton daemon...")
  await new Promise(function (resolve, reject) {
    const daemon = spawn(
      "node",
      [portAcquisitionDaemonPath, portAcquisitionHostPort],
      {
        stdio: "pipe",
      },
    )
    global.PORT_ACQUISITION_DAEMON = daemon

    const resolutionRef = {}
    daemon.stdout.on("data", function () {
      if (resolutionRef.current) {
        return
      }
      resolutionRef.current = true
      resolve()
    })
    daemon.stderr.on("data", function (err) {
      if (resolutionRef.current) {
        return
      }
      resolutionRef.current = true
      reject(err)
    })
  })
}
