<p align="center">
<a href="https://www.runwasm.com">
<img src="https://user-images.githubusercontent.com/22961671/135009624-47470419-7e17-47b5-99ed-0f15b8123dd0.png" width=600 />
  </a>
</p>

# run-wasm

[run-wasm](https://www.runwasm.com) is an easy to use tool for running WASM based code executions in the browser.

Brought to you by [Pointer](https://www.pointer.gg) and our amazing OSS contributors.

## Install

npm

```bash
npm i @run-wasm/run-wasm
```

yarn

```bash
yarn add @run-wasm/run-wasm
```

## Usage - Clarity

After installing run-wasm you'll need to import the run-wasm clarity package

Install run-wasm clarity package

```bash
npm i @run-wasm/clarity
```

yarn

```bash
yarn add @run-wasm/clarity
```

`@run-wasm/clarity` uses WASM to execute Clarity. You can use the `clarity_repl_bg.wasm` from the clarity-repl module.

[Next.js example](https://github.com/slipHQ/run-wasm/blob/main/example-nextjs/pages/clarity.tsx)

```jsx
import React from 'react'
import { createClarityClient } from '@run-wasm/clarity'
import Script from 'next/script'
import CodeRunnerUI from '../components/CodeRunnerUI'
import { GetServerSidePropsContext } from 'next'

// REPL-only code to mint STX to the tx-sender address
const initCode = '::mint_stx ST000000000000000000002AMW42H 1000000'

// Initial code demos an STX transfer to some address
const initialCode = `(define-constant someone 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE)

;; this address has starting balance of 0
(print (stx-get-balance someone))

;; transfer it some STX
(stx-transfer? u1000 tx-sender someone)

;; check new balance
(stx-get-balance someone)`

// Copied clarity_repl_bg.wasm from clarity-repl module
const url = `https://example.com/clarity_repl_bg.wasm`

type Props = {
  urlPrefix: string,
}

function ClarityPage({ urlPrefix }: Props) {
  const clarityClient = createClarityClient(new URL(url), initCode)

  async function runCode(code: string) {
    // Reset the client each run
    await clarityClient.initialise()
    const output = await clarityClient.run(code)
    return output
  }

  return (
    <>
      <Script src="https://kit.fontawesome.com/137d63e13e.js" />
      <CodeRunnerUI
        initialCode={initialCode}
        languageLabel="Clarity"
        defaultLanguage="clarity"
        onRunCode={runCode}
        isLoading={!clarityClient}
      ></CodeRunnerUI>
    </>
  )
}

export default ClarityPage
```

## Goal of the project

The goal of this project is to build an easy way to execute various programming languages in the browser via WebAssembly.

People should be able to use this project to embed executable code snippets on their websites easily!

We're building this as a new component to be used inside [Pointer](https://www.pointer.gg) tutorials.
