import { Shield, Clock, Wrench, Code2, Users } from 'lucide-react'
import Link from 'next/link'

export default function CompareDIYPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold mb-12">
          &larr; Back to Spectra
        </Link>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <Code2 className="w-12 h-12 text-slate-500" />
            <span className="text-4xl text-slate-600 font-light">vs</span>
            <Shield className="w-12 h-12 text-indigo-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Spectra vs. Building Your Own Scanner</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A senior engineering team can absolutely build a basic cryptographic scanner. 
            The question isn't whether you <em>can</em>, but whether you <em>should</em>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Wrench className="w-6 h-6 text-slate-400" /> The DIY Route
            </h2>
            <ul className="space-y-4 text-slate-400">
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-red-400 shrink-0" />
                <span><strong>2-6 months</strong> of dedicated senior engineering time to build AST parsers and regex libraries.</span>
              </li>
              <li className="flex gap-3">
                <XIcon className="w-5 h-5 text-red-400 shrink-0" />
                <span><strong>Ongoing maintenance</strong> as new cryptographic APIs and patterns emerge in the wild.</span>
              </li>
              <li className="flex gap-3">
                <XIcon className="w-5 h-5 text-red-400 shrink-0" />
                <span><strong>No standards compliance.</strong> You have to write your own CycloneDX CBOM serializer.</span>
              </li>
              <li className="flex gap-3">
                <XIcon className="w-5 h-5 text-red-400 shrink-0" />
                <span><strong>Isolated knowledge.</strong> Your internal scanner doesn't benefit from the collective discovery of new patterns.</span>
              </li>
            </ul>
          </div>

          <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="w-32 h-32" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
              <Shield className="w-6 h-6 text-indigo-400" /> Spectra
            </h2>
            <ul className="space-y-4 text-indigo-100 relative z-10">
              <li className="flex gap-3">
                <CheckIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span><strong>90 seconds</strong> to install and run your first full discovery scan.</span>
              </li>
              <li className="flex gap-3">
                <CheckIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span><strong>Community-maintained patterns.</strong> When a new vulnerable pattern is found, the whole community gets the update.</span>
              </li>
              <li className="flex gap-3">
                <CheckIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span><strong>Native CBOM.</strong> Fully compliant CycloneDX 1.7 generation out of the box.</span>
              </li>
              <li className="flex gap-3">
                <CheckIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span><strong>Embedded Intelligence.</strong> Built-in QRS scoring and CNSA 2.0 regulatory cross-referencing.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/playground" className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all">
            See the Difference in the Playground
          </Link>
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
}

function XIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
}
