'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Logo } from '../../components/Logo'
import { StatusIcon } from '../../components/StatusIcon'

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

  const getCryptoComponents = () => {
    if (!cbom || !cbom.components) return []
    return cbom.components.filter((c: any) => c.type === 'cryptographic-asset')
  }

  const components = getCryptoComponents()

  const getRiskBand = (qrs: number) => {
    if (qrs >= 80) return 'CRITICAL'
    if (qrs >= 60) return 'HIGH'
    if (qrs >= 40) return 'MEDIUM'
    if (qrs > 0) return 'LOW'
    return 'SAFE'
  }

  const getChartData = () => {
    let critical = 0, high = 0, medium = 0, safe = 0
    components.forEach((c: any) => {
      const qrsProp = c.properties?.find((p: any) => p.name === 'spectra:qrs')
      const qrs = qrsProp ? parseInt(qrsProp.value, 10) : 0
      
      if (qrs >= 80) critical++
      else if (qrs >= 60) high++
      else if (qrs >= 40) medium++
      else safe++
    })

    return {
      labels: ['Critical', 'High', 'Medium', 'Safe'],
      datasets: [
        {
          data: [critical, high, medium, safe],
          backgroundColor: ['#EF4444', '#F97316', '#FACC15', '#16A34A'],
          borderColor: ['#07080A', '#07080A', '#07080A', '#07080A'],
          borderWidth: 2,
        },
      ],
    }
  }

  return (
    <div className="min-h-screen bg-void text-surface font-sans flex flex-col">
      

      <main className="flex-1 flex flex-col p-8 max-w-[1200px] mx-auto w-full">
        {!cbom ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl p-16 border border-border-dark bg-obsidian text-center relative group hover:border-calibration transition-colors">
              <input 
                type="file" 
                accept=".json"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="font-serif text-[31px] text-surface mb-2 font-light">Upload CBOM</div>
              <p className="font-sans text-graphite text-[14px] mb-8">Select your spectra-cbom.json file to visualize the cryptographic inventory.</p>
              <button className="px-8 py-3 bg-calibration text-surface font-sans font-medium text-[14px] pointer-events-none">
                Browse Files
              </button>
            </div>
            {error && (
              <div className="mt-8 font-mono text-[14px] text-critical border border-critical/30 bg-critical/10 px-4 py-3">
                [ERROR] {error}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_forwards]">
            <div className="flex justify-between items-end mb-12 border-b border-border-dark pb-8">
              <div>
                <h1 className="font-serif text-[39px] font-light text-surface mb-2">Cryptographic Inventory</h1>
                <p className="font-sans text-graphite text-[14px]">Parsed {components.length} components from {cbom.metadata?.component?.name || 'provided CBOM'}.</p>
              </div>
              <button 
                onClick={() => setCbom(null)}
                className="font-sans text-[14px] text-graphite hover:text-surface transition-colors"
              >
                Upload Different File →
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Chart */}
              <div className="bg-obsidian border border-border-dark p-8 flex flex-col items-center justify-center">
                <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-8">Risk Distribution</div>
                <div className="w-48 h-48">
                  <Pie 
                    data={getChartData()} 
                    options={{
                      plugins: {
                        legend: { position: 'bottom', labels: { color: '#9CA3AF', font: { family: 'JetBrains Mono', size: 10 } } }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-8">
                <div className="bg-obsidian border border-border-dark p-8 flex flex-col justify-center">
                  <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-4">Total Assets</div>
                  <div className="font-mono text-[61px] leading-none text-surface tabular-nums">{components.length}</div>
                </div>
                <div className="bg-obsidian border border-border-dark p-8 flex flex-col justify-center">
                  <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-4">Specification</div>
                  <div className="font-mono text-[31px] text-calibration tabular-nums">{cbom.specVersion}</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-border-dark bg-obsidian">
              <table className="w-full text-left text-[14px] font-sans">
                <thead className="border-b border-border-dark text-graphite">
                  <tr>
                    <th className="px-6 py-4 font-normal">Algorithm</th>
                    <th className="px-6 py-4 font-normal">Key Size</th>
                    <th className="px-6 py-4 font-normal">Location</th>
                    <th className="px-6 py-4 font-normal text-right">Risk Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {components.map((c: any, i: number) => {
                    const qrsProp = c.properties?.find((p: any) => p.name === 'spectra:qrs')
                    const qrs = qrsProp ? parseInt(qrsProp.value, 10) : 0
                    const fileProp = c.properties?.find((p: any) => p.name === 'spectra:file')
                    const riskBand = getRiskBand(qrs)
                    
                    return (
                      <tr key={i} className="hover:bg-[#111218] transition-colors">
                        <td className="px-6 py-4 font-medium text-surface">{c.name}</td>
                        <td className="px-6 py-4 text-graphite tabular-nums">{c.cryptoProperties?.assetProperties?.keySize || '—'}</td>
                        <td className="px-6 py-4 font-mono text-[12px] text-graphite">{fileProp?.value || '—'}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3 font-mono text-[12px] uppercase tracking-widest tabular-nums">
                            <span className="text-surface">QRS {qrs}</span>
                            <StatusIcon risk={riskBand} />
                          </div>
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
