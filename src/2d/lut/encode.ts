import { CoordRange15Error, valuesAreUint15 } from "../../util";
import { morton2DEncodeX256, morton2DEncodeY256 } from "./luts";

const EIGHTBITMASK = 0x000000ff;

/**
 *
 * @param x X coordinate (up to 15 bits: 0-32,767)
 * @param y Y coordinate (up to 15 bits: 0-32,767)
 * @returns 32-bit Morton code
 */
export function morton2DEncode(x: number, y: number): number {
  if (!valuesAreUint15(x, y)) {
    throw CoordRange15Error;
  }
  let answer = 0;
  for (let i = 16; i > 0; --i) {
    const shift = (i - 1) * 8;
    answer =
      (answer << 16) |
      morton2DEncodeY256[(y >> shift) & EIGHTBITMASK] |
      morton2DEncodeX256[(x >> shift) & EIGHTBITMASK];
  }
  return answer;
}
