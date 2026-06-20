# Contribution Guide

## Content Rules

- Tutorial pages must include four sections: `Goal`, `Prerequisites`, `Steps`, `Expected Result and Troubleshooting`.
- Commands must be copy-runnable.
- API keys in examples must use placeholders; never commit real credentials.
- Capability status statements (available/not provided) must be verified against current code behavior first.

## Asset Rules

- Put images under `docs/.vuepress/public/images/...`
- Naming suggestion: `{page}-{step}-{yyyyMMdd}.{png|svg}`
- Add one sentence under each image: "What you should see".

## Submission Flow

1. Run `pnpm docs:dev` locally for self-check.
2. Run `pnpm docs:build` and ensure no build errors.
3. Before commit, check broken links, term consistency, and code snippet readability.

## Navigation Sync Check (Required)

Whenever a Chinese page is added or removed, check these two files at the same time:

- Top navigation: `docs/.vuepress/configs/navbar/zh.ts`
- Sidebar navigation: `docs/.vuepress/configs/sidebar/zh.ts`

Especially for second-level menu items, entries must stay consistent with actual grouped pages to avoid "page exists but menu missing" or "menu exists but page missing".
