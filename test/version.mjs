import test from 'node:test';
import assert from 'node:assert/strict';
import { version } from '../dist/index.js';
import pkg from '../package.json' assert { type: 'json' };

test('version is exported', (_t) => {  
  assert.equal(version, pkg.version);
});
