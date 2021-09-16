import React from "react";
import RunWasm from "run-wasm";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <RunWasm language='Python' code="print('hello world')" />
    </div>
  );
}

export default App;
