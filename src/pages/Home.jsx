import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import RoseDecoration from '../components/RoseDecoration'
import GoldDivider from '../components/GoldDivider'

// Angola Western Africa Time = UTC+1 → ISO string
const TARGET = new Date('2026-06-06T18:30:00+01:00')

function useCountdown() {
  const calculate = () => {
    const diff = TARGET - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculate)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2">
        <span className="font-sans font-light text-2xl sm:text-3xl text-gold-shimmer tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-500/60">
        {label}
      </span>
    </div>
  )
}

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
}
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 -z-10" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Rose corner decorations */}
      <RoseDecoration position="top-left" />
      <RoseDecoration position="top-right" />
      <RoseDecoration position="bottom-left" className="hidden sm:block" />
      <RoseDecoration position="bottom-right" className="hidden sm:block" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center text-center px-4 pt-24 pb-20 w-full max-w-2xl mx-auto"
      >
        {/* Invitation phrase */}
        <motion.p
          variants={fadeUp}
          className="font-serif italic text-gold-500 text-sm sm:text-base tracking-[0.25em] uppercase mb-8"
        >
          Com amor, iniciamos o nosso para sempre
        </motion.p>

        <motion.div variants={fadeUp}>
          <GoldDivider />
        </motion.div>

        {/* Names */}
        <motion.div variants={fadeUp} className="my-10">
          <h1 className="font-script leading-none">
            <span className="block text-[5rem] sm:text-[7rem] md:text-[8rem] text-gold-shimmer">
              Juvial
            </span>
            <span className="block font-serif italic text-xl sm:text-2xl text-gold-500/60 tracking-[0.5em] my-2">
              &amp;
            </span>
            <span className="block text-[5rem] sm:text-[7rem] md:text-[8rem] text-gold-shimmer">
              Rosa
            </span>
          </h1>
        </motion.div>

        <motion.div variants={fadeUp}>
          <GoldDivider />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-300/70 mt-8 mb-10"
        >
          Noivado · 06 de Junho de 2026 · 18h30
        </motion.p>

        {/* Info cards */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-3 w-full max-w-sm mb-12"
        >
          {[
            { label: 'Local', value: 'Don Gal Hotel' },
            { label: 'Data', value: '06 Jun 2026' },
            { label: 'Hora', value: '18:30' },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card p-3 text-center">
              <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold-500 mb-1">
                {label}
              </div>
              <div className="font-serif text-xs sm:text-sm text-gold-200">{value}</div>
            </div>
          ))}
        </motion.div>

        {/* Countdown */}
        <motion.div variants={fadeUp} className="mb-12">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-500/50 mb-5">
            Faltam
          </p>
          <div className="flex items-start gap-3 sm:gap-5 justify-center">
            <CountUnit value={days} label="Dias" />
            <span className="text-gold-500/40 text-2xl font-light mt-3">:</span>
            <CountUnit value={hours} label="Horas" />
            <span className="text-gold-500/40 text-2xl font-light mt-3">:</span>
            <CountUnit value={minutes} label="Min" />
            <span className="text-gold-500/40 text-2xl font-light mt-3">:</span>
            <CountUnit value={seconds} label="Seg" />
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/evento"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gold-500/50 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300"
          >
            Ver Programa
          </Link>
          <Link
            to="/localizacao"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold-500/10 border border-gold-500/30 text-gold-300 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500/20 transition-all duration-300"
          >
            Como Chegar
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
