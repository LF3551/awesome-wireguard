# Contribution guidelines

Thanks for helping keep this list useful. Pull requests and issues are both welcome; the maintainer reviews them quickly.

## What belongs here

- Projects, tools, services, guides and talks that are directly about WireGuard, or about Tailscale, Headscale and other tools built on WireGuard.
- Open-source projects with a working README, or services you can try without a sales call.
- Guides and articles that teach something concrete and still work today.

## What does not belong here

- Projects with no commit for 12 months (older projects that are still useful go to **Inactive projects** after review).
- Marketing pages, affiliate or referral links, tracking parameters such as `utm_source`.
- General VPN reviews and "best VPN" lists.
- Link-only entries with no description of what the project does.

## How to add an entry

1. Search the list first: duplicates are rejected.
2. Pick the most specific section. Entries are in alphabetical order inside a section.
3. Use this format, one project per pull request:

   ```markdown
   - [Name](https://example.com/) - Short, factual description that starts with a capital letter and ends with a period.
   ```

4. Describe what the project does, not how great it is. No star counts or badges in the line.
5. If you are the author or work for the vendor, say so in the pull request description.

## Reporting problems

A dead link, a project that changed its license or was abandoned, or a wrong description: open an issue or send a pull request that fixes it.

## Checks

Pull requests run [awesome-lint](https://github.com/sindresorhus/awesome-lint) and a link checker. You can run the linter locally with `npx awesome-lint`.
