export function bitCount(n: number): number {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

export const CoordRange10Error = new Error(
  "All input coords must be in Uint10 range (0 - 1023)"
);
export const CoordRange15Error = new Error(
  "All input coords must be in Uint15 range (0 - 32,767)"
);
export const MortonCodeRangeError = new Error(
  "Morton code must be in Uint32 range (0 - 65,535)"
);

export function valuesAreUint10(...values: number[]) {
  return values.every((val) => {
    return val >= 0 && val <= 1023;
  });
}

export function valuesAreUint15(...values: number[]) {
  return values.every((val) => {
    return val >= 0 && val <= 32_767;
  });
}
