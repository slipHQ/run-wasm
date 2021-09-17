"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPythonClient = exports.createRunWasmClient = exports.RunWasm = void 0;
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = __importDefault(require("react"));
var RunWasmClient_1 = require("./RunWasmClient");
function RunWasm(_a) {
    var language = _a.language, code = _a.code;
    return (react_1.default.createElement("div", null,
        "This will be an easy to use code editor that shows the power of run-wasm. It will run this language:",
        language,
        " and execute this code:",
        react_1.default.createElement("code", null, code)));
}
exports.RunWasm = RunWasm;
var createRunWasmClient = function (language) {
    return new RunWasmClient_1.RunWasmClient(language);
};
exports.createRunWasmClient = createRunWasmClient;
var createPythonClient = function (pyodide) {
    return new RunWasmClient_1.PythonClient(pyodide);
};
exports.createPythonClient = createPythonClient;
