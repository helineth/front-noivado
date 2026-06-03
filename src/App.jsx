import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Location from './pages/Location'
import Event from './pages/Event'
import Photos from './pages/Photos'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/localizacao"
            element={
              <AnimatedPage>
                <Location />
              </AnimatedPage>
            }
          />
          <Route
            path="/evento"
            element={
              <AnimatedPage>
                <Event />
              </AnimatedPage>
            }
          />
          <Route
            path="/galeria"
            element={
              <AnimatedPage>
                <Photos />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
