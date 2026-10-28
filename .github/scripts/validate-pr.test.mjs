import test from 'node:test';
import assert from 'node:assert/strict';
import { analyze } from './validate-pr.mjs';

const base = [
  '## Contents',
  '- [Desktop clients](#desktop-clients)',
  '',
  '## Desktop clients',
  '',
  '- [Alpha](https://github.com/a/alpha) - First client for macOS.',
  '- [Gamma](https://github.com/g/gamma) - Third client for Windows.',
  '',
  '## Deployment',
  '',
  '- [Docker thing](https://github.com/d/docker) - Container image for WireGuard.',
  '',
].join('\n');

const withLine = (line, at = 6) => {
  const l = base.split('\n');
  l.splice(at, 0, line);
  return l.join('\n');
};
const ok = (r) => r.checks.every((c) => c.ok);
const failed = (r) => r.checks.filter((c) => !c.ok).map((c) => c.label);

test('valid alphabetical addition passes', () => {
  assert.ok(ok(analyze(base, withLine('- [Beta](https://github.com/b/beta) - Second client for Linux.'))));
});

test('wrong order fails', () => {
  const r = analyze(base, withLine('- [Zeta](https://github.com/z/zeta) - Last client for Linux.'));
  assert.ok(failed(r).some((l) => l.includes('alphabetical')));
});

test('two added lines fail', () => {
  const head = withLine('- [Beta](https://github.com/b/beta) - Second client.\n- [Delta](https://github.com/d/delta) - Fourth client.');
  assert.ok(!ok(analyze(base, head)));
});

test('removed line fails', () => {
  assert.ok(!ok(analyze(base, base.replace('- [Alpha](https://github.com/a/alpha) - First client for macOS.\n', ''))));
});

test('duplicate url fails', () => {
  const r = analyze(base, withLine('- [Alpha2](https://github.com/a/alpha/) - Same project again.', 7));
  assert.ok(failed(r).includes('Not already in the list'));
});

test('tracking parameters and promo wording fail', () => {
  const r = analyze(base, withLine('- [Beta](https://github.com/b/beta?utm_source=x) - The best client ever made.'));
  assert.ok(failed(r).includes('URL has no tracking or affiliate parameters'));
  assert.ok(failed(r).includes('Description has no promotional wording'));
});

test('bad format fails', () => {
  assert.ok(!ok(analyze(base, withLine('* Beta https://github.com/b/beta'))));
});

test('addition outside entry sections fails', () => {
  const r = analyze(base, withLine('- [Beta](https://github.com/b/beta) - Second client for Linux.', 2));
  assert.ok(!ok(r));
});

test('branch behind main passes when judged by its own patch', () => {
  const line = '- [Beta](https://github.com/b/beta) - Second client for Linux.';
  const newerBase = base.replace('## Deployment', '- [Delta](https://github.com/d/delta) - Fourth client.\n\n## Deployment');
  const r = analyze(newerBase, withLine(line), `@@ -5,3 +5,4 @@\n+${line}`);
  assert.ok(ok(r), failed(r).join('; '));
});
