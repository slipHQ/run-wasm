# run-wasm

A simple way to run WASM based code executions in the browser.

https://user-images.githubusercontent.com/22961671/134069014-7f9beba4-8e10-431a-92a3-6cc0bf35d811.mov

## Goal of the project

The goal of this project is to build an easy way to execute various programming languages in React via WebAssembly.

People should be able to use this project to embed executable code snippets on their websites easily!

We're building this as a new component to be used inside the [Slip](https://www.slip.so) authoring tool.

## Development Workflow

1. Clone the run-WASM repository and `cd` into it

```
git clone git@github.com:slipHQ/run-wasm.git
cd run-wasm
```

2. Run `yarn` in the root directory.

   This will install all the dependencies defined in the package.json file

3. Run `yarn build` in the root directory.

   This will build the `run-wasm` package in the `lib` folder and allow you to import it in the `example` project.

4. In the `example` project, run `yarn`.

```
cd example
yarn
```

5. Run `yarn start`

   🎉 You should be able to see the component at `localhost:3000`
