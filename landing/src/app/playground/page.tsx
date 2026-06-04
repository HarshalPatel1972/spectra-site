'use client'

import { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { go } from '@codemirror/lang-go'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { Footer } from '@/components/Footer'
import { GlobeWireframe } from '@/components/GlobeWireframe'

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
  const [mode, setMode] = useState<'server' | 'wasm'>('wasm')
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

  return (
    <div className="min-h-screen flex flex-col bg-void text-text-primary relative overflow-hidden">
      
      <GlobeWireframe className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.05] pointer-events-none text-text-primary z-0" />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 flex flex-col min-h-0 relative z-10">
        
        <div className="mb-12 text-center max-w-[700px] mx-auto">
          <h1 className="display-xl mb-6">SPECTRA<br/><span className="text-accent">PLAYGROUND</span></h1>
          <p className="text-text-secondary text-[var(--body-lg)] leading-[1.6]">
            Write, paste, or select an example implementation below. The Spectra engine will parse the AST, identify cryptographic primitives, and calculate the exact Quantum Risk Score in milliseconds.
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[600px]">
          {/* Editor Window */}
          <div className="flex flex-col bg-raised border border-border rounded-[var(--radius-lg)] overflow-hidden min-h-[400px] lg:min-h-0">
            <div className="h-12 bg-high border-b border-border flex items-center justify-between px-4 shrink-0 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span className="font-mono text-[var(--body-xs)] text-text-secondary">main.{language}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex bg-void border border-border rounded-[var(--radius-sm)] p-1 mr-2 hidden sm:flex">
                  <button 
                    onClick={() => setMode('server')}
                    className={`px-3 py-1 text-[0.65rem] font-mono rounded-[var(--radius-sm)] uppercase transition-colors ${mode === 'server' ? 'bg-raised text-text-primary border border-border' : 'text-text-muted hover:text-text-secondary border border-transparent'}`}
                  >Server</button>
                  <button 
                    onClick={() => setMode('wasm')}
                    className={`px-3 py-1 text-[0.65rem] font-mono rounded-[var(--radius-sm)] uppercase transition-colors ${mode === 'wasm' ? 'bg-raised text-accent border border-[rgba(46,196,196,0.2)]' : 'text-text-muted hover:text-text-secondary border border-transparent'}`}
                  >WASM</button>
                </div>

                <select 
                  value={language}
                  onChange={(e) => {
                    const lang = e.target.value as 'go' | 'python' | 'java';
                    setLanguage(lang);
                    setCode(EXAMPLES[lang].code);
                    setResult(null);
                  }}
                  className="bg-void border border-border text-text-secondary font-mono text-[var(--body-xs)] px-2 py-[6px] rounded-[var(--radius-sm)] outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option value="go">Go</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                
                <button 
                  onClick={handleScan}
                  disabled={isScanning || (mode === 'wasm' && !wasmReady)}
                  className="btn-primary !py-[6px] !px-3 !text-[var(--body-xs)] !rounded-[var(--radius-sm)] flex items-center gap-2 disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-text-on-accent"></span>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      Run
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-void">
              <CodeMirror
                value={code}
                height="100%"
                theme="dark"
                extensions={[getLangExtension()]}
                onChange={(val) => setCode(val)}
                className="h-full font-mono text-[var(--code-sm)]"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          </div>

          {/* Results Terminal Window */}
          <div className="terminal flex flex-col relative min-h-[400px] lg:min-h-0 h-full">
            <div className="terminal-titlebar shrink-0">
              <div className="traffic-lights">
                <div className="traffic-light red" />
                <div className="traffic-light amber" />
                <div className="traffic-light green" />
              </div>
            </div>

            <div className="terminal-body flex-1 overflow-auto relative">
              {!result ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-60">
                  <div className="w-16 h-16 mb-4 text-accent opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </div>
                  <h3 className="font-heading text-[var(--heading-md)] text-text-primary mb-2">Analysis Engine Idle</h3>
                  <p className="text-text-secondary text-[var(--body-sm)] max-w-sm">
                    Select an example from the dropdown or paste your own cryptographic implementation to begin.
                  </p>
                </div>
              ) : result.error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-12 h-12 rounded-[var(--radius-full)] bg-[rgba(255,69,96,0.1)] text-critical flex items-center justify-center mb-4 border border-[rgba(255,69,96,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  </div>
                  <h3 className="font-heading text-[var(--heading-md)] text-critical mb-2">Scan Execution Failed</h3>
                  <div className="bg-raised border border-border text-text-secondary font-mono text-[var(--code-sm)] p-4 rounded-[var(--radius-md)] max-w-md text-left w-full break-words">
                    {result.error}
                  </div>
                  <button onClick={() => setResult(null)} className="mt-6 font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-text-muted hover:text-text-primary transition-colors">
                    ← Clear Output
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="font-mono text-[var(--code-md)] text-text-primary mb-6">
                    <span className="text-accent">$</span> spectra scan main.{language}
                  </div>

                  {(!result.findings || result.findings.length === 0) ? (
                    <div className="flex items-center gap-3 text-safe font-mono text-[var(--code-sm)] bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] p-4 rounded-[var(--radius-md)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      No vulnerable cryptography detected. Architecture is quantum-safe.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {result.findings.map((f: any, i: number) => {
                        let badgeBg = 'bg-[rgba(255,69,96,0.15)] text-critical';
                        if (f.risk_band === 'HIGH') badgeBg = 'bg-[rgba(255,143,64,0.15)] text-high-risk';
                        if (f.risk_band === 'MEDIUM') badgeBg = 'bg-[rgba(245,200,66,0.15)] text-medium';
                        if (f.risk_band === 'LOW') badgeBg = 'bg-[rgba(16,185,129,0.15)] text-safe';
                        
                        return (
                          <div key={i} className="flex gap-4 opacity-0 animate-[type-in_0.4s_ease-out_forwards]" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex-1 bg-[var(--color-void)] p-4 rounded-[var(--radius-md)] border border-border">
                              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                <div className="flex items-center gap-3">
                                  <span className={`inline-block px-[10px] py-[3px] rounded-[var(--radius-pill)] font-mono text-[0.65rem] font-bold tracking-[0.06em] uppercase ${badgeBg}`}>
                                    {f.risk_band}
                                  </span>
                                  <span className="font-mono text-[var(--code-sm)] text-text-primary font-bold">
                                    {f.algorithm} {f.key_size > 0 && `(${f.key_size}-bit)`}
                                  </span>
                                </div>
                                <span className={`font-mono text-[var(--code-sm)] font-bold ${badgeBg.split(' ')[1]}`}>
                                  QRS: {f.qrs}
                                </span>
                              </div>
                              <div className="text-text-muted font-mono text-[var(--code-sm)] bg-void p-3 rounded-[var(--radius-sm)] border border-border overflow-x-auto whitespace-pre">
                                {f.line_content.trim()}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Summary Bar */}
                  {result.findings && result.findings.length > 0 && (
                    <div className="mt-8 border border-border bg-high p-6 rounded-[var(--radius-lg)] opacity-0 animate-[float_1s_ease-out_forwards]" style={{ animationDelay: `${(result.findings?.length || 0) * 100 + 200}ms` }}>
                      <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                        <div className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-text-secondary">
                          Aggregate Risk Score
                        </div>
                        <div className="font-mono text-[var(--code-md)] font-bold text-critical">
                          {result.aggregate_qrs || 0}/100
                        </div>
                      </div>
                      <div className="flex justify-between flex-wrap gap-4 font-mono text-[var(--code-sm)] text-text-secondary">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-critical"></span>{result.findings_by_band?.CRITICAL || 0} Critical</div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-high-risk"></span>{result.findings_by_band?.HIGH || 0} High</div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-medium"></span>{result.findings_by_band?.MEDIUM || 0} Medium</div>
                        </div>
                        <div>
                          CBOM Generated
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
