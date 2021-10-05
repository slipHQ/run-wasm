import React, { useEffect, useState, useRef } from 'react'
import { createTSClient } from '@run-wasm/ts'
import Script, { initScriptLoader } from 'next/script'
import CodeRunnerUI from '../components/CodeRunnerUI'

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
    return output
  }

  return (
    <>
      <Script strategy="beforeInteractive" src={tsScript} />
      <Script src="https://kit.fontawesome.com/137d63e13e.js" />
      <CodeRunnerUI
        initialCode={initialCode}
        languageLabel="TypeScript"
        defaultLanguage="typescript"
        onRunCode={runCode}
        isLoading={!tsClient}
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
      </CodeRunnerUI>
    </>
  )
}

export default App
