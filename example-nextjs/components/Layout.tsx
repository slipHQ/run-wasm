import Head from 'next/head'
import React from 'react'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>run-wasm</title>
        <meta
          name="description"
          content="run-wasm is an easy to use tool for running WASM based code executions in the browser."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Footer />
    </>
  )
}
