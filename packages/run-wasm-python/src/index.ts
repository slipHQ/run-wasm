/* eslint-disable @typescript-eslint/no-explicit-any */

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

const createPythonClient = (pyodide: string): PythonClient => {
  return new PythonClient(pyodide)
}

export { createPythonClient }
