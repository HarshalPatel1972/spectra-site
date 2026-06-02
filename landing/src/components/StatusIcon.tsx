export function StatusIcon({ risk, className = "" }: { risk: string, className?: string }) {
  switch (risk.toUpperCase()) {
    case 'CRITICAL':
      return <span className={`text-critical ${className}`}>●</span>;
    case 'HIGH':
      return <span className={`text-high ${className}`}>○</span>;
    case 'MEDIUM':
      return <span className={`text-medium ${className}`}>△</span>;
    case 'LOW':
      return <span className={`text-low ${className}`}>□</span>;
    case 'SAFE':
      return <span className={`text-safe ${className}`}>✓</span>;
    case 'BLOCKED':
      return <span className={`text-blocked ${className}`}>⬡</span>;
    default:
      return <span className={`text-graphite ${className}`}>○</span>;
  }
}
