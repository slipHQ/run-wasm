'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.createRunWasmClient = exports.RunWasm = void 0
var react_1 = __importDefault(require('react'))
var RunWasmClient_1 = require('./RunWasmClient')
function RunWasm(_a) {
  var language = _a.language,
    code = _a.code
  return react_1.default.createElement(
    'div',
    null,
    'Run ',
    language,
    ' and execute ',
    code
  )
}
exports.RunWasm = RunWasm
var createRunWasmClient = function (language) {
  return new RunWasmClient_1.RunWasmClient(language)
}
exports.createRunWasmClient = createRunWasmClient
