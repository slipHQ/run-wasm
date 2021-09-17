/// <reference types="react" />
import { RunWasmClient } from './RunWasmClient'
declare function RunWasm({
  language,
  code,
}: {
  language: string
  code: string
}): JSX.Element
declare const createRunWasmClient: (language: string) => RunWasmClient
export { RunWasm, createRunWasmClient }
