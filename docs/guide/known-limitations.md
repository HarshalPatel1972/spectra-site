# Known Limitations

Spectra is an intelligence instrument, not magic. We value intellectual integrity over marketing claims. 
Here are the boundaries of what Spectra can and cannot do.

## 1. Dynamic Runtime Context
Spectra performs **static analysis**. It analyzes source code, configuration files, and dependencies at rest.
* **What it cannot do:** Determine if a hardcoded key is *actually* executed or reachable in a production environment.
* **Why:** Runtime reachability analysis requires dynamic instrumentation, which conflicts with Spectra's core goal of running in sub-second times on local developer machines without executing untrusted code.

## 2. Encrypted Payloads
If cryptography is used to obfuscate code (e.g., packed binaries or heavily obfuscated JavaScript), Spectra will not be able to identify the algorithms used inside the payload.
* **What it cannot do:** Analyze the inner workings of an encrypted binary blob.
* **Why:** Spectra relies on Abstract Syntax Tree (AST) parsing and known signature matching.

## 3. Custom Cryptographic Implementations
Spectra is trained to recognize standard implementations (e.g., Go's `crypto/*`, OpenSSL, Bouncy Castle). 
* **What it cannot do:** Detect a completely custom, roll-your-own implementation of RSA if it does not use standard function names, imports, or variable structures.
* **Why:** We intentionally do not use heuristic "guessing" models to avoid false positives. If we flag it, we must have evidence.

## 4. False Negatives vs. False Positives
We tune Spectra heavily towards **avoiding false positives**. We would rather miss a highly ambiguous, obscure usage than spam developers with 5,000 alerts that turn out to be harmless variable names like `var rsa_token = "foo"`.
* **The tradeoff:** You may occasionally encounter false negatives on highly non-standard implementations.

*Trust requires honesty. If you find a false negative in a standard library, please [open an issue](https://github.com/HarshalPatel1972/spectra/issues).*
