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

  private loadPackages(code: string): Promise<any> {
    if (typeof this.pyodide.loadPackagesFromImports === 'function') {
      console.log('Loading Python dependencies from code')
      return this.pyodide.loadPackagesFromImports(code)
    } else {
      return this.pyodide.loadPackage([])
    }
  }

  public run({ code }: { code: string }): Promise<string> {
    return new Promise((resolve) => {
      const output = this.loadPackages(code).then(() => {
        const output = this.pyodide.runPython(code)
        console.log(output)
        return output
      })
      resolve(output)
    })
  }
}
