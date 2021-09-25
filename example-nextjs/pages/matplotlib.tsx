import React, { useEffect, useState } from 'react'
import { createPythonClient, RunWasm } from 'run-wasm'
import Editor from '@monaco-editor/react'
import Script from 'next/script'
import Navbar from '../components/navbar'

declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    loadPyodide: Function
  }
}

function App() {
  const [
    inputCode,
    setInputCode,
  ] = useState(`# Note that matplotlib.pyplot as plt is pre-imported
import numpy as np

plt.clf() # Clear existing plot
plt.plot([0, 1], [0, 1], label="Line")
nx = 101
x = np.linspace(0.0, 1.0, nx)
y = 0.3*np.sin(x*8) + 0.4
plt.plot(x, y, label="Curve")
plt.legend()
plt.show()`)

  const [loadingText, setLoadingText] = useState('Loading pyodide...')
  const [pyodide, setPyodide] = useState(null)

  // Python code that is preloaded before the user's code is run
  // <- [reference](https://stackoverflow.com/a/59571016/1375972)
  const preloadMatplotlibCode = `
import matplotlib.pyplot as plt
from js import document

f = plt.figure()

def get_render_element(self):
    return document.getElementById('plot')

f.canvas.create_root_element = get_render_element.__get__(
    get_render_element, f.canvas.__class__
)`

  async function preloadMatplotlib(pyodide) {
    await pyodide.loadPackage('matplotlib')
    pyodide.runPython(preloadMatplotlibCode)
    return pyodide
  }

  async function runCode(code: string, pyodide: any) {
    console.log('running code', code)
    let pythonClient = createPythonClient(pyodide)
    console.log(pythonClient)
    await pythonClient.run({ code })
  }

  // Note that window.loadPyodide comes from the beforeInteractive pyodide.js Script
  useEffect(() => {
    window
      .loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
      })
      .then((pyodide) => {
        setLoadingText('Loading matplotlib...')
        return preloadMatplotlib(pyodide)
      })
      .then((pyodide) => setPyodide(pyodide))
  }, [])

  return (
    <>
      <Navbar current="Matplotlib" />
      <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Script
            src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
            strategy="beforeInteractive"
          />
          <Script src="https://kit.fontawesome.com/137d63e13e.js" />
          <main className="mx-auto my-16 max-w-7xl sm:mt-24">
            <div className="text-left">
              <h1 className="text-3xl tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
                <span className="block font-mono xl:inline">
                  Embed executable code snippets on your site
                </span>
              </h1>
              <p className="max-w-md mx-auto mt-4 text-base text-gray-500 sm:text-lg md:mt-16 md:text-xl md:max-w-3xl">
                <b>run-wasm</b> is an api which allows you to easily execute
                code via WebAssembly based programming languages. <br />
                <br /> It allows you to include interactive code examples in
                your website. <br />
                <br />
                This page demonstrates rendering matplotlib charts in the
                browser.
              </p>
              <div className="max-w-md mt-5 sm:flex sm:justify-left md:mt-8">
                <div className="">
                  <a
                    href="https://github.com/slipHQ/run-wasm"
                    className="flex items-center justify-center w-full px-6 py-2 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 md:py-2 md:text-md md:px-6"
                  >
                    <svg
                      width="1024"
                      height="1024"
                      className="w-6 h-6 mr-4"
                      viewBox="0 0 1024 1024"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                        transform="scale(64)"
                        fill="#ffffff"
                      />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </main>

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700">
              Insert Python Code Below
            </label>

            <div className="mt-1 px-2">
              <Editor
                height="20rem"
                defaultLanguage="python"
                defaultValue={inputCode}
                onChange={(value) => setInputCode(value ?? '')}
                className="block w-1/2 p-2 text-white bg-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                theme="vs-dark"
                options={{}}
              />
            </div>
          </div>

          {!pyodide && (
            <label className="block pt-8 text-sm font-medium text-gray-700">
              {loadingText}
            </label>
          )}

          {pyodide && (
            <button
              className="px-4 py-1 my-4 text-white bg-black rounded "
              onClick={() => runCode(inputCode, pyodide)}
            >
              Run Code
            </button>
          )}

          <div id="plot" />
        </div>
      </div>
    </>
  )
}

export default App
