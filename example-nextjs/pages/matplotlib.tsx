import React, { useEffect, useState } from 'react'
import { createPythonClient, RunWasm } from 'run-wasm'
import Editor from '@monaco-editor/react'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import GithubButton from '../components/GithubButton'

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
              <p className="max-w-md mt-4 text-base text-gray-500 md:mx-auto sm:text-lg md:mt-16 md:text-xl md:max-w-3xl">
                <b>run-wasm</b> is an api which allows you to easily execute
                code via WebAssembly based programming languages. <br />
                <br /> It allows you to include interactive code examples in
                your website. <br />
                <br />
                This page demonstrates rendering matplotlib charts in the
                browser.
              </p>
              <GithubButton />
            </div>
          </main>

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700">
              Insert Python Code Below
            </label>

            <div className="mt-1">
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
              className="px-4 py-2 my-4 text-white transition-colors bg-black border border-transparent rounded hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none"
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
