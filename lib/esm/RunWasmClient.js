/* eslint-disable @typescript-eslint/no-explicit-any */
/*
A client for running arbitrary WASM code.
*/
var RunWasmClient = /** @class */ (function () {
    function RunWasmClient(language) {
        this.language = language;
    }
    RunWasmClient.prototype.run = function (_a) {
        var input = _a.input;
        return new Promise(function (resolve) {
            resolve(input);
        });
    };
    return RunWasmClient;
}());
export { RunWasmClient };
var PythonClient = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function PythonClient(pyodide) {
        this.pyodide = pyodide;
    }
    PythonClient.prototype.run = function (_a) {
        var _this = this;
        var code = _a.code;
        return new Promise(function (resolve) {
            var output = _this.pyodide.loadPackage([]).then(function () {
                var output = _this.pyodide.runPython(code);
                console.log(output);
                return output;
            });
            resolve(output);
        });
    };
    return PythonClient;
}());
export { PythonClient };
