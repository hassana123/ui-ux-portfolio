import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentWithFallback } from '../lib/content-fallback';
import { defaults, sampleProjects } from '../lib/defaults';

test('empty collections display labelled samples', () => {
  for (const kind of ['projects','playground_items','articles'] as const) {
    const result = contentWithFallback(kind, [], defaults);
    assert.ok(result.length > 0);
    assert.ok(result.every(item => item.sample));
  }
});
test('published content replaces samples instead of mixing with them', () => {
  const actual = { ...sampleProjects[0], id: 'real', sample: false };
  assert.deepEqual(contentWithFallback('projects', [actual], defaults), [actual]);
});
test('fallback respects disabled disciplines', () => {
  assert.deepEqual(contentWithFallback('playground_items', [], { ...defaults, disciplines: ['product'] }), []);
});
