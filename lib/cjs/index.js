"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var RunWasm = function (_a) {
    var language = _a.language, code = _a.code;
    return (react_1.default.createElement("div", null,
        "Run ",
        language,
        " and execute ",
        code));
};
exports.default = RunWasm;
