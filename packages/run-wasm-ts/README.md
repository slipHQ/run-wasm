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

## Usage - Typescript

After installing run-wasm you'll need to import the run-wasm Typescript package

Install run-wasm Typescript package

```bash
npm i @run-wasm/ts
```

yarn

```bash
yarn add @run-wasm/ts
```

[Next.js example](https://github.com/slipHQ/run-wasm/blob/main/example-nextjs/pages/ts.tsx)

```jsx
import React, { useEffect, useState, useRef } from 'react'
import { createTSClient } from '@run-wasm/ts'
import { Editor } from '@run-wasm/run-wasm
import Script, { initScriptLoader } from 'next/script'

declare global {
  interface Window {
    ts: any
  }
}

const tsScript = 'https://unpkg.com/typescript@latest/lib/typescriptServices.js'
const initialCode = `// TypeScript code goes here
let a: number;
let b: number;
a = 12;
b = 3;
console.log(a + b);`

function App() {
  const [errors, setErrors] = useState<Array<string>>([])
  const [tsClient, setTsClient] = useState<any>(null)
  const [output, setOutput] = React.useState('')

  function initialiseTsClient() {
    const tsClient = createTSClient(window.ts)
    tsClient.fetchLibs(['es5', 'dom']).then(() => {
      setTsClient(tsClient)
    })
  }

  useEffect(() => {
    // handle client side navigation whenever that comes
    if (typeof window.ts === 'undefined') {
      initScriptLoader([
        {
          src: tsScript,
          onLoad: initialiseTsClient,
        },
      ])
    } else {
      initialiseTsClient()
    }
  }, [])

  async function runCode(code: string) {
    const { errors, output } = await tsClient.run({ code })
    setErrors(errors)
    if (output) {
      setOutput(output)
    }
  }

  return (
    <>
      <Script strategy="beforeInteractive" src={tsScript} />
      <Script src="https://kit.fontawesome.com/137d63e13e.js" />
      <Editor
          initialCode={initialCode}
          output={output}
          languageLabel="TypeScript"
          hideOutputEditor={hideOutputEditor}
          isLoading={isLoading}
          defaultLanguage="typescript"
          onRunCode={runCode}
        >
        {errors.length > 0 && (
          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700 dark:text-gray-450">
              Errors
            </label>
            {errors.map((error, index) => (
              <div key={index} className="mt-1">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            ))}
          </div>
        )}
      </Editor>
    </>
  )
}

export default App
```

## Goal of the project

The goal of this project is to build an easy way to execute various programming languages in the browser via WebAssembly.

People should be able to use this project to embed executable code snippets on their websites easily!

We're building this as a new component to be used inside the [Slip](https://www.slip.so) authoring tool.
