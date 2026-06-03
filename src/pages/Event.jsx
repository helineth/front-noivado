import { motion } from 'framer-motion'
import { VscMusic } from "react-icons/vsc";
import { FaPrayingHands, FaUtensils, FaCoffee, FaBirthdayCake, FaDoorOpen, FaCamera, FaMoon } from 'react-icons/fa'
import GoldDivider from '../components/GoldDivider'
import { GiRose, GiPartyPopper } from 'react-icons/gi'

const timeline = [
  {
    time: '16:00 – 17:45',
    title: 'Conversa entre as famílias',
    description:
      'Acolhimento formal, apresentação das famílias, partilha de intenções e alinhamento do noivado.',
    icon: FaPrayingHands,
  },
  {
    time: '17:45 – 18:00',
    title: 'Coffee break',
    description: 'Momento leve de convívio.',
    icon: FaCoffee,
  },
  {
    time: '18:00 – 18:20',
    title: 'Corte do bolo',
    description:
      'Momento simbólico realizado antes da entrada no salão, marcando a passagem para a celebração oficial.',
    icon: FaBirthdayCake,
  },
  {
    time: '18:30',
    title: 'Abertura oficial / Entrada no salão',
    description:
      'A cerimónia oficial começa com a entrada dos noivos no salão, convidando todos para a celebração.',
    icon: FaDoorOpen,
  },
  {
    time: '18:35 – 18:50',
    title: 'Momento de dança inicial',
    description:
      'Primeira dança do casal e interação com os convidados.',
    icon: VscMusic,
  },
  {
    time: '18:50 – 20:00',
    title: 'Abertura do Buffet',
    description:
      'Serviço e refeição para os convidados, ambiente mais calmo e social.',
    icon: FaUtensils,
  },
  {
    time: '20:00 – 21:00',
    title: 'Sessão de fotos',
    description:
      'Registo fotográfico com famílias, convidados e noivos.',
    icon: FaCamera,
  },
  {
    time: '21:00 em diante',
    title: 'Abertura da pista de dança',
    description: 'Momento de festa, dança e convívio geral.',
    icon: GiPartyPopper,
  },
  {
    time: '07:00',
    title: 'Encerramento oficial do evento',
    description: 'Finalização do evento.',
    icon: FaMoon,
  },
]

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Event() {
  return (
    <main className="relative min-h-screen pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900 -z-10" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 pt-6"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60 mb-4">
            06 de Junho de 2026
          </p>
          <h2 className="font-script text-5xl sm:text-6xl  mb-4">O Evento</h2>
          <GoldDivider className="mt-2" />
        </motion.div>

        {/* Poetic description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-center mb-14 max-w-xl mx-auto"
        >
          <p className="font-serif italic text-gold-300/80 text-base sm:text-lg leading-relaxed mb-4">
            "Duas almas que encontraram o seu caminho uma na outra. Nesta noite de amor e promessas,
            Juvial e Rosa iniciam a mais bela jornada — a de construírem juntos o seu para sempre."
          </p>
          <p className="font-sans text-xs tracking-widest uppercase text-gold-500/50">
            Don Gal Hotel · Luanda · Angola
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />

          {timeline.map((item, index) => {
            const isRight = index % 2 !== 0
            return (
              <motion.div
                key={item.time}
                variants={itemVariants}
                className={`relative flex gap-4 mb-8 sm:mb-10 ${
                  isRight ? 'sm:flex-row-reverse' : 'sm:flex-row'
                } items-start`}
              >
                {/* Mobile / small layout: icon left, content right */}
                {/* Icon dot — centered on line for sm+, left-aligned for mobile */}
                <div className="relative z-10 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-1">
                  <div className="w-14 h-14 glass-card flex flex-col items-center justify-center border-gold-500/30">
                    <item.icon className="text-xl" />
                {/*     <span className="font-sans text-[9px] text-gold-500 tracking-wider mt-0.5">
                      {item.time}
                    </span> */}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 glass-card p-4 sm:p-5 ml-2 sm:ml-0 ${
                    isRight ? 'sm:mr-[calc(50%+2rem)]' : 'sm:ml-[calc(50%+2rem)]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-500">
                      {item.time}
                    </span>
                    <div className="flex-1 h-px bg-gold-500/20" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-gold-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-gold-300/65 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-10"
        >
          <GoldDivider />
          <p className="font-serif italic text-gold-500/50 text-sm mt-6">
            Contamos com a vossa presença nesta noite especial.
          </p>
          <p className="font-script text-3xl text-gold-shimmer mt-3">Juvial &amp; Rosa</p>
        </motion.div>
      </div>
    </main>
  )
}
