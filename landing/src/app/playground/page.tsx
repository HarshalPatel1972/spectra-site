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
          setResult({ error: 'WASM module not loaded yet' })
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
    } catch (e) {
      console.error(e)
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
      
      {/* Scan Reveal Animation Line */}
      <div className="scan-reveal-line" />
      
      <div className="scan-reveal-content flex flex-col min-h-screen">
        <header className="border-b border-border h-16 px-8 flex items-center justify-between bg-void shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-text-secondary font-mono text-[14px] ml-4">/ playground</span>
          </Link>
          <div className="flex gap-4">
            <select 
              className="appearance-none bg-surface-1 border border-border text-[14px] font-sans text-text-primary px-4 py-1 focus:outline-none focus:border-brand transition-colors"
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
            <div className="flex bg-surface-1 border border-border">
              <button 
                onClick={() => setMode('server')}
                className={`px-4 py-1 text-[13px] font-sans transition-colors ${mode === 'server' ? 'bg-surface-2 text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Server
              </button>
              <button 
                onClick={() => setMode('wasm')}
                className={`px-4 py-1 text-[13px] font-sans transition-colors ${mode === 'wasm' ? 'bg-surface-2 text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                WASM
              </button>
            </div>
            <button 
              onClick={handleScan}
              disabled={isScanning || (mode === 'wasm' && !wasmReady)}
              className="bg-brand hover:bg-brand-dim text-text-inverse px-6 py-1 font-sans font-medium text-[13px] transition-colors disabled:opacity-50"
            >
              {isScanning ? 'Scanning...' : 'Scan Code'}
            </button>
          </div>
        </header>

        <div className="flex-1 grid lg:grid-cols-2 min-h-0">
          {/* Editor Panel */}
          <div className="border-r border-border flex flex-col min-h-0 bg-surface-0">
            <div className="flex-1 overflow-auto">
              <CodeMirror
                value={code}
                height="100%"
                theme="dark"
                extensions={[getLangExtension()]}
                onChange={(val) => setCode(val)}
                className="h-full text-[14px] font-mono"
              />
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-void flex flex-col min-h-0">
            <div className="flex-1 p-8 overflow-auto">
              {!result ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted font-mono text-[14px]">
                  <div className="mb-4">Ready to scan.</div>
                </div>
              ) : result.error ? (
                <div className="text-critical border border-critical/30 bg-critical/10 p-4 font-mono text-[14px]">
                  [ERROR] {result.error}
                </div>
              ) : (
                <div className="space-y-8">
                  {(!result.findings || result.findings.length === 0) ? (
                    <div className="text-safe font-mono text-[14px]">
                      No vulnerable cryptography detected.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {result.findings.map((f: any, i: number) => (
                        <div key={i} className="flex gap-4 font-mono text-[13px] opacity-0 animate-[finding-emerge_300ms_var(--ease-spectra)_forwards]" style={{ animationDelay: `${i * 60}ms` }}>
                          <div className={`font-bold w-20 shrink-0 ${getRiskColor(f.risk_band)}`}>
                            {f.risk_band}
                          </div>
                          <div className="flex-1">
                            <div className="text-text-primary font-bold">{f.algorithm} {f.key_size > 0 && `(${f.key_size}-bit)`}</div>
                            <div className="text-text-secondary whitespace-pre">
                              {f.line_content.trim()}
                            </div>
                          </div>
                          <div className={`shrink-0 ${getRiskColor(f.risk_band)}`}>
                            QRS: {f.qrs}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary Bar */}
                  <div className="mt-8 border border-border bg-surface-1 p-4 font-mono text-[13px] flex items-center justify-between opacity-0 animate-[finding-emerge_300ms_var(--ease-spectra)_forwards]" style={{ animationDelay: `${(result.findings?.length || 0) * 60 + 100}ms` }}>
                    <div className="text-text-primary">
                      Aggregate QRS: <span className="qrs-materialize font-bold text-critical ml-2">{result.aggregate_qrs || 0}/100</span>
                    </div>
                    <div className="flex gap-6 text-text-secondary">
                      <div><span className="text-critical mr-2">■</span>{result.findings_by_band?.CRITICAL || 0}</div>
                      <div><span className="text-high mr-2">■</span>{result.findings_by_band?.HIGH || 0}</div>
                      <div><span className="text-medium mr-2">■</span>{result.findings_by_band?.MEDIUM || 0}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
