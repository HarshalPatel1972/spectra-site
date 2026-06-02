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
        WebAssembly.instantiateStreaming(fetch('/spectra.wasm'), go.importObject).then((result) => {
          go.run(result.instance)
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
        const jsonStr = (window as any).scanSpectra(code, language, \`test.\${language}\`)
        setResult(JSON.parse(jsonStr))
      } else {
        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, language, filename: \`test.\${language}\` })
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
    <div className="min-h-screen flex flex-col bg-void text-surface font-sans">
      <header className="border-b border-border-dark px-8 h-16 flex items-center justify-between bg-void">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-graphite font-mono text-[14px] ml-4">/ playground</span>
        </Link>
        <div className="flex bg-obsidian rounded-sm p-1 border border-border-dark">
          <button 
            onClick={() => setMode('server')}
            className={\`px-4 py-1 text-[14px] font-sans transition-colors \${mode === 'server' ? 'bg-calibration text-surface' : 'text-graphite hover:text-surface'}\`}
          >
            Server
          </button>
          <button 
            onClick={() => setMode('wasm')}
            className={\`px-4 py-1 text-[14px] font-sans transition-colors \${mode === 'wasm' ? 'bg-calibration text-surface' : 'text-graphite hover:text-surface'}\`}
          >
            WASM
          </button>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2">
        {/* Editor Panel */}
        <div className="border-r border-border-dark flex flex-col">
          <div className="p-4 bg-void border-b border-border-dark flex justify-between items-center">
            <select 
              className="appearance-none bg-obsidian border border-border-dark text-[14px] font-sans text-surface px-4 py-2 focus:outline-none focus:border-calibration transition-colors"
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
            <button 
              onClick={handleScan}
              disabled={isScanning || (mode === 'wasm' && !wasmReady)}
              className="bg-calibration hover:bg-calibration-light text-surface px-8 py-2 font-sans font-medium text-[14px] transition-colors disabled:opacity-50"
            >
              {isScanning ? 'Scanning...' : 'Scan Code'}
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-[#07080A]">
            <CodeMirror
              value={code}
              height="100%"
              theme="dark"
              extensions={[getLangExtension()]}
              onChange={(val) => setCode(val)}
              className="h-full text-[14px] font-mono"
            />
          </div>
          <div className="p-4 bg-obsidian text-[14px] text-graphite border-t border-border-dark">
            {mode === 'server' ? (
              'Server Mode: Scan executes remotely. No telemetry retained.'
            ) : (
              <span className="text-safe">WASM Mode: Cryptographic analysis executes entirely within local browser context.</span>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-obsidian flex flex-col">
          <div className="p-4 bg-void border-b border-border-dark text-[14px] text-graphite uppercase tracking-widest font-mono">
            Analysis Results
          </div>
          <div className="flex-1 p-8 overflow-auto">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-graphite font-mono text-[14px]">
                <div className="mb-4">Ready to scan.</div>
              </div>
            ) : result.error ? (
              <div className="text-critical border border-critical/30 bg-critical/10 p-4 font-mono text-[14px]">
                [ERROR] {result.error}
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex justify-between items-end pb-8 border-b border-border-dark">
                  <div>
                    <div className="text-[14px] text-graphite uppercase tracking-widest mb-2 font-mono">Aggregate QRS</div>
                    <div className="font-mono text-[61px] leading-none text-surface">
                      {result.aggregate_qrs || 0}<span className="text-[31px] text-graphite">/100</span>
                    </div>
                  </div>
                  <div className={\`font-mono text-[14px] uppercase tracking-widest \${
                    (result.aggregate_qrs || 0) >= 80 ? 'text-critical' :
                    (result.aggregate_qrs || 0) >= 60 ? 'text-high' :
                    (result.aggregate_qrs || 0) >= 40 ? 'text-medium' :
                    'text-safe'
                  }\`}>
                    — {(result.aggregate_qrs || 0) >= 80 ? 'CRITICAL' : (result.aggregate_qrs || 0) >= 60 ? 'HIGH' : (result.aggregate_qrs || 0) >= 40 ? 'MEDIUM' : 'SAFE'}
                  </div>
                </div>

                {(!result.findings || result.findings.length === 0) ? (
                  <div className="text-safe font-mono text-[14px]">
                    No vulnerable cryptography detected. QRS: 0/100.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {result.findings.map((f: any, i: number) => (
                      <div key={i} className="border border-border-dark p-6 bg-void opacity-0 animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_forwards]" style={{ animationDelay: \`\${i * 60}ms\` }}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <span className="font-sans font-semibold text-surface text-[16px]">{f.algorithm}</span>
                            {f.key_size > 0 && <span className="font-mono text-[12px] text-graphite bg-obsidian px-2 py-1">{f.key_size}-bit</span>}
                          </div>
                          <span className={\`font-mono text-[14px] \${getRiskColor(f.risk_band)}\`}>
                            QRS: {f.qrs}
                          </span>
                        </div>
                        <div className="font-mono text-[14px] text-surface bg-obsidian p-4 mb-4 overflow-x-auto whitespace-pre border border-border-dark">
                          {f.line_content.trim()}
                        </div>
                        <div className="font-sans text-[14px] text-graphite">
                          <span className="text-calibration mr-2">Migration Effort:</span>
                          {f.migration_effort} — {f.effort_rationale}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
