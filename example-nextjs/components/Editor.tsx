import * as React from 'react'
import MonacoEditor, { Monaco } from '@monaco-editor/react'
import { addKeyBinding, CustomKeyBinding } from '../utils'

interface Props {
  initialCode: string
  output: string
  languageLabel: string
  hideOutputEditor?: boolean
  isLoading?: boolean
  defaultLanguage?: string
  onRunCode(inputCode: string): Promise<string | void>
  children?: React.ReactNode
}

export default function Editor(props: Props) {
  const {
    initialCode,
    output,
    languageLabel,
    hideOutputEditor,
    isLoading = false,
    defaultLanguage,
    onRunCode,
    children,
  } = props

  const inputCodeRef = React.useRef(initialCode)
  const editorRef = React.useRef(null)

  const [monaco, setMonaco] = React.useState<Monaco>(null)

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
      callback: () => onRunCode(inputCodeRef.current),
      editor: editorRef.current,
    }
    return addKeyBinding(runCodeBinding)
  }, [monaco, isLoading])

  return (
    <>
      <div>
        <div>
          <label className="block pb-4 text-sm font-medium text-gray-700 dark:text-gray-450">
            {languageLabel}
          </label>

          <div className="mt-1 ">
            <div className="relative group">
              <div className="absolute -inset-0.5 dark:bg-gradient-to-r from-indigo-300 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <MonacoEditor
                height="20rem"
                defaultLanguage={defaultLanguage}
                defaultValue={inputCodeRef.current}
                onChange={(value) => {
                  inputCodeRef.current = value
                }}
                className="block w-1/2  text-white bg-gray-900 border-gray-300 rounded-lg   shadow-sm p-0.5 border   dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                theme="vs-dark"
                options={{ fontSize: 12, minimap: { enabled: false } }}
                onMount={handleEditorDidMount}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 ">
        <div className="grid items-start justify-left">
          <div className="relative group">
            <button
              className="relative flex items-center py-4 leading-none bg-black divide-x divide-gray-600 rounded-lg px-7 border-gray-300 disabled:bg-gray-700 disabled:cursor-not-allowed"
              onClick={() => onRunCode(inputCodeRef.current)}
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
            <MonacoEditor
              value={output?.toString()}
              height="20rem"
              defaultLanguage="python"
              className="block w-1/2 text-white bg-gray-900 border-gray-300 rounded-lg shadow-sm p-0.5 border dark:border-purple-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              theme="vs-dark"
              options={{
                readOnly: true,
                fontSize: 12,
                minimap: { enabled: false },
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
