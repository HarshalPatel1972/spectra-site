# CNSA 2.0 Compliance

The **Commercial National Security Algorithm Suite 2.0 (CNSA 2.0)** was announced by the NSA in September 2022. It mandates the transition to Post-Quantum Cryptography (PQC) for all National Security Systems (NSS).

While technically only legally binding for US National Security Systems, CNSA 2.0 is globally recognized as the gold standard timeline that enterprise architectures follow.

## Spectra and CNSA 2.0

When you run `spectra compliance --frameworks cnsa20`, Spectra evaluates your cryptographic inventory against the specific deadlines laid out in the NSA advisory.

### The CNSA 2.0 Timeline enforced by Spectra:

#### Software & Firmware Updates
- **2025**: Must begin supporting PQC (ML-DSA) for software/firmware signing.
- **2030**: Exclusive use of PQC for signing required.
- *Spectra flags RSA/ECDSA signing in certificates or CI pipelines as a WARNING before 2030, and a CRITICAL VIOLATION after.*

#### Web Browsers & Servers
- **2025**: Must support ML-KEM for key establishment (TLS 1.3).
- **2030**: Exclusive use of ML-KEM required.
- *Spectra flags ECDHE and RSA key exchange in TLS configs as violations.*

#### Cloud Services & Networking
- **2027**: Must support ML-KEM.
- **2033**: Exclusive use of ML-KEM required.

## Approved Algorithms

Spectra will verify that your codebase only uses the CNSA 2.0 approved suite:
- **Asymmetric Encryption / KEM**: ML-KEM (FIPS 203)
- **Digital Signatures**: ML-DSA (FIPS 204), LMS (SP 800-208), XMSS (SP 800-208)
- **Symmetric Encryption**: AES-256 (FIPS 197)
- **Hashing**: SHA-384, SHA-512 (FIPS 180-4)
