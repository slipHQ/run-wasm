import React, { useState } from 'react'
import { RunWasm, createRunWasmClient } from 'run-wasm'
import './App.css'

function App() {
  const [execution, setExecution] = useState('')
  let client = createRunWasmClient('Python')

  async function runCode(code: string) {
    let execution = await client.run({ input: code })
    setExecution(execution)
  }
  runCode("print('hello world')")

  console.log(execution)
  return (
    <div className="App">
      <RunWasm language="Python" code="print('hello world')" />
      {execution ?? <p>execution</p>}
    </div>
  )
}

export default App
