# Maintenance Checklist

## A. Source alignment

- [ ] AgentKernel API names/parameters are verified from source.
- [ ] Sample menu mapping remains correct (`[1][2][3][4][7][8]`).
- [ ] Capability status text matches current source behavior.
- [ ] `Senparc.AI.Kernel` remains list-level historical note only.

## B. Bilingual sync

- [ ] Every changed Chinese page has corresponding English update.
- [ ] Directory/page mapping remains one-to-one between `docs/zh` and `docs`.
- [ ] Cross-links are correct per locale (`/zh/...` vs `/...`).

## C. Navigation sync

- [ ] `navbar/zh.ts` updated.
- [ ] `sidebar/zh.ts` updated.
- [ ] `navbar/en.ts` updated.
- [ ] `sidebar/en.ts` updated.
- [ ] No dead links from second-level menus.

## D. Quality checks

- [ ] Tutorial pages follow: Goal / Prerequisites / Steps / Expected Result and Troubleshooting.
- [ ] Commands are copy-runnable.
- [ ] No real credentials in docs/examples.
- [ ] Image assets are under `docs/.vuepress/public/images/...`.

## E. Build checks

- [ ] `pnpm docs:build` passed.
- [ ] If build errors occur, fix them before merge.
