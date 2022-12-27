
export function bitCount (n: number): number {
  n = n - ((n >> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

export const CoordRangeError = new Error("All input coords must be in Uint10 range (0 - 1023)");
export const MortonCodeRangeError = new Error("Morton code must be in Uint32 range (0 - 65,535)");

export function valuesAreUint10(...values: number[]) {
  return values.every((val) => {
    return val >= 0 && val <= 1023;
  });
}

