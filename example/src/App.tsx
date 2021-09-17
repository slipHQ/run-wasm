import React, { useEffect, useState } from 'react'
import { RunWasm, createRunWasmClient, createPythonClient } from 'run-wasm'
import './App.css'
declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    pyodide: any
    languagePluginLoader: any
  }
}

function App() {
  const [output, setOutput] = useState('loading...')
  const [inputCode, setInputCode] = useState('')
  let pythonClient = createPythonClient(window.pyodide)

  async function runCode(code: string) {
    let output = await pythonClient.run({ code })
    setOutput(output)
  }
  return (
    <div className="App">
      <RunWasm language="Python" code="print('hello world')" />
      <input
        value={inputCode}
        onChange={(e) => {
          setInputCode(e.target.value)
        }}
      />
      <button onClick={() => runCode(inputCode)}></button>

      {output ?? <p>{output}</p>}
    </div>
  )
}

export default App
