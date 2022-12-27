import { valuesAreUint10, CoordRange10Error } from "../../util";

const magicBitsMask3DEncode = [
  0x000003ff,
  0,
  0x30000ff,
  0x0300f00f,
  0x30c30c3, 
  0x9249249
];

/**
 * 
 * @param coord single coord (x/y/z)
 * @returns component with bits shifted into place
 */
function morton3DSplitBy3bits(coord: number) {
  const masks = magicBitsMask3DEncode;
  let x = coord & masks[0];
  x = (x | x << 16) & masks[2];
  x = (x | x << 8)  & masks[3];
  x = (x | x << 4)  & masks[4];
  x = (x | x << 2)  & masks[5];
  return x;
}

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
  return morton3DSplitBy3bits(x) | (morton3DSplitBy3bits(y) << 1) | (morton3DSplitBy3bits(z) << 2);
}