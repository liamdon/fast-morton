import { MortonCodeRangeError } from "../../util";

const magicBitsMask3DDecode = [
  0, 0x000003ff, 0x30000ff, 0x0300f00f, 0x30c30c3, 0x9249249,
];

function morton3DGetThirdBits(coord: number) {
  const masks = magicBitsMask3DDecode;
  let x = coord & masks[5];
  x = (x ^ (x >> 2)) & masks[4];
  x = (x ^ (x >> 4)) & masks[3];
  x = (x ^ (x >> 8)) & masks[2];
  x = (x ^ (x >> 16)) & masks[1];
  return x;
}

/**
 *
 * @param morton a 3D morton code
 * @param out a 3-component output array - provide this to avoid an array allocation
 * @returns a 3D coordinate (as an array)
 */
export function morton3DDecode(
  morton: number,
  out?: [number, number, number]
): [number, number, number] {
  if (morton < 0 || morton > 4_294_967_295) {
    throw MortonCodeRangeError;
  }
  const result = out ?? (new Array(3) as [number, number, number]);
  result[0] = morton3DGetThirdBits(morton);
  result[1] = morton3DGetThirdBits(morton >> 1);
  result[2] = morton3DGetThirdBits(morton >> 2);
  return result;
}
