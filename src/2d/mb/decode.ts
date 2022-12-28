import { MortonCodeRangeError } from "../../util";

const magicBitsMask2DDecode = [
  0xffffffff, 0x0000ffff, 0x00ff00ff, 0x0f0f0f0f, 0x33333333, 0x55555555,
];

function morton2DGetSecondBits(coord: number) {
  const masks = magicBitsMask2DDecode;
  let x = coord & masks[5];
  x = (x ^ (x >> 1)) & masks[4];
  x = (x ^ (x >> 2)) & masks[3];
  x = (x ^ (x >> 4)) & masks[2];
  x = (x ^ (x >> 8)) & masks[1];
  return x;
}

/**
 *
 * @param morton a 2D morton code
 * @param out a 2-component output array - provide this to avoid an array allocation
 * @returns a 2D coordinate (as an array)
 */
export function morton2DDecode(
  morton: number,
  out?: [number, number]
): [number, number] {
  if (morton < 0 || morton > 4_294_967_295) {
    throw MortonCodeRangeError;
  }
  const result = out ?? (new Array(2) as [number, number]);
  result[0] = morton2DGetSecondBits(morton);
  result[1] = morton2DGetSecondBits(morton >> 1);
  return result;
}
