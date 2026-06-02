# Spectra: A Practical Architecture for Cryptographic Asset Discovery

## 1. The Problem Statement

The transition to Post-Quantum Cryptography (PQC) represents the largest cryptographic migration in history. Before an organization can migrate to NIST-standardized algorithms like ML-KEM or ML-DSA, it must first answer a seemingly simple question: *"What cryptography are we currently using, and where is it?"*

Current tooling has a significant gap when answering this question. Software Composition Analysis (SCA) tools look for known CVEs in third-party packages, but a dependency may safely implement RSA-2048 without triggering a CVE. Static Application Security Testing (SAST) tools look for injection flaws or hardcoded secrets, but rarely map the usage of specific curves or hashing primitives. 

Furthermore, generating a CycloneDX 1.7 Cryptographic Bill of Materials (CBOM) is a manual process for most teams.

## 2. Architecture Overview

Spectra solves this through a four-pillar discovery architecture:

### 2.1 The Scanner Engines
- **Code Scanner**: A polyglot AST and regex-based engine that identifies cryptographic API calls across Go, Python, Java, JS/TS, Rust, and C/C++. It extracts not just the algorithm, but contextual parameters like key sizes (e.g., extracting `2048` from `rsa.GenerateKey(rand.Reader, 2048)`).
- **Certificate Scanner**: Parses PEM, DER, and CRT files via ASN.1/X.509 decoders to identify the signature algorithm and public key parameters.
- **Dependency Scanner**: Parses `go.mod`, `package.json`, `pom.xml`, etc., cross-referencing against a known database of cryptographically-relevant libraries.
- **Configuration Scanner**: Analyzes TLS configurations, YAML files, and `.env` files for insecure cipher suites (e.g., ECDHE).

### 2.2 Quantum Risk Score (QRS)
Spectra introduces the Quantum Risk Score, a weighted 0-100 metric. It considers:
1. **Base Primitive Vulnerability**: Asymmetric algorithms (RSA, ECC) score highest due to Shor's algorithm. Symmetric algorithms (AES) score lower.
2. **Key Size Adjustments**: RSA-1024 penalizes heavily; RSA-4096 provides a slight reduction.
3. **Usage Density**: Pervasive usage across the codebase increases the score, reflecting higher migration effort.

### 2.3 Compliance Engine
Spectra embeds the rulesets for **NSA CNSA 2.0** and **NIST SP 800-131A**. By evaluating the discovery graph against these rules, Spectra outputs explicit violation notices and regulatory deadlines.

## 3. Comparison with Alternative Approaches

- **grep/regex**: Prone to massive false positives (matching comments, variable names). Does not extract key sizes or parse certificates.
- **SAST tools**: Not designed for cryptographic asset mapping. Missing CBOM capabilities.
- **Building Internally**: Requires 2-6 months of engineering time, plus ongoing maintenance of the pattern registry as new APIs are released.

## 4. Security Properties of Spectra

Spectra is built for zero-trust environments:
- **No Network Calls**: The core scanner makes zero external API requests.
- **No Telemetry**: No usage metrics or code snippets are collected.
- **Local SQLite State**: All historical scan data is stored locally in `~/.spectra/state.db`.

## 5. Conclusion

By combining polyglot code scanning, certificate parsing, and regulatory mapping, Spectra enables engineering teams to generate compliant CBOMs and actionable migration plans in seconds rather than months.
