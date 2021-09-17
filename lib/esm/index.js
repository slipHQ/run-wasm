import React from 'react'
import { RunWasmClient } from './RunWasmClient'
function RunWasm(_a) {
  var language = _a.language,
    code = _a.code
  return React.createElement(
    'div',
    null,
    'Run ',
    language,
    ' and execute ',
    code
  )
}
var createRunWasmClient = function (language) {
  return new RunWasmClient(language)
}
export { RunWasm, createRunWasmClient }
