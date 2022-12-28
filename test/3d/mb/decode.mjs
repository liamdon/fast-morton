import test from 'node:test';
import assert from 'node:assert/strict';
import { morton3DDecodeMB } from "../../../dist/index.js";

test('valid output for morton code 1-8', (_t) => {
  const valid = [
    [ 1, 0, 0 ],
    [ 0, 1, 0 ],
    [ 1, 1, 0 ],
    [ 0, 0, 1 ],
    [ 1, 0, 1 ],
    [ 0, 1, 1 ],
    [ 1, 1, 1 ],
    [ 2, 0, 0 ]
  ];
  for (let i = 1; i < 8; i++) {
    const coords = morton3DDecodeMB(i + 1);
    assert.deepEqual(coords, valid[i]);
  }
});

test('valid output for 53 = (1, 2, 3)', (_t) => {
  const coords = morton3DDecodeMB(53);
  assert.equal(coords[0], 1);
  assert.equal(coords[1], 2);
  assert.equal(coords[2], 3);
});

test('valid output for 898,779,428 = (256, 512, 1023)', (_t) => {
  const coords = morton3DDecodeMB(898_779_428);
  assert.equal(coords[0], 256);
  assert.equal(coords[1], 512);
  assert.equal(coords[2], 1023);
});

test('valid output for code within range 1_073_741_823 = (1023, 1023, 1023)', (_t) => {
  const coords = morton3DDecodeMB(1_073_741_823);
  assert.equal(coords[0], 1023);
  assert.equal(coords[1], 1023);
  assert.equal(coords[2], 1023);
});

test('throws if code out of range (4,294,967,296)', (_t) => {
  assert.throws(morton3DDecodeMB.bind(null, 4_294_967_296));
});

test('throws if values are out of range (-1)', (_t) => {
  assert.throws(morton3DDecodeMB.bind(null, -1));
});
