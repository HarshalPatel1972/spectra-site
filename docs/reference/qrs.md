# Quantum Risk Score (QRS) Methodology

The Quantum Risk Score (QRS) is Spectra's proprietary metric for quantifying your exposure to Harvest-Now-Decrypt-Later attacks and Cryptographically Relevant Quantum Computers (CRQCs). 

The score ranges from **0 (Safe)** to **100 (Critical)**.

## How it works

The final QRS for a given cryptographic finding is calculated by combining three factors:

### 1. Base Algorithm Vulnerability
Every algorithm has a base score assigned by its primitive type and known susceptibility to Shor's algorithm or Grover's algorithm.
- **RSA / ECC / Diffie-Hellman**: 80-90 (Critically vulnerable to Shor's algorithm).
- **SHA-1 / MD5**: 70-80 (Vulnerable to classical collision attacks, further weakened by Grover's).
- **AES-128**: 30 (Vulnerable to Grover's algorithm halving the effective key size to 64-bit).
- **AES-256 / SHA-256 / SHA-3**: 0-10 (Considered quantum-resistant).
- **ML-KEM / ML-DSA**: 0 (NIST standardized post-quantum algorithms).

### 2. Key Size Penalty / Bonus
For asymmetric encryption and signatures, the key size drastically alters the timeline to vulnerability.
- **RSA < 2048-bit**: +10 points (Easier to break with fewer logical qubits).
- **RSA >= 4096-bit**: -20 points (Provides a significantly larger buffer before CRQCs can factor it).
- **ECC < 256-bit**: +10 points.

### 3. Usage Frequency (Ubiquity)
The more a vulnerable algorithm is used, the harder it is to replace.
- **> 20 occurrences**: +10 points.
- **> 5 occurrences**: +5 points.

## Aggregate QRS

The Aggregate QRS for an entire codebase is not a simple average. Spectra uses a weighted mean where higher individual QRS scores pull the aggregate score up exponentially.

$$W_i = \left(\frac{QRS_i}{100}\right)^2 + 0.01$$

This ensures that a single CRITICAL instance of RSA-1024 cannot be "hidden" by 1,000 instances of safe AES-256 usage. If you have critical quantum debt, your aggregate score will reflect it.
