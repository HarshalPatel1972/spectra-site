export function Logo({ className = "", withText = true }: { className?: string, withText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* The Emission Spectrum Mark */}
      <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="16" fill="#0A0B0F" />
        {/* SAFE */}
        <rect x="4" y="0" width="1" height="16" fill="#16A34A" />
        {/* LOW */}
        <rect x="10" y="0" width="1" height="16" fill="#22C55E" />
        {/* MEDIUM */}
        <rect x="20" y="0" width="2" height="16" fill="#FACC15" />
        {/* HIGH */}
        <rect x="28" y="0" width="2" height="16" fill="#F97316" />
        {/* HIGH-CRITICAL boundary (Gradient) */}
        <defs>
          <linearGradient id="hc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <rect x="36" y="0" width="3" height="16" fill="url(#hc-grad)" />
        {/* CRITICAL */}
        <rect x="43" y="0" width="3" height="16" fill="#EF4444" />
      </svg>
      
      {/* The Wordmark */}
      {withText && (
        <span className="font-serif text-[18px] tracking-[0.05em] text-ink uppercase">
          SPECTRA
        </span>
      )}
    </div>
  );
}
