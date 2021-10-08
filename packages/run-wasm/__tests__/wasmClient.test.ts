import { createRunWasmClient } from '../src/index'
import { RunWasmClient } from '../src/RunWasmClient'

describe('createRunWasmClient', () => {
  it('should return an instance of WasmClient', () => {
    const wasmClient = createRunWasmClient('python')

    expect(wasmClient).toBeInstanceOf(RunWasmClient)
  })
})
