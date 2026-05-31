'use client'

import { useState } from 'react'
import { Shield, Upload, FileJson, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function CBOMViewerPage() {
  const [cbom, setCbom] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (!json.bomFormat || json.bomFormat !== 'CycloneDX') {
          throw new Error('Invalid format: File must be a CycloneDX CBOM.')
        }
        setCbom(json)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to parse JSON file.')
        setCbom(null)
      }
    }
    reader.readAsText(file)
  }

  // Extract cryptographic components from the CBOM
  const getCryptoComponents = () => {
    if (!cbom || !cbom.components) return []
    return cbom.components.filter((c: any) => c.type === 'cryptographic-asset')
  }

  const components = getCryptoComponents()

  // Calculate Chart data
  const getChartData = () => {
    let critical = 0, high = 0, medium = 0, safe = 0
    components.forEach((c: any) => {
      // Find the QRS property
      const qrsProp = c.properties?.find((p: any) => p.name === 'spectra:qrs')
      const qrs = qrsProp ? parseInt(qrsProp.value, 10) : 0
      
      if (qrs >= 80) critical++
      else if (qrs >= 60) high++
      else if (qrs >= 40) medium++
      else safe++
    })

    return {
      labels: ['Critical Risk', 'High Risk', 'Medium Risk', 'Safe'],
      datasets: [
        {
          data: [critical, high, medium, safe],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)', // red
            'rgba(249, 115, 22, 0.8)', // orange
            'rgba(234, 179, 8, 0.8)', // yellow
            'rgba(16, 185, 129, 0.8)', // emerald
          ],
          borderColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(249, 115, 22, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(16, 185, 129, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-slate-900">
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <Shield className="w-5 h-5 text-indigo-400" />
          Spectra CBOM Viewer
        </Link>
        <div className="text-sm font-medium text-slate-400">CycloneDX 1.7</div>
      </header>

      <main className="flex-1 flex flex-col p-8 max-w-7xl mx-auto w-full">
        {!cbom ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl p-12 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 text-center relative group hover:border-indigo-500 transition-colors">
              <input 
                type="file" 
                accept=".json"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileJson className="w-16 h-16 mx-auto text-slate-500 group-hover:text-indigo-400 transition-colors mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Upload CBOM</h2>
              <p className="text-slate-400 mb-6">Drag and drop your spectra-cbom.json file here.</p>
              <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold inline-flex items-center gap-2 pointer-events-none">
                <Upload className="w-4 h-4" /> Browse Files
              </button>
            </div>
            {error && (
              <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded border border-red-400/20">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">CBOM Analysis</h1>
                <p className="text-slate-400">Found {components.length} cryptographic components.</p>
              </div>
              <button 
                onClick={() => setCbom(null)}
                className="px-4 py-2 rounded border border-slate-700 hover:bg-slate-800 transition-colors text-sm"
              >
                Upload Different File
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Chart */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
                <h3 className="font-bold text-white mb-6">Quantum Risk Distribution</h3>
                <div className="w-64 h-64">
                  <Pie 
                    data={getChartData()} 
                    options={{
                      plugins: {
                        legend: { position: 'bottom', labels: { color: '#94a3b8' } }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center">
                  <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Components</div>
                  <div className="text-5xl font-black text-white">{components.length}</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center">
                  <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">BOM Spec Version</div>
                  <div className="text-3xl font-bold text-indigo-400">{cbom.specVersion}</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/50 text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-bold">Algorithm</th>
                    <th className="px-6 py-4 font-bold">Key Size</th>
                    <th className="px-6 py-4 font-bold">File Location</th>
                    <th className="px-6 py-4 font-bold text-right">QRS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {components.map((c: any, i: number) => {
                    const qrsProp = c.properties?.find((p: any) => p.name === 'spectra:qrs')
                    const qrs = qrsProp ? parseInt(qrsProp.value, 10) : 0
                    const fileProp = c.properties?.find((p: any) => p.name === 'spectra:file')
                    
                    return (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{c.name}</td>
                        <td className="px-6 py-4 text-slate-400">{c.cryptoProperties?.assetProperties?.keySize || 'N/A'}</td>
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{fileProp?.value || 'Unknown'}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex px-2 py-1 rounded font-bold ${
                            qrs >= 80 ? 'bg-red-500/20 text-red-400' :
                            qrs >= 60 ? 'bg-orange-500/20 text-orange-400' :
                            qrs >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {qrs}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
