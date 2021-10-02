import { createTSClient } from '../src'
import { TSClient } from '../src/RunWasmClient'

describe('createTSClient', () => {
  it('should return an instance of TSClient', () => {
    const fakeTsWindowObject = {
      test: 'test',
    }
    const tsClient = createTSClient(fakeTsWindowObject)

    expect(tsClient).toBeInstanceOf(TSClient)
  })
})
