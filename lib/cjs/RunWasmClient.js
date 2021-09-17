'use strict'
/*
A client for running arbitrary WASM code.
*/
Object.defineProperty(exports, '__esModule', { value: true })
exports.RunWasmClient = void 0
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
exports.RunWasmClient = RunWasmClient
