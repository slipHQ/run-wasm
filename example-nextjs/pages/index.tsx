import React, { useEffect, useState, useRef } from 'react'
import { createPythonClient } from '@run-wasm/python'
import Script from 'next/script'
import CodeRunnerUI from '../components/CodeRunnerUI'

declare global {
  // <- [reference](https://stackoverflow.com/a/56458070/11542903)
  interface Window {
    pyodide: any
    languagePluginLoader: any
    loadPyodide: Function
  }
}

const initialCode = `# Implementation of the Sieve of Eratosthenes
# https://stackoverflow.com/questions/3939660/sieve-of-eratosthenes-finding-primes-python

# Finds all prime numbers up to n
def eratosthenes(n):
    multiples = []
    for i in range(2, n+1):
        if i not in multiples:
            print (i)
            for j in range(i*i, n+1, i):
                multiples.append(j)

eratosthenes(100)`

function App() {
  const [pyodide, setPyodide] = useState(null)

  async function runCode(code: string) {
    let pythonClient = createPythonClient(pyodide)
    return await pythonClient.run({ code })
  }

  // Note that window.loadPyodide comes from the beforeInteractive pyodide.js Script
  useEffect(() => {
    window
      .loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
      })
      .then((pyodide) => {
        setPyodide(pyodide)
      })
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <CodeRunnerUI
        initialCode={initialCode}
        onRunCode={runCode}
        languageLabel="Python"
        isLoading={!pyodide}
        defaultLanguage="python"
      />
    </>
  )
}

export default App
