import test from 'node:test';
import assert from 'node:assert/strict';
import { morton2DEncodeLUT } from "../../../dist/index.js";

test('valid output for (1, 2) = 9', (_t) => {
  const mortonCode = morton2DEncodeLUT(1, 2);
  assert.equal(mortonCode, 9);
});

test('valid output for (256, 512) = 589,824', (_t) => {
  const mortonCode = morton2DEncodeLUT(256, 512);
  assert.equal(mortonCode, 589_824);
});

test('valid output with values within range (32767, 32767) = 1,073,741,823', (_t) => {
  const mortonCode = morton2DEncodeLUT(32767, 32767);
  assert.equal(mortonCode, 1_073_741_823);
});

test('throws if values are out of range (32767, 32768)', (_t) => {
  assert.throws(morton2DEncodeLUT.bind(null, 32767, 32768));
});

test('throws if values are out of range (-1, 1)', (_t) => {
  assert.throws(morton2DEncodeLUT.bind(null, -1, 1));
});
