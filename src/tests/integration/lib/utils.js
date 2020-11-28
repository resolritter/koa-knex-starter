const fs = require("fs")
const cp = require("child_process")

const fetch = require("node-fetch")

const { serverLauncher, portAcquisitionAddressFile } = require("./constants")

const portAcquisitionAddress = fs
  .readFileSync(portAcquisitionAddressFile)
  .toString()

module.exports.serviceOrchestrationWrapper = function (test) {
  return async function () {
    let port, serverProc, isFinished
    try {
      const acquireResponse = await fetch(
        `${portAcquisitionAddress}/acquirePort`,
        {
          method: "GET",
          mode: "cors",
        },
      )
      expect(acquireResponse.status).toBe(201)
      port = await acquireResponse.text()
      expect(port).toBeDefined()

      serverProc = cp.spawn("node", [serverLauncher, port])
      await new Promise(function (resolve) {
        serverProc.stdout.on("data", function (data) {
          resolve()
          if (!isFinished) {
            console.log("SERVER", data.toString())
          }
        })
        serverProc.stderr.on("data", function (err) {
          err = err.toString()
          if (!isFinished) {
            console.log(err)
            throw new Error("SERVER", err)
          }
        })
      })

      await test({ host: `http://127.0.0.1:${port}` })
    } finally {
      if (serverProc) {
        serverProc.kill()
      }
      isFinished = true
    }
  }
}
