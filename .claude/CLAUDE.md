# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Navigator Studio is a Windows desktop application (Electron + React + TypeScript + Vite) built for an accounting/payroll office. It bundles several standalone Hungarian payroll/tax document tools (PDF splitting, CSV joining, digital signing, PDF generation from company/employee data) behind one tabbed UI, backed by a browser-side IndexedDB database of company and employee records imported from Excel/CSV exports (e.g. OPTEN company registry exports, payroll CSVs).

The UI text, domain model field names, and most comments are in Hungarian and mirror exact Hungarian government/payroll Excel export field names (see "Database layer" below) — do not translate or rename these to English equivalents.

## Commands

- `npm run dev` — start Vite + Electron in dev mode (hot reload for both renderer and main process).
- `npm run build` — type-check (`tsc`) then `vite build` (builds renderer + electron main/preload via `vite-plugin-electron`).
- `npm run dist` — `electron-builder --publish always`: builds and publishes a Windows installer to the `Borobalaz/Navigator-Studio` GitHub releases (used for electron-updater auto-update).
- `npm run release` — build, then run `release.cjs` (bumps patch version, `git push`, then `electron-builder --publish always`). This is the full release flow run from a maintainer's machine.
- There is no test runner configured in this repo.
- Lint: `npx eslint .` (config in `.eslintrc.cjs`).

Electron main-process/preload code lives in `electron/` and is bundled separately from the `src/` renderer code by `vite-plugin-electron` (see `vite.config.ts`); both are type-checked together via the root `tsconfig.json` (`include: ["src", "electron"]`).

## Architecture

### Process split (Electron)

- `electron/main.ts` — main process. Creates the single frameless `BrowserWindow`, registers all `ipcMain.handle` channels (window controls, running bundled `.exe` tools via `child_process.spawn`, folder/file dialogs, PDF generation, `electron-updater` auto-update flow), and owns all Node/filesystem access.
- `electron/preload.ts` — the only bridge between main and renderer. Exposes three globals via `contextBridge`: `window.ipcRenderer` (raw on/off/send/invoke), `window.api` (app-specific operations: file/folder IO, running executables, PDF creation, window controls), `window.updater` (auto-update status/progress/install). Renderer code must go through these; it never talks to Electron/Node APIs directly (`nodeIntegration: false`, `contextIsolation: true`).
- `electron/services/PdfCreatorService.ts` — compiles Handlebars templates from `public/pdf_templates/*.html` with a data payload, then renders to PDF using a hidden `BrowserWindow.webContents.printToPDF()` (no headless-browser dependency).

### Bundled external tools

`public/{automatic_signer,csv_joiner,pdf_szetszedo}/` contain pre-built PyInstaller `.exe` tools (source Python in `scripts/`) that the renderer launches through `window.api.runExe()` → `run-executable` IPC → `child_process.spawn`. Their stdout/stderr (decoded as `win1250`, since these are Hungarian legacy-encoding tools) is streamed back to the renderer and collected by `src/managers/STDIOManager.ts`, which also splits concatenated JSON objects emitted on a single stdout write. UI screens for these tools live in `src/screens/{pdf_splitter,csv_joiner,automatic_signer}/`.

### Renderer app shell

`src/ui/App.tsx` is a fixed layout of `AppHeader` (window controls + update banner) → `ViewSelector` (left-hand icon menu, `src/ui/ViewSelector.tsx`) → `ScreenContainer` (tabbed content area) → `AppFooter`. There is no router: `src/managers/TabManager.ts` is a singleton event emitter holding the open tab list and active tab; `ViewSelector` menu entries call `tabManager.addTab({ label, component, props })` to open a screen as a tab (de-duping by label), and `ScreenContainer`/tab-bar components subscribe to `tabManager`'s `tabsChange`/`activeTabChange` events to re-render. New top-level features are added by (1) creating a screen component, (2) adding a menu entry + `addTab` call in `ViewSelector.tsx`.

Other singleton managers follow the same subscribe/emit pattern: `FSManager` (notifies on filesystem changes after file copy), and `globalSettings` (`src/settings.ts`, a localStorage-backed key/value store with per-key change listeners, used e.g. for dark mode).

### Database layer (`src/db/`)

Client-side persistence uses the browser's native IndexedDB (no Dexie/ORM), opened once per process (`client.ts`, `initNavigatorStudioDb`/`withDb`). `schema.ts` defines `DB_NAME`/`DB_VERSION`/`STORE_DEFINITIONS` for all object stores; `repository.ts` exposes one typed repository per store (e.g. `cegekRepository`, `munkavallalokRepository`) with CRUD + indexed lookup methods (`listByCegAzonosito`, etc.).

Key design facts (see `docs/indexeddb-adatbazis-dokumentacio.md` for the full schema/ERD):
- The company (`CEGEK`) table is the hub; most other stores (addresses, bank accounts, representatives, owners, declarations, TEAOR/GFO activity links, etc.) reference it via `CégAzonosító` and additionally carry a `Komponens útvonal` (component path) because the same Hungarian field name can appear under different source-document sections and must be kept as distinct records.
- Object store keys are internal (`_pk`), but index names and record field names intentionally match the exact Hungarian field names from the source Excel/CSV exports — including inconsistent capitalization and punctuation present in the originals (see section 8 of the docs file). Do not "clean up" these names.
- `import-service.ts` / `employee-import-service.ts` parse Excel (`xlsx` package) and payroll CSVs into these stores; `FORRASDOKUMENTUMOK` tracks each imported source file (hash-deduplicated) for audit/import-tracking. Import is last-write-wins per record.
- `pdf-payload-service.ts` composes a full `CompanyPdfPayload` (company + related entities + employees) for a given company ID, used by the PDF generator screens before handing data to `PdfCreatorService`.
- Schema migrations are additive (new store/index/field); `client.ts`'s `onupgradeneeded` has one destructive exception (`oldVersion < 2` drops and recreates all stores) — treat `DB_VERSION` bumps with care since object store keyPaths can't be altered in place.

### PDF generation screens

`src/screens/pdf_generator/*Screen.tsx` (Jövedelemigazolás, Munkaszerződés, TSZ/ESZ folyt/döntés) each: pick a company via `useCompanies()`/`CompanySelector`, build a payload (often via `loadCompanyForPdf` + `normalizePayloadForTemplate`), and call `window.api.createSchematicPdf(request)` which round-trips through the `pdf-create-schematic` IPC handler into `PdfCreatorService`. Matching Handlebars templates live in `public/pdf_templates/*.html`.

### Auto-update

Uses `electron-updater` against GitHub Releases (`package.json` → `build.publish`). Main process checks on startup and every 10 minutes, auto-downloads on `update-available`, and only installs on quit or user confirmation (dialog guards against closing mid-download). Renderer surfaces status via `window.updater` and `src/ui/components/UpdateBanner.tsx`.

## Repo-specific agent definitions

`.claude/agents/` contains specialized agent prompt definitions usable by compatible tools:
- `electron-indexeddb-architect.agent.md` — for IndexedDB schema/migration/repository work in this app.
- `pdf-template-generator-ui-creator.agent.md` — for building/refining PDF template + generator screens.
