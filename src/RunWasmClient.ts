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
  // <- [reference](https://stackoverflow.com/a/59571016/1375972)
  // We redirect stdout to an IO string buffer so that it can be read later
  private readonly setStdoutToOutput = `
    import sys
    import io
    sys.stdout = io.StringIO()
  `

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public constructor(protected pyodide: any) {
    pyodide.runPython(this.setStdoutToOutput)
  }

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
        const output = this.pyodide.runPython(code) ?? ''
        // Prepend the value of stdout before returning
        const stdout = this.pyodide.runPython('sys.stdout.getvalue()')
        console.log(stdout + output)
        return stdout + output
      })
      resolve(output)
    })
  }
}
