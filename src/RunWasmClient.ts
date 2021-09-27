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

  public async run({ code }: { code: string }): Promise<string> {
    await this.loadPackages(code)
    const output: string = this.pyodide.runPython(code) ?? ''
    // Prepend the value of stdout before returning
    const stdout: string = this.pyodide.runPython('sys.stdout.getvalue()')
    console.log(stdout + output)
    return stdout + output
  }

  private loadPackages(code: string): Promise<any> {
    if (typeof this.pyodide.loadPackagesFromImports === 'function') {
      console.log('Loading Python dependencies from code')
      return this.pyodide.loadPackagesFromImports(code)
    }
    return this.pyodide.loadPackage([])
  }
}

declare global {
  interface Console {
    oldLog: (message?: any, ...optionalParams: any[]) => void
  }
}

export class TSClient {
  // We store the logs here so that we can return them later from the run() method
  public logs: any = []

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public constructor(protected ts: any) {
    // Overriding the console.log method so that we can store the logs
    console.oldLog = console.log
    console.log = (value) => {
      // For some reason, the first 'incoming' log is always an instance of TSClient. Ignoring it
      if (!(value instanceof TSClient)) {
        this.logs.push(value)
      }
    }
  }

  public async run({ code }: { code: string }): Promise<any[]> {
    // TODO: Type checking. We are using the transpile method which only does basic syntax checking.
    // eslint-disable-next-line no-eval
    eval((await this.ts.transpile(code)) as string)
    return this.logs
  }
}
