import { createTSClient, TSClient } from '../src'

describe('createTSClient', () => {
  it('should return an instance of TSClient', () => {
    const fakeTsWindowObject = {
      test: 'test',
    }
    const tsClient = createTSClient(fakeTsWindowObject)

    expect(tsClient).toBeInstanceOf(TSClient)
  })
})
