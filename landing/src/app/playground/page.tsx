'use client'

import { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { go } from '@codemirror/lang-go'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

const EXAMPLES = {
  'go': {
    name: 'Go JWT Authentication',
    code: `package auth

import (
\t"crypto/rsa"
\t"crypto/sha1"
\t"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(key *rsa.PrivateKey) string {
\t// Legacy token generation
\th := sha1.New()
\tt := jwt.New(jwt.SigningMethodRS256)
\tstr, _ := t.SignedString(key)
\treturn str
}
`
  },
  'python': {
    name: 'Python Cryptography',
    code: `from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

# Generate ECC key for signing
private_key = ec.generate_private_key(ec.SECP256R1())

# Symmetric encryption for data payload
key = b'32_byte_key_here...'
cipher = Cipher(algorithms.AES(key), modes.GCM(b'iv_here'))
`
  },
  'java': {
    name: 'Java PKCS',
    code: `import java.security.KeyPairGenerator;
import javax.crypto.Cipher;

public class SecurityManager {
    public void setup() throws Exception {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(1024);
        
        Cipher desCipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
    }
}
`
  }
}

export default function PlaygroundPage() {
  const [language, setLanguage] = useState<'go' | 'python' | 'java'>('go')
  const [code, setCode] = useState(EXAMPLES.go.code)
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [mode, setMode] = useState<'server' | 'wasm'>('server')
  const [wasmReady, setWasmReady] = useState(false)

  useEffect(() => {
    if (mode === 'wasm' && !(window as any).Go) {
      const script = document.createElement('script')
      script.src = '/wasm_exec.js'
      script.onload = () => {
        const go = new (window as any).Go()
        WebAssembly.instantiateStreaming(fetch('/spectra.wasm'), go.importObject).then((res) => {
          go.run(res.instance)
          setWasmReady(true)
        }).catch(err => console.error('WASM load error:', err))
      }
      document.body.appendChild(script)
    } else if (mode === 'wasm' && (window as any).scanSpectra) {
      setWasmReady(true)
    }
  }, [mode])

  const handleScan = async () => {
    setIsScanning(true)
    try {
      if (mode === 'wasm') {
        if (!(window as any).scanSpectra) {
          setResult({ error: 'WASM module not loaded yet. Please wait a moment and try again.' })
          setIsScanning(false)
          return
        }
        const jsonStr = (window as any).scanSpectra(code, language, `test.${language}`)
        setResult(JSON.parse(jsonStr))
      } else {
        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, language, filename: `test.${language}` })
        })
        const data = await res.json()
        setResult(data)
      }
    } catch (e: any) {
      setResult({ error: e.message || 'An unexpected error occurred communicating with the analysis engine.' })
    }
    setIsScanning(false)
  }

  const getLangExtension = () => {
    if (language === 'go') return go()
    if (language === 'python') return python()
    return java()
  }

  const getRiskColor = (band: string) => {
    if (band === 'CRITICAL') return 'text-critical';
    if (band === 'HIGH') return 'text-high';
    if (band === 'MEDIUM') return 'text-medium';
    if (band === 'LOW') return 'text-low';
    return 'text-safe';
  }

  return (
    <div className="min-h-screen flex flex-col bg-void text-text-primary font-sans relative overflow-hidden">
      
      {/* Enterprise Background Layer */}
      <div className="bg-grid absolute inset-0 z-0 pointer-events-none" />
      
      <div className="flex flex-col min-h-screen z-10 relative">
        <header className="border-b border-border/50 h-16 px-8 flex items-center justify-between bg-void/80 backdrop-blur-md shrink-0 sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-text-secondary font-mono text-[14px] ml-4 hidden md:inline">/ playground</span>
          </Link>
          <nav className="hidden lg:flex gap-8 text-[14px] font-medium text-text-secondary mx-4">
            <Link href="/what-happens" className="hover:text-text-primary transition-colors">The Quantum Threat</Link>
            <Link href="/playground" className="text-brand transition-colors font-semibold">Playground</Link>
            <a href="/docs" className="hover:text-text-primary transition-colors">Documentation</a>
            <Link href="/download" className="hover:text-text-primary transition-colors">Download</Link>
          </nav>
          <div className="flex gap-4 items-center">
            <select 
              className="appearance-none bg-surface-1 border border-border/80 text-[13px] font-sans text-text-primary px-4 py-1.5 rounded focus:outline-none focus:border-brand/50 transition-colors shadow-sm"
              value={language}
              onChange={(e: any) => {
                setLanguage(e.target.value)
                setCode(EXAMPLES[e.target.value as keyof typeof EXAMPLES].code)
              }}
            >
              <option value="go">Example: Go JWT</option>
              <option value="python">Example: Python Crypto</option>
              <option value="java">Example: Java PKCS</option>
            </select>
            <div className="flex bg-surface-1 border border-border/80 rounded overflow-hidden shadow-sm">
              <button 
                onClick={() => setMode('server')}
                className={`px-4 py-1.5 text-[12px] font-sans font-medium transition-colors ${mode === 'server' ? 'bg-surface-2 text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Server
              </button>
              <button 
                onClick={() => setMode('wasm')}
                className={`px-4 py-1.5 text-[12px] font-sans font-medium transition-colors ${mode === 'wasm' ? 'bg-surface-2 text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                WASM
              </button>
            </div>
            <button 
              onClick={handleScan}
              disabled={isScanning || (mode === 'wasm' && !wasmReady)}
              className="bg-brand/10 border border-brand/30 hover:bg-brand/20 hover:border-brand/50 text-brand px-6 py-1.5 rounded font-sans font-semibold text-[13px] transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(46,196,196,0.1)] flex items-center gap-2"
            >
              {isScanning ? (
                <><span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span> Scanning</>
              ) : (
                <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Scan Code</>
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 max-w-[1600px] w-full mx-auto p-6 md:p-8 flex flex-col min-h-0">
          
          <div className="mb-6">
            <h1 className="font-serif text-[2rem] font-bold text-text-primary mb-2">Interactive Analysis Environment</h1>
            <p className="text-text-secondary text-[15px] max-w-3xl">
              Write, paste, or select an example implementation below. The Spectra engine will parse the AST, identify cryptographic primitives, and calculate the exact Quantum Risk Score in milliseconds.
            </p>
          </div>

          <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[500px]">
            {/* Editor Window */}
            <div className="flex flex-col bg-surface-0 border border-border/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="h-11 bg-surface-1/80 border-b border-border/50 flex items-center px-4 gap-3 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span className="text-[12px] font-mono text-text-secondary">main.{language}</span>
              </div>
              <div className="flex-1 overflow-auto bg-surface-0">
                <CodeMirror
                  value={code}
                  height="100%"
                  theme="dark"
                  extensions={[getLangExtension()]}
                  onChange={(val) => setCode(val)}
                  className="h-full text-[14px] font-mono"
                  style={{ backgroundColor: 'transparent' }}
                />
              </div>
            </div>

            {/* Results Terminal Window */}
            <div className="flex flex-col bg-void border border-border/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl relative">
              <div className="h-11 bg-surface-1/80 border-b border-border/50 flex items-center px-4 justify-between shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                </div>
                <div className="font-mono text-[11px] text-text-muted absolute left-1/2 -translate-x-1/2">
                  spectra scan main.{language}
                </div>
                <div></div>
              </div>

              <div className="flex-1 overflow-auto p-6 relative">
                {!result ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-60">
                    <div className="w-16 h-16 mb-4 text-brand opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <h3 className="text-xl font-serif text-text-primary mb-2">Analysis Engine Idle</h3>
                    <p className="text-text-secondary text-[14px] max-w-sm">
                      Select an example from the dropdown or paste your own cryptographic implementation to begin.
                    </p>
                  </div>
                ) : result.error ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-12 h-12 rounded-full bg-critical/10 text-critical flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,69,96,0.15)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <h3 className="text-xl font-serif text-critical mb-2">Scan Execution Failed</h3>
                    <div className="bg-surface-0 border border-border/50 text-text-secondary font-mono text-[13px] p-4 rounded-md max-w-md text-left w-full break-words">
                      {result.error}
                    </div>
                    <button onClick={() => setResult(null)} className="mt-6 text-[13px] text-text-muted hover:text-text-primary transition-colors">
                      ← Clear Output
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="font-mono text-[13px] text-text-primary mb-6">
                      <span className="text-brand">$</span> spectra scan main.{language}
                    </div>

                    {(!result.findings || result.findings.length === 0) ? (
                      <div className="flex items-center gap-3 text-safe font-mono text-[14px] bg-safe/10 border border-safe/20 p-4 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        No vulnerable cryptography detected. Architecture is quantum-safe.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {result.findings.map((f: any, i: number) => (
                          <div key={i} className="flex gap-4 font-mono text-[13px] opacity-0 animate-[finding-emerge_300ms_var(--ease-spectra)_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
                            <div className={`font-bold w-20 shrink-0 ${getRiskColor(f.risk_band)}`}>
                              {f.risk_band}
                            </div>
                            <div className="flex-1 bg-surface-1/30 p-3 rounded border border-border/30">
                              <div className="text-text-primary font-bold mb-1 flex justify-between">
                                <span>{f.algorithm} {f.key_size > 0 && `(${f.key_size}-bit)`}</span>
                                <span className={`${getRiskColor(f.risk_band)}`}>QRS: {f.qrs}</span>
                              </div>
                              <div className="text-text-secondary whitespace-pre-wrap text-[12px] bg-surface-0/50 p-2 rounded mt-2 border border-border/20">
                                {f.line_content.trim()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Summary Bar */}
                    <div className="mt-8 border border-border/80 bg-surface-1/80 p-5 rounded-lg font-mono text-[13px] opacity-0 animate-[finding-emerge_300ms_var(--ease-spectra)_forwards] shadow-lg" style={{ animationDelay: `${(result.findings?.length || 0) * 60 + 100}ms` }}>
                      <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-3">
                        <div className="text-text-primary font-medium">
                          Aggregate Risk Score
                        </div>
                        <div className="qrs-materialize font-bold text-critical text-[16px]">
                          {result.aggregate_qrs || 0}/100
                        </div>
                      </div>
                      <div className="flex justify-between text-text-secondary text-[12px]">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-critical"></span>{result.findings_by_band?.CRITICAL || 0} Critical</div>
                          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-high"></span>{result.findings_by_band?.HIGH || 0} High</div>
                          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-medium"></span>{result.findings_by_band?.MEDIUM || 0} Medium</div>
                        </div>
                        <div>
                          CBOM Generated
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
