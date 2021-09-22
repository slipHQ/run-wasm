import React, { useState } from 'react'
import { createPythonClient, RunWasm } from 'run-wasm'
import Editor from '@monaco-editor/react'
import './App.css'

declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    pyodide: any
    languagePluginLoader: any
  }
}

function App() {
  const [output, setOutput] = useState('# loading...')
  const [inputCode, setInputCode] = useState('')
  let pythonClient = createPythonClient(window.pyodide)

  async function runCode(code: string) {
    let output = await pythonClient.run({ code })
    setOutput(output)
  }

  return (
    <div className="app">
      <RunWasm language="Python" code={inputCode} />

      <Editor
        height="25rem"
        defaultLanguage="python"
        defaultValue={inputCode}
        onChange={(value) => setInputCode(value ?? '')}
        className="code-editor"
        theme="vs-dark"
      />

      <button onClick={() => runCode(inputCode)}>Run Code</button>

      <h3 style={{ marginBottom: 0 }}>Output</h3>

      <Editor
        height="10rem"
        defaultLanguage="python"
        value={output.toString()}
        className="code-editor"
        theme="vs-dark"
      />
    </div>
  )
}

export default App
