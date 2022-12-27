![Build](https://github.com/liamdon/fast-morton/workflows/Build%20&%20test/badge.svg)

**fast-morton**: Fast morton encoding and decoding for 2D and 3D coordinates

## About

* Supports 2D coordinates with 16-bit components (0 - 65,535) and 3D coordinates with 10-bit components (0 - 1,023)


## Installation

```sh
npm install --save fast-morton
```

## Development

### Requirements

- Node 18 (to run this repository, due to `node:test` usage)

### Setup

1. Clone the repository
2. Run `npm install` installs all required dependencies.
3. Run `npm run build` to build from TypeScript to common JavaScript distribution formats.
4. Run `npm test` to run all tests.

### npm scripts

- `npm run test` run tests against **built output** with Node.js' native `node:test` module. **Important**: runs against build output so run `npm run build` beforehand.
- `npm run build` run build from TypeScript to UMD, CJS, ESM with [microbundle](https://github.com/developit/microbundle)
- `npm run watch` runs build in watch mode with [microbundle](https://github.com/developit/microbundle)
- `npm run lint` will ensure all of the files are prettier-formatted
- `npm run format` will run prettier formatting option on all the examples files (and tests).
- `npm run release`, run clean, production build and release with `np`.


## Acknowledgments

* This package is a Typescript port of a subset of libmorton by Jeroen Baert.
* Build/test uses the [microbundle-ts-pkg](https://github.com/HugoDF/microbundle-ts-pkg) starter by [HugoDF](https://github.com/HugoDF)

# LICENSE

Code is licensed under the [MIT License](./LICENSE).

