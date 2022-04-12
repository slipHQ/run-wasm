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

type Props = {
  urlPrefix: string
}

function ClarityPage({ urlPrefix }: Props) {
  // Copied clarity_repl_bg.wasm from clarity-repl module to public/ directory
  const url = `${urlPrefix}/clarity_repl_bg.wasm`
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

export function getServerSideProps({ req }: GetServerSidePropsContext) {
  // x-forwarded-proto should be https when deployed
  const protocol =
    req.headers['x-forwarded-proto'] ||
    req.headers.referer?.split('://')[0] ||
    'http'
  const host = req.headers.host

  return {
    props: {
      urlPrefix: `${protocol}://${host}`,
    },
  }
}
