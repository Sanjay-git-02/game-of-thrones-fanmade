# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Repository cleanup for GitHub

This repository has been cleaned and reorganized for upload:

- Static assets consolidated under `public/assets/` (images, GIFs, icons).
- Empty or unused folders removed (e.g., `src/models/`).
- Build artifacts (`dist/`) and dependency folders (`node_modules/`) should not be committed — they are listed in `.gitignore`.

Before pushing to GitHub:

1. Verify `node_modules/` is not present in your commit (run `git status`).
2. If `node_modules/` exists locally and you wish to remove it, run:

```powershell
rd /s /q node_modules
rd /s /q dist
```

3. Build locally to confirm everything works:

```bash
npm install
npm run build
```

If any assets are missing after relocation, ensure they are present under `public/assets/` and that code references `/assets/<filename>`.
