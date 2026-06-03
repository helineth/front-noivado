import RoseImage from '../assets/pngegg.png'

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
      <img src={RoseImage} alt="" className="w-full h-full object-contain" />
    </div>
  )
}
