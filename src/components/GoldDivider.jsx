export default function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rotate-45 bg-gold-500/60" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gold-500/80" />
        <div className="w-1 h-1 rotate-45 bg-gold-500/60" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
    </div>
  )
}
