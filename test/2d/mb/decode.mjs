import test from 'node:test';
import assert from 'node:assert/strict';
import { morton2DDecodeMB } from "../../../dist/index.js";

test('valid output for 53 = (1, 2)', (_t) => {
  const coords = morton2DDecodeMB(9);
  assert.equal(coords[0], 1);
  assert.equal(coords[1], 2);
});

test('valid output for 589,824 = (256, 512)', (_t) => {
  const coords = morton2DDecodeMB(589_824);
  assert.equal(coords[0], 256);
  assert.equal(coords[1], 512);
});

test('valid output for code within range 1_073_741_823 = (32767, 32767)', (_t) => {
  const coords = morton2DDecodeMB(1_073_741_823);
  assert.equal(coords[0], 32767);
  assert.equal(coords[1], 32767);
});

test('throws if code out of range (4,294,967,296)', (_t) => {
  assert.throws(morton2DDecodeMB.bind(null, 4_294_967_296));
});

test('throws if values are out of range (-1)', (_t) => {
  assert.throws(morton2DDecodeMB.bind(null, -1));
});
