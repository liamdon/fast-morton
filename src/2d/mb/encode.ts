import { valuesAreUint15, CoordRange15Error } from "../../util";

const magicBitsMask2DEncode = [
  0xFFFFFFFF,
  0x0000FFFF,
  0x00FF00FF,
  0x0F0F0F0F,
  0x33333333,
  0x55555555
];

/**
 * 
 * @param coord single coord (x/y/z)
 * @returns component with bits shifted into place
 */
function morton2DSplitBy2bits(coord: number) {
  const masks = magicBitsMask2DEncode;
  let x = coord & masks[0];
  x = (x | x << 16) & masks[1];
  x = (x | x << 8) & masks[2];
  x = (x | x << 4) & masks[3];
  x = (x | x << 2) & masks[4];
  x = (x | x << 1) & masks[5];
  return x;
}

/**
 * 
 * @param x X coordinate (up to 15 bits: 0-32,767)
 * @param y Y coordinate (up to 15 bits: 0-32,767)
 * @returns 32-bit 2D Morton code
 */
export function morton2DEncode(x: number, y: number): number {
  if (!valuesAreUint15(x, y)) {
    throw CoordRange15Error;
  }
  return morton2DSplitBy2bits(x) | (morton2DSplitBy2bits(y) << 1);
}