import test from 'node:test';
import assert from 'node:assert/strict';
import { morton3DEncodeLUT } from "../../../dist/index.js";

test('valid output for (1, 2, 3) = 53', (_t) => {
  const mortonCode = morton3DEncodeLUT(1, 2, 3);
  assert.equal(mortonCode, 53);
});

test('valid output for (256, 512, 1023) = 285,212,672', (_t) => {
  const mortonCode = morton3DEncodeLUT(256, 512, 1023);
  assert.equal(mortonCode, 898_779_428);
});

test('valid output with values within range (1023, 1023, 1023) = 1,073,741,823', (_t) => {
  const mortonCode = morton3DEncodeLUT(1023, 1023, 1023);
  assert.equal(mortonCode, 1_073_741_823);
});

test('throws if values are out of range (1023, 1024, 1023)', (_t) => {
  assert.throws(morton3DEncodeLUT.bind(null, 1023, 1024, 1023));
});

test('throws if values are out of range (-1, 1, 2)', (_t) => {
  assert.throws(morton3DEncodeLUT.bind(null, -1, 1, 2));
});
