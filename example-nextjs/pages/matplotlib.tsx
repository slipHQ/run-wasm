import React, { useEffect, useState, useRef } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import { createPythonClient } from '@run-wasm/python'
import Script from 'next/script'
import CodeRunnerUI from '../components/CodeRunnerUI'

declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    loadPyodide: Function
  }
}

const initialCode = `# Note that matplotlib.pyplot as plt is pre-imported
import numpy as np

plt.clf() # Clear existing plot
plt.plot([0, 1], [0, 1], label="Line")
nx = 101
x = np.linspace(0.0, 1.0, nx)
y = 0.3*np.sin(x*8) + 0.4
plt.plot(x, y, label="Curve")
plt.legend()
plt.show()`

const plotElementId = 'plot'
// Python code that is preloaded before the user's code is run
// <- [reference](https://stackoverflow.com/a/59571016/1375972)
const preloadMatplotlibCode = `
import matplotlib.pyplot as plt
from js import document

f = plt.figure()

def get_render_element(self):
    return document.getElementById('${plotElementId}')

f.canvas.create_root_element = get_render_element.__get__(
    get_render_element, f.canvas.__class__
)`

function App() {
  const [pyodide, setPyodide] = useState(null)

  async function preloadMatplotlib(pyodide) {
    await pyodide.loadPackage('matplotlib')
    pyodide.runPython(preloadMatplotlibCode)
    return pyodide
  }

  async function runCode(code: string) {
    console.log('running code', code)
    let pythonClient = createPythonClient(pyodide)
    console.log(pythonClient)
    await pythonClient.run({ code })
  }

  // Note that window.loadPyodide comes from the beforeInteractive pyodide.js Script
  useEffect(() => {
    if (pyodide) {
      return
    }
    window
      .loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
      })
      .then((pyodide) => {
        console.log('Loading matplotlib')
        return preloadMatplotlib(pyodide)
      })
      .then((pyodide) => setPyodide(pyodide))
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <Script src="https://kit.fontawesome.com/137d63e13e.js" />
      <CodeRunnerUI
        initialCode={initialCode}
        onRunCode={runCode}
        languageLabel="Matplotlib"
        hideOutputEditor
        isLoading={!pyodide}
        defaultLanguage="python"
      />
      <div id={plotElementId} />
    </>
  )
}

export default App
