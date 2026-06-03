export default function RoseDecoration({ position = 'top-left', className = '' }) {
  const posClass = {
    'top-left': 'top-0 left-0 rotate-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-x-[-1] scale-y-[-1]',
  }[position]

  return (
    <div
      className={`absolute ${posClass} pointer-events-none select-none opacity-70 ${className}`}
      style={{ width: 'min(220px, 40vw)', height: 'min(220px, 40vw)' }}
    >
      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Stem */}
        <path
          d="M70 200 Q80 160 90 130 Q100 100 95 70"
          stroke="#3a6e3a"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* Leaf left */}
        <path
          d="M82 165 Q55 150 50 130 Q65 135 82 165Z"
          fill="#2d5a2d"
          opacity="0.65"
        />
        {/* Leaf right */}
        <path
          d="M88 148 Q115 130 120 110 Q105 120 88 148Z"
          fill="#2d5a2d"
          opacity="0.65"
        />
        {/* Rose petals - outer ring */}
        <ellipse cx="95" cy="55" rx="12" ry="20" fill="#1a3a6e" opacity="0.55" transform="rotate(-15 95 55)" />
        <ellipse cx="112" cy="48" rx="12" ry="20" fill="#1e4080" opacity="0.55" transform="rotate(20 112 48)" />
        <ellipse cx="125" cy="62" rx="12" ry="20" fill="#1a3a6e" opacity="0.55" transform="rotate(55 125 62)" />
        <ellipse cx="120" cy="80" rx="12" ry="20" fill="#1e4080" opacity="0.55" transform="rotate(90 120 80)" />
        <ellipse cx="103" cy="88" rx="12" ry="20" fill="#1a3a6e" opacity="0.55" transform="rotate(130 103 88)" />
        <ellipse cx="85" cy="78" rx="12" ry="20" fill="#1e4080" opacity="0.55" transform="rotate(165 85 78)" />
        <ellipse cx="82" cy="60" rx="12" ry="20" fill="#1a3a6e" opacity="0.55" transform="rotate(200 82 60)" />
        {/* Rose petals - inner ring */}
        <ellipse cx="100" cy="58" rx="9" ry="15" fill="#2a5090" opacity="0.7" transform="rotate(-10 100 58)" />
        <ellipse cx="113" cy="60" rx="9" ry="15" fill="#2a5090" opacity="0.7" transform="rotate(35 113 60)" />
        <ellipse cx="116" cy="74" rx="9" ry="15" fill="#3060a8" opacity="0.7" transform="rotate(80 116 74)" />
        <ellipse cx="104" cy="82" rx="9" ry="15" fill="#2a5090" opacity="0.7" transform="rotate(125 104 82)" />
        <ellipse cx="90" cy="75" rx="9" ry="15" fill="#3060a8" opacity="0.7" transform="rotate(170 90 75)" />
        <ellipse cx="89" cy="61" rx="9" ry="15" fill="#2a5090" opacity="0.7" transform="rotate(215 89 61)" />
        {/* Rose center */}
        <circle cx="103" cy="68" r="10" fill="#1a3060" opacity="0.85" />
        <circle cx="103" cy="68" r="6" fill="#243870" opacity="0.9" />
        <circle cx="103" cy="68" r="3" fill="#c9a84c" opacity="0.6" />
        {/* Gold sparkles */}
        <circle cx="55" cy="45" r="1.5" fill="#c9a84c" opacity="0.5" />
        <circle cx="140" cy="35" r="1" fill="#f5e6c8" opacity="0.4" />
        <circle cx="35" cy="100" r="1.2" fill="#c9a84c" opacity="0.45" />
        <circle cx="150" cy="95" r="1.5" fill="#e8c87a" opacity="0.4" />
        {/* Gold vine tendrils */}
        <path
          d="M60 190 Q40 170 30 140"
          stroke="#c9a84c"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M30 140 Q20 120 35 100"
          stroke="#c9a84c"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
        <circle cx="35" cy="100" r="2" fill="#c9a84c" opacity="0.25" />
      </svg>
    </div>
  )
}
