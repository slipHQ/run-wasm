<p align="center">
<a href="https://www.runwasm.com">
<img src="https://user-images.githubusercontent.com/22961671/135009624-47470419-7e17-47b5-99ed-0f15b8123dd0.png" width=600 />
  </a>
</p>

# run-wasm

[run-wasm](https://www.runwasm.com) is an easy to use tool for running WASM based code executions in the browser.

Brought to you by [Slip](https://www.slip.so) and our amazing OSS contributors.

## Install

npm

```bash
npm i @run-wasm/run-wasm
```

yarn

```bash
yarn add @run-wasm/run-wasm
```

## Usage - Python

After installing run-wasm you'll need to import the run-wasm python package

Install run-wasm python package

```bash
npm i @run-wasm/python
```

yarn

```bash
yarn add @run-wasm/python
```

`@run-wasm/python` uses Pyodide to execute Python. We recommend using the latest version of Pyodide and bringing it into your project via a script.

[Next.js example](https://github.com/slipHQ/run-wasm/blob/main/example-nextjs/pages/index.tsx)

```jsx
import React, { useEffect, useState, useRef } from 'react'
import { createPythonClient } from '@run-wasm/python'
import { Editor } from '@run-wasm/run-wasm'
import Script from 'next/script'

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
  const [output, setOutput] = React.useState('')

  async function runCode(code: string) {
    let pythonClient = createPythonClient(pyodide)
    const output = await pythonClient.run({ code })
    if (output) {
      setOutput(output)
    }
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
      <Editor
        initialCode={initialCode}
        output={output}
        languageLabel="Python"
        hideOutputEditor={hideOutputEditor}
        isLoading={isLoading}
        defaultLanguage="python"
        onRunCode={runCode}
      />
      />
    </>
  )
}

export default App
```

## Goal of the project

The goal of this project is to build an easy way to execute various programming languages in the browser via WebAssembly.

People should be able to use this project to embed executable code snippets on their websites easily!

We're building this as a new component to be used inside the [Slip](https://www.slip.so) authoring tool.
