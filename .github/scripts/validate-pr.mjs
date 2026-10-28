// Validates a single-entry pull request. PR content is treated as data only; no PR code is ever executed.
import { appendFileSync, writeFileSync } from 'node:fs';

const ENTRY = /^- \[([^\]]+)\]\((https?:\/\/[^)\s]+)\) - (.+)$/;
const SKIP_SECTIONS = new Set(['Contents', 'Choosing a tool', 'FAQ', 'Contributing', 'Inactive projects', 'Official resources']);
const PROMO = /\b(best|#1|number one|ultimate|revolutionary|leading|amazing|fastest|cheapest|coupon|discount|free trial)\b/i;
const TRACKING = /[?&](utm_[a-z]+|ref|ref_src|aff|affiliate|via|fbclid|gclid)=/i;

export const normalizeUrl = (u) => u.trim().toLowerCase().replace(/^http:\/\//, 'https://').replace(/\/+$/, '');

export function parseEntries(text) {
  const out = [];
  let section = '';
  text.split('\n').forEach((line, i) => {
    const h = line.match(/^## (.+)$/);
    if (h) {
      section = h[1].trim();
      return;
    }
    const m = line.match(ENTRY);
    if (m) out.push({ line, name: m[1], url: m[2], desc: m[3], section, index: i });
  });
  return out;
}

function lineDiff(base, head) {
  const count = (arr) => arr.reduce((m, l) => m.set(l, (m.get(l) || 0) + 1), new Map());
  const b = count(base.split('\n'));
  const h = count(head.split('\n'));
  const added = [];
  const removed = [];
  for (const [l, n] of h) for (let i = 0; i < n - (b.get(l) || 0); i++) added.push(l);
  for (const [l, n] of b) for (let i = 0; i < n - (h.get(l) || 0); i++) removed.push(l);
  return { added, removed };
}

function patchLines(patch) {
  const added = [];
  const removed = [];
  for (const l of patch.split('\n')) {
    if (l.startsWith('+')) added.push(l.slice(1));
    else if (l.startsWith('-')) removed.push(l.slice(1));
  }
  return { added, removed };
}

// Pure text checks. Returns { checks: [{ok, label}], entry }.
// `patch` is the PR's own diff against its merge base, so a branch that is behind main is not penalised.
export function analyze(base, head, patch) {
  const checks = [];
  const add = (ok, label) => checks.push({ ok, label });
  const { added, removed } = patch === undefined ? lineDiff(base, head) : patchLines(patch);
  add(removed.length === 0 && added.length === 1, 'Exactly one line added and nothing removed or changed');
  const m = added.length === 1 ? added[0].match(ENTRY) : null;
  add(Boolean(m), 'Line uses the format `- [Name](https://url) - Description.`');
  if (!m) return { checks, entry: null };

  const [, name, url, desc] = m;
  const baseEntries = parseEntries(base);
  const headEntries = parseEntries(head);
  const entry = { name, url, desc };

  add(url.startsWith('https://'), 'URL uses https');
  add(!TRACKING.test(url), 'URL has no tracking or affiliate parameters');
  const norm = normalizeUrl(url);
  add(!baseEntries.some((e) => normalizeUrl(e.url) === norm), 'Not already in the list');
  add(/^[A-Z]/.test(desc) && desc.endsWith('.'), 'Description starts with a capital letter and ends with a period');
  add(desc.length >= 12 && desc.length <= 220, 'Description is 12 to 220 characters');
  add(!desc.toLowerCase().startsWith(name.toLowerCase()), 'Description does not start with the project name');
  add(!PROMO.test(desc), 'Description has no promotional wording');

  const target = headEntries.find((e) => e.line === added[0]);
  const section = target?.section;
  const allowed = new Set(baseEntries.map((e) => e.section).filter((s) => !SKIP_SECTIONS.has(s)));
  add(Boolean(section) && allowed.has(section), `Placed in an existing section (${section || 'none'})`);
  if (section && allowed.has(section)) {
    const mates = headEntries.filter((e) => e.section === section);
    const pos = mates.indexOf(target);
    const key = (e) => e.name.toLowerCase();
    const okOrder = (pos === 0 || key(mates[pos - 1]) <= key(target)) && (pos === mates.length - 1 || key(target) <= key(mates[pos + 1]));
    add(okOrder, 'In alphabetical order inside the section');
  }
  return { checks, entry };
}

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'User-Agent': 'awesome-wireguard-bot' },
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

async function fileAt(repo, ref, path) {
  const j = await gh(`/repos/${repo}/contents/${path}?ref=${ref}`);
  return Buffer.from(j.content, 'base64').toString('utf8');
}

// Extra checks that need the GitHub API. Auto-merge is limited to GitHub repositories.
export async function repoChecks(entry, author) {
  const checks = [];
  const add = (ok, label) => checks.push({ ok, label });
  const m = entry.url.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/i);
  add(Boolean(m), 'Link points to a GitHub repository (other links get a manual review)');
  if (!m) return checks;
  const repo = await gh(`/repos/${m[1]}/${m[2]}`);
  add(!repo.archived, 'Repository is not archived');
  const monthsOld = (Date.now() - new Date(repo.pushed_at)) / (1000 * 60 * 60 * 24 * 30);
  add(monthsOld <= 12, 'Last commit is within 12 months');
  add(repo.stargazers_count >= 5, 'Repository has at least 5 stars');
  const user = await gh(`/users/${author}`);
  const ageDays = (Date.now() - new Date(user.created_at)) / (1000 * 60 * 60 * 24);
  add(ageDays >= 30 || user.login.toLowerCase() === m[1].toLowerCase(), 'Author account is older than 30 days or owns the repository');
  return checks;
}

async function main() {
  const { REPO, PR_NUMBER } = process.env;
  const pr = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}`);
  const files = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/files?per_page=100`);
  const checks = [{ ok: files.length === 1 && files[0].filename === 'README.md' && files[0].status === 'modified', label: 'Only README.md is changed' }];
  let entry = null;
  if (checks[0].ok) {
    const base = await fileAt(REPO, pr.base.sha, 'README.md');
    const head = await fileAt(pr.head.repo.full_name, pr.head.sha, 'README.md');
    const res = analyze(base, head, files[0].patch || '');
    checks.push(...res.checks);
    entry = res.entry;
  }
  if (entry && checks.every((c) => c.ok)) checks.push(...(await repoChecks(entry, pr.user.login)));

  const ok = checks.every((c) => c.ok);
  const rows = checks.map((c) => `| ${c.ok ? 'Pass' : 'Fail'} | ${c.label} |`).join('\n');
  const verdict = ok
    ? 'All checks passed. This pull request will be merged automatically once the required CI checks are green.'
    : 'Some checks need attention, or this entry needs a manual review. Fix the failed rows and push again, or wait for the maintainer.';
  writeFileSync('report.md', `Automated entry check\n\n| Result | Check |\n| --- | --- |\n${rows}\n\n${verdict}\n`);
  appendFileSync(process.env.GITHUB_OUTPUT, `ok=${ok}\n`);
}

if (process.argv[1] && process.argv[1].endsWith('validate-pr.mjs')) {
  main().catch((e) => {
    console.error(e);
    writeFileSync('report.md', 'Automated entry check could not run; the maintainer will review this pull request.\n');
    appendFileSync(process.env.GITHUB_OUTPUT, 'ok=false\n');
  });
}
