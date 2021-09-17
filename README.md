# run-wasm

Run WASM based code executions in the browser easily

## Goal of the project

The goal of this project is to build an easy way to execute various programming languages in React via WebAssembly.

People should be able to use this project to embed executable code snippets on their websites easily!

We're building this as new component to be used inside the [Slip](https://www.slip.so) authoring tool.

## Development

After cloning to your local machine, you can run a few steps to work on this project.

Run `yarn` in the root directory.

Run `yarn build` in the root directory. This will build the `run-wasm` package in the `lib` folder and allow you to import it in the `example` project.

In the `example` project, run `yarn`

Run `yarn start`. You should see the component being at `localhost:3000`
