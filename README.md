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

   This will build the `run-wasm` package in the `lib` folder and allow you to import it in the `example-nextjs` project.

4. In the `example-nextjs` project, run `yarn`.

```
cd example-nextjs
yarn
```

5. Run `yarn dev`

   🎉 You should be able to see the component at `localhost:3000`

## All Contributors ✨

Thanks goes to these wonderful people.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.slip.so/"><img src="https://avatars.githubusercontent.com/u/22961671?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kennethcassel</b></sub></a><br /><a href="https://github.com/slipHQ/run-wasm/commits?author=kennethcassel" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nikolaystrikhar"><img src="https://avatars.githubusercontent.com/u/4025589?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nikolay Strikhar</b></sub></a><br /><a href="https://github.com/slipHQ/run-wasm/commits?author=nikolaystrikhar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mcintyre94"><img src="https://avatars.githubusercontent.com/u/1711350?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Callum McIntyre</b></sub></a><br /><a href="https://github.com/slipHQ/run-wasm/commits?author=mcintyre94" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bharat-patodi"><img src="https://avatars.githubusercontent.com/u/16771172?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bharat Patodi</b></sub></a><br /><a href="https://github.com/slipHQ/run-wasm/commits?author=bharat-patodi" title="Code">💻</a></td>
    <td align="center"><a href="https://codingknite.com/"><img src="https://avatars.githubusercontent.com/u/70036189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joel P. Mugalu</b></sub></a><br /><a href="https://github.com/slipHQ/run-wasm/commits?author=codingknite" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
