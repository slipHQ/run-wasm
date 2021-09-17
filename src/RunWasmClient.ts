/* eslint-disable @typescript-eslint/no-explicit-any */
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

export class PythonClient {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public constructor(protected pyodide: any) {}

  public run({ code }: { code: string }): Promise<string> {
    return new Promise((resolve) => {
      const output = this.pyodide.loadPackage([]).then(() => {
        const output = this.pyodide.runPython(code)
        console.log(output)
        return output
      })
      resolve(output)
    })
  }
}
