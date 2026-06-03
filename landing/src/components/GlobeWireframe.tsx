export function GlobeWireframe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer circle */}
      <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="1"/>
      {/* Latitude lines */}
      <ellipse cx="300" cy="300" rx="280" ry="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="300" cy="300" rx="280" ry="120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="300" cy="300" rx="280" ry="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      {/* Longitude lines */}
      <ellipse cx="300" cy="300" rx="60" ry="280" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="300" cy="300" rx="140" ry="280" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="300" cy="300" rx="220" ry="280" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      {/* Center lines */}
      <line x1="300" y1="20" x2="300" y2="580" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <line x1="20" y1="300" x2="580" y2="300" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
    </svg>
  )
}
