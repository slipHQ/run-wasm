/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* 
A client for running arbitrary WASM code.
*/

export class RunWasmClient {
  public constructor(protected language: string) {}

  public run({ input }: { input: string }): Promise<string> {
    return new Promise((resolve) => {
      resolve(input)
    })
  }
}
