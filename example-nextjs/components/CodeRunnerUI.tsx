import * as React from 'react'
import Script from 'next/script'
import GithubButton from './GithubButton'
import Navbar from './Navbar'
import { Editor } from '@run-wasm/run-wasm'

interface Props {
  defaultLanguage?: string
  initialCode: string
  onRunCode(inputCode: string): Promise<string | void>
  languageLabel: string
  isLoading?: boolean
  children?: React.ReactNode
  hideOutputEditor?: boolean
}

export default function CodeRunnerUI(props: Props) {
  const {
    initialCode,
    languageLabel,
    hideOutputEditor,
    isLoading = false,
    defaultLanguage,
    children,
    onRunCode,
  } = props

  const [output, setOutput] = React.useState('')

  async function runCode(code: string) {
    const output = await onRunCode(code)
    if (output) {
      setOutput(output)
    }
  }

  return (
    <>
      <Navbar current={languageLabel} />
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Script
            src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
            strategy="beforeInteractive"
          />
          <main className="mx-auto mb-12 max-w-7xl sm:mt-12">
            <div className="text-left">
              <h1 className="text-3xl tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-5xl">
                <span className="block font-mono xl:inline">
                  Embed executable code snippets on your site
                </span>
              </h1>
              <p className="max-w-md mt-4 text-base text-gray-500 dark:text-gray-450 md:mx-auto sm:text-lg md:mt-16 md:text-xl md:max-w-3xl">
                <b>run-wasm</b> is an api which allows you to easily execute
                code via WebAssembly based programming languages. <br />
                <br /> It allows you to include interactive code examples in
                your website.
              </p>
              <GithubButton />
            </div>
          </main>
        </div>
        <Editor
          initialCode={initialCode}
          output={output}
          languageLabel={languageLabel}
          hideOutputEditor={hideOutputEditor}
          isLoading={isLoading}
          defaultLanguage={defaultLanguage}
          onRunCode={runCode}
        >
          {children}
        </Editor>
      </div>
    </>
  )
}
