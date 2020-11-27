const path = require("path")
const { spawn } = require("child_process")
const assert = require("assert")
const fs = require("fs")

const {
  portAcquisitionServerLauncher,
  portAcquisitionAddressFile,
} = require("./constants")
const globalTeardown = require("./globalTeardown.js")

module.exports = async function () {
  for (const ev of ["SIGINT", "SIGHUP", "SIGQUIT", "SIGTERM", "exit"]) {
    process.on(ev, globalTeardown)
  }
  console.log("\nSETUP: Setting up port acquisiton daemon...")

  await new Promise(function (resolve, reject) {
    const daemon = spawn("node", [portAcquisitionServerLauncher], {
      stdio: "pipe",
    })
    global.PORT_ACQUISITION_SERVER = daemon
    const setAddress = function (addr) {
      global.PORT_ACQUISITION_ADDRESS = addr
    }

    const resolutionRef = {}
    daemon.stdout.on("data", function (output) {
      if (resolutionRef.current) {
        return
      }

      resolutionRef.current = true
      output = output.toString().trim()
      const matches = output.match(/\S+:[0-9]+$/)
      assert.ok(matches)
      fs.writeFileSync(portAcquisitionAddressFile, matches[0])
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
