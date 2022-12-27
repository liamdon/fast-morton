import { MortonCodeRangeError } from "../../util";
import { morton3DDecodeX512, morton3DDecodeY512, morton3DDecodeZ512 } from "./luts";

const BYTES = 4;
const NINEBITMASK = 0x000001FF;

function morton3DDecodeCoordLUT256(morton: number, LUT: number[]) {
  let a = 0;
  for (let i = 0; i < BYTES; ++i) {
    a |= (LUT[(morton >> ((i * 9))) & NINEBITMASK] << 3 * i);
  }
  return a;
}

/**
 * 
 * @param morton a 3D morton code
 * @param out a 3-component output array - provide this to avoid an array allocation
 * @returns a 3D coordinate (as an array)
 */
export function morton3DDecode(morton: number, out?: [number, number, number]): [number, number, number] {
  if (morton < 0 || morton > 4_294_967_295) {
    throw MortonCodeRangeError;
  }
  const result = out ?? new Array(3) as [number, number, number];
  result[0] = morton3DDecodeCoordLUT256(morton, morton3DDecodeX512);
  result[1] = morton3DDecodeCoordLUT256(morton, morton3DDecodeY512);
  result[2] = morton3DDecodeCoordLUT256(morton, morton3DDecodeZ512);
  return result;
}
