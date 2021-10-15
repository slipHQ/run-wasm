import * as React from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import Script from 'next/script'
import GithubButton from './GithubButton'
import Navbar from './Navbar'
import { addKeyBinding, CustomKeyBinding } from '../utils'

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
  const inputCodeRef = React.useRef(initialCode)
  const [output, setOutput] = React.useState('')
  const editorRef = React.useRef(null)
  const [monaco, setMonaco] = React.useState<Monaco>(null)

  async function runCode(code: string) {
    const output = await onRunCode(code)
    if (output) {
      setOutput(output)
    }
  }

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor
    setMonaco(monaco)
  }

  React.useEffect(() => {
    if (!monaco || isLoading) {
      return
    }
    const runCodeBinding: CustomKeyBinding = {
      label: 'run',
      keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      callback: () => runCode(inputCodeRef.current),
      editor: editorRef.current,
    }
    return addKeyBinding(runCodeBinding)
  }, [monaco, isLoading])

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

          <div>
            <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-450">
              {languageLabel}
            </label>

            <div className="mt-1 ">
              <div className="relative group">
                <div className="absolute -inset-0.5 dark:bg-gradient-to-r from-indigo-300 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                <Editor
                  height="20rem"
                  defaultLanguage={defaultLanguage}
                  defaultValue={inputCodeRef.current}
                  onChange={(value) => {
                    inputCodeRef.current = value
                  }}
                  className="block w-1/2  text-white bg-gray-900 border-gray-300 rounded-lg   shadow-sm p-0.5 border   dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  theme="vs-dark"
                  options={{ fontSize: 12 }}
                  onMount={handleEditorDidMount}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 ">
            <div className="grid items-start justify-left">
              <div className="relative group">
                <button
                  className="relative flex items-center py-4 leading-none bg-black divide-x divide-gray-600 rounded-lg px-7 border-gray-300 disabled:bg-gray-700 disabled:cursor-not-allowed"
                  onClick={() => runCode(inputCodeRef.current)}
                  disabled={isLoading}
                >
                  <span className="text-gray-100 transition duration-200 group-hover:text-gray-100">
                    {!isLoading ? 'Run Code →' : `Loading ${languageLabel}...`}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {children}

          {!hideOutputEditor && (
            <div>
              <label className="block pt-8 text-sm font-medium text-gray-700 dark:text-gray-450">
                Output
              </label>

              <div className="mt-1 dark:text-gray-450">
                <Editor
                  value={output?.toString()}
                  height="20rem"
                  defaultLanguage="python"
                  className="block w-1/2  text-white bg-gray-900 border-gray-300 rounded-lg   shadow-sm p-0.5 border   dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  theme="vs-dark"
                  options={{ readOnly: true }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
