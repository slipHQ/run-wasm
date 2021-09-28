import React, { useEffect, useState } from 'react'
import { createPHPClient } from 'run-wasm'
import Editor from '@monaco-editor/react'
import Navbar from '../components/Navbar'
import GithubButton from '../components/GithubButton'

function App() {
  const [inputCode, setInputCode] = useState(`<?php
function sum($a, $b) {
    return $a + $b;
} 

echo sum(100, 1);
echo "\\r";
echo sum(100, 100);`)
  const [output, setOutput] = useState<Array<string>>([])
  const [php, setPHP] = useState<any>(null)

  async function runCode(code: string) {
    let phpClient = createPHPClient(php)
    const output = await phpClient.run({ code })

    setOutput(output)
  }

  useEffect(() => {
    const PHP = require('php-wasm/PhpWeb').PhpWeb
    const php = new PHP()

    php.addEventListener('ready', () => {
      setPHP(php)
    })
  }, [])

  return (
    <>
      <Navbar current="PHP" />
      <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
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
                This page demonstrates running PHP code in the browser.
              </p>
              <GithubButton />
            </div>
          </main>

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700">
              Insert PHP Code Below
            </label>

            <div className="mt-1">
              <Editor
                height="20rem"
                defaultLanguage="php"
                defaultValue={inputCode}
                onChange={(value) => setInputCode(value ?? '')}
                className="block w-1/2 p-2 text-white bg-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                theme="vs-dark"
                options={{}}
              />
            </div>
          </div>

          {php && (
            <button
              className="px-4 py-1 my-4 text-white bg-black rounded "
              onClick={() => runCode(inputCode)}
            >
              Run Code
            </button>
          )}

          <div>
            <label className="block pt-8 text-sm font-medium text-gray-700">
              Output
            </label>

            <div className="mt-1">
              <Editor
                value={output?.join('\n') ?? ''}
                height="10rem"
                defaultLanguage="php"
                className="block w-1/2 p-2 text-white bg-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                theme="vs-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
