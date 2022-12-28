import { CoordRange10Error, valuesAreUint10 } from "../../util";
import {
  morton3DEncodeX256,
  morton3DEncodeY256,
  morton3DEncodeZ256,
} from "./luts";

const EIGHTBITMASK = 0x000000ff;

/**
 *
 * @param x X coordinate (up to 10 bits: 0-1023)
 * @param y Y coordinate (up to 10 bits: 0-1023)
 * @param z Z coordinate (up to 10 bits: 0-1023)
 * @returns 32-bit Morton code
 */
export function morton3DEncode(x: number, y: number, z: number): number {
  if (!valuesAreUint10(x, y, z)) {
    throw CoordRange10Error;
  }
  let answer = 0;
  for (let i = 10; i > 0; --i) {
    const shift = (i - 1) * 8;
    answer =
      (answer << 24) |
      (morton3DEncodeZ256[(z >> shift) & EIGHTBITMASK] |
        morton3DEncodeY256[(y >> shift) & EIGHTBITMASK] |
        morton3DEncodeX256[(x >> shift) & EIGHTBITMASK]);
  }
  return answer;
}
