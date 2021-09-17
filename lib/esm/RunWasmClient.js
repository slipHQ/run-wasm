/*
A client for running arbitrary WASM code.
*/
var RunWasmClient = /** @class */ (function () {
  function RunWasmClient(language) {
    this.language = language
  }
  RunWasmClient.prototype.run = function (_a) {
    var input = _a.input
    return new Promise(function (resolve) {
      resolve(input)
    })
  }
  return RunWasmClient
})()
export { RunWasmClient }
