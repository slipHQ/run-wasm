/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RunWasmClient, PythonClient } from './RunWasmClient';
function RunWasm(_a) {
    var language = _a.language, code = _a.code;
    return (React.createElement("div", null,
        "This will be an easy to use code editor that shows the power of run-wasm. It will run this language:",
        language,
        " and execute this code:",
        React.createElement("code", null, code)));
}
var createRunWasmClient = function (language) {
    return new RunWasmClient(language);
};
var createPythonClient = function (pyodide) {
    return new PythonClient(pyodide);
};
export { RunWasm, createRunWasmClient, createPythonClient };
