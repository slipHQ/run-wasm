This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Follow these steps below to get `run-wasm` working locally:

1. Clone the run-wasm repository and `cd` into it

```shell
# Using HTTPS
git clone https://github.com/slipHQ/run-wasm.git
# Or using SSH
git clone git@github.com:slipHQ/run-wasm.git
cd run-wasm
```

2. Run `yarn` in the root directory.

   This will install all the dependencies defined in the `package.json` file

3. Run `yarn build` in the root directory.

   This will build the `run-wasm` package in the `lib` folder and allow you to import it in the `example-nextjs` project.

4. In the `example-nextjs` project, run `yarn`.

```shell
cd example-nextjs
yarn
```

5. Run `yarn dev` or `npm run dev`

   🎉 You should be able to see the component at [http://localhost:3000](http://localhost:300')

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
