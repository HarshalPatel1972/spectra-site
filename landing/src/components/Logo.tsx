'use client'

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 5-bar spectrograph mark */}
      <div className="flex items-end gap-[3px] h-[20px]">
        <span className="block w-[2px] h-[8px] rounded-[1px] bg-text-secondary" />
        <span className="block w-[2px] h-[12px] rounded-[1px] bg-text-secondary" />
        <span className="block w-[2px] h-[20px] rounded-[1px] bg-accent animate-[pulse_3s_ease-in-out_infinite]" />
        <span className="block w-[2px] h-[15px] rounded-[1px] bg-text-secondary" />
        <span className="block w-[2px] h-[10px] rounded-[1px] bg-text-secondary" />
      </div>
      {/* Wordmark */}
      <span
        className="font-heading font-[800] text-[1.1rem] tracking-[0.06em] uppercase text-text-primary leading-normal py-1"
      >
        SPECTRA
      </span>
    </div>
  )
}
