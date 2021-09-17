import React from 'react'
import { RunWasmClient } from './RunWasmClient'

function RunWasm({
  language,
  code,
}: {
  language: string
  code: string
}): JSX.Element {
  return (
    <div>
      Run {language} and execute {code}
    </div>
  )
}

const createRunWasmClient = (language: string): RunWasmClient => {
  return new RunWasmClient(language)
}

export { RunWasm, createRunWasmClient }
