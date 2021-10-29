/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { RunWasmClient } from './RunWasmClient'
import Editor from './Editor'

declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    pyodide: any
    languagePluginLoader: any
    ts: any
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

export { RunWasm, createRunWasmClient, Editor }
