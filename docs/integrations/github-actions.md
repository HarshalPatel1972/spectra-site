# GitHub Actions Integration

Spectra provides an official GitHub Action that allows you to automatically scan your repository for quantum-vulnerable cryptography on every Pull Request and Push.

This ensures that developers cannot merge new classical cryptography debt into your codebase.

## The `spectra-action`

The official action is available on the GitHub Marketplace: `HarshalPatel1972/spectra-action`.

### Quick Start

Create a file in your repository at `.github/workflows/spectra-scan.yml`:

\`\`\`yaml
name: Spectra Quantum Crypto Scan

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Scan for quantum-vulnerable crypto
      uses: HarshalPatel1972/spectra-action@v1
      with:
        fail-on: critical
        output-formats: terminal,cbom
        
    - name: Upload CBOM Artifact
      uses: actions/upload-artifact@v4
      with:
        name: spectra-cbom
        path: spectra-out/spectra-cbom.json
\`\`\`

## Configuration Inputs

| Input | Description | Default |
|---|---|---|
| `path` | The path to scan within the repository. | `.` |
| `fail-on` | The severity threshold to fail the CI build. Options: `any`, `high`, `critical`. | `critical` |
| `output-formats` | Comma-separated list of formats to generate. | `terminal,cbom` |

## Breaking the Build

By default, the Action will return a non-zero exit code (failing the PR check) if any **CRITICAL** findings are discovered (e.g., RSA-1024, MD5).

If you want to enforce strict PQC migration, you can set `fail-on: any`, which will fail the build if *any* non-PQC cryptography is detected.
