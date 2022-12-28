
# **fast-morton** 

Fast morton encoding/decoding for 2D and 3D coordinates

![Build](https://github.com/liamdon/fast-morton/workflows/Build%20&%20test/badge.svg)

## About

* Port of a subset of [libmorton](https://github.com/Forceflow/libmorton) to Typescript
* Supports 2D coordinates with 15-bit components (0 - 32,767)
* Supports 3D coordinates with 10-bit components (0 - 1,023)
* Two methods are provided:
  * Magic Bits (additional discussion [here](https://stackoverflow.com/questions/18529057/produce-interleaving-bit-patterns-morton-keys-for-32-bit-64-bit-and-128bit))
  * LUT (Shifted Lookup Table)

Both are described in [this blog post](https://www.forceflow.be/2013/10/07/morton-encodingdecoding-through-bit-interleaving-implementations/).

The Lookup Table method is [a little faster](https://www.forceflow.be/2013/10/07/morton-encodingdecoding-through-bit-interleaving-implementations/), at the cost of some additional code size and runtime memory (a few KB) for the tables.

These methods are exported separately (see below) so that your bundler can strip out the LUTs if you decide not to use them.

## Installation

```sh
npm install --save fast-morton
```

## Import

Top-level:
```typescript
import {
  morton2DEncodeMB,
  morton2DDecodeMB,
  morton2DEncodeLUT,
  morton2DDecodeLUT,
  morton3DEncodeMB,
  morton3DDecodeMB,
  morton3DEncodeLUT,
  morton3DDecodeLUT
} from "fast-morton";
```

Deep import:
```typescript

// 2D using magic bits
import {
  morton2DEncode,
  morton2DDecode
} from "fast-morton/2d/mb";

// 2D using LUT
import {
  morton2DEncode,
  morton2DDecode
} from "fast-morton/2d/lut";

// 3D using magic bits
import {
  morton2DEncode,
  morton2DDecode
} from "fast-morton/3d/mb";

// 3D using LUT
import {
  morton2DEncode,
  morton2DDecode
} from "fast-morton/3d/lut";
```

## Usage

2D:
```typescript
import {
  morton2DEncode,
  morton2DDecode
} from "fast-morton/2d/lut";

const mortonCode = morton2DEncode(1, 2); // 9
const coords = morton2Decode(mortonCode); // [1, 2]
```

3D:
```typescript
import {
  morton3DEncode,
  morton3DDecode
} from "fast-morton/3d/lut";

const mortonCode = morton3DEncode(1, 2, 3); // 53
const coords = morton3Decode(mortonCode); // [1, 2, 3]
```

## TODO

* Benchmarks comparing Magic Bits, LUT and a naive method
* Support a broader range of coordinate values with the Morton Code output being either 2<sup>53</sup>-1 or BigInt (currently max output is 2<sup>32</sup>-1)


## Development/Contributing

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
