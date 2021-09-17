/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { RunWasmClient, PythonClient } from './RunWasmClient'

declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    pyodide: any
    languagePluginLoader: any
  }
}

function RunWasm({
  language,
  code,
}: {
  language: string
  code: string
}): JSX.Element {
  return (
    <div>
      This will be an easy to use code editor that shows the power of run-wasm.
      It will run this language:{language} and execute this code:
      <code>{code}</code>
    </div>
  )
}

const createRunWasmClient = (language: string): RunWasmClient => {
  return new RunWasmClient(language)
}

const createPythonClient = (pyodide: string): PythonClient => {
  return new PythonClient(pyodide)
}
export { RunWasm, createRunWasmClient, createPythonClient }
