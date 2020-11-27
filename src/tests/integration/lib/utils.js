const path = require("path")
const cp = require("child_process")
const fetch = require("node-fetch")
const { portAcquisitionHost, serverPath } = require("./constants")

module.exports.serviceOrchestrationWrapper = function (test) {
  return async function () {
    let port, serverProc, isFinished
    try {
      const acquireResponse = await fetch(
        `${portAcquisitionHost}/acquirePort`,
        {
          method: "GET",
          mode: "cors",
        },
      )
      expect(acquireResponse.status).toBe(201)
      port = await acquireResponse.text()
      expect(port).toBeDefined()

      serverProc = cp.spawn("node", [serverPath, port])
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
