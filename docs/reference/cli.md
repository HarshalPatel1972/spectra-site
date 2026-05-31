# Spectra CLI Reference

The Spectra CLI is the core engine for cryptographic asset discovery and quantum risk analysis.

## Global Flags

- `--persist`: Save the results of this scan to the local SQLite database (`~/.spectra/state.db`) for historical tracking.
- `--quiet`: Suppress all non-essential terminal output. Only print the final aggregate score or explicit errors.
- `--debug`: Enable verbose logging for debugging pattern matches and file ingestion.

## `spectra scan [path]`

Scans a directory or file for cryptographic primitives.

### Flags
- `--output`: Comma-separated list of formats. Options: `terminal` (default), `json`, `cbom`, `html`.
- `--out-dir`: The directory to save generated reports (default `./spectra-out`).
- `--fail-on`: Set a threshold to return a non-zero exit code. Options: `critical`, `high`, `medium`.
- `--scanners`: Comma-separated list of scanners to run. Options: `code`, `cert`, `deps`, `config`. (Default: all)
- `--exclude`: Glob patterns to ignore (e.g., `vendor/,dist/`).

### Example
\`\`\`bash
spectra scan ./src --output terminal,cbom --fail-on critical
\`\`\`

## `spectra simulate`

Simulates a migration from one algorithm to another to estimate engineering effort.

### Flags
- `--from`: The legacy algorithm to replace (e.g., `RSA`).
- `--to`: The target algorithm to migrate to (e.g., `ML-KEM`).
- `--scan-id`: The UUID of a previous scan (if not specified, uses the latest persistent scan).

### Example
\`\`\`bash
spectra simulate --from ECDSA --to ML-DSA
\`\`\`

## `spectra history`

Compares two historical scans to calculate risk velocity and remediation progress.

### Flags
- `--base`: The UUID or alias (e.g., `HEAD~1`) of the base scan.
- `--current`: The UUID or alias of the current scan.

## `spectra compliance`

Evaluates a scan against a specific regulatory framework.

### Flags
- `--scan-id`: The UUID of the scan to evaluate.
- `--frameworks`: Comma-separated frameworks. Options: `cnsa20`, `nist-800-131a`, `pci-dss-4`.

## `spectra badge`

Generates a markdown badge snippet for your README containing the latest QRS score.
