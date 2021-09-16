import React from "react";
var RunWasm = function (_a) {
    var language = _a.language, code = _a.code;
    return (React.createElement("div", null,
        "Run ",
        language,
        " and execute ",
        code));
};
export default RunWasm;
