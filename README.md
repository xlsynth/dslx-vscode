# DSLX Language Support for Visual Studio Code

<div align='center'>
<img src='https://raw.githubusercontent.com/kammoh/dslx-vscode/main/images/xls_logo.png' alt='XLS Logo'>
</div>

## Overview

This is a wrapper around the `dslx_ls` language server binary to make it usable as a VSCode extension.

## Structure

```
.
├── src // Language Client
│   └── extension.ts // Language Client entry point
└── package.json // The extension manifest.
```

## Build

- Run `npm install`
- Run `npm run compile` to compile the client.
- To generate the VSIX package run `npm run package`.