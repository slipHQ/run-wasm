import React from 'react'

const RunWasm = ({
  language,
  code,
}: {
  language: string
  code: string
}): JSX.Element => (
  <div>
    Run {language} and execute {code}
  </div>
)

export default RunWasm
