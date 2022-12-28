import { MortonCodeRangeError } from "../../util";
import { morton2DDecodeX256, morton2DDecodeY256 } from "./luts";

const BYTES = 4;
const EIGHTBITMASK = 0x000000ff;

function morton2DDecodeCoordLUT256(morton: number, LUT: number[]) {
  let a = 0;
  for (let i = 0; i < BYTES; ++i) {
    a |= LUT[(morton >> (i * 8)) & EIGHTBITMASK] << (4 * i);
  }
  return a;
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
  result[0] = morton2DDecodeCoordLUT256(morton, morton2DDecodeX256);
  result[1] = morton2DDecodeCoordLUT256(morton, morton2DDecodeY256);
  return result;
}
