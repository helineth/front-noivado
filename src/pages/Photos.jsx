import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCamera, FaFolder } from 'react-icons/fa'
import GoldDivider from '../components/GoldDivider'

const API = '/api'

function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-navy-800 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: 'easeOut' }}
      />
    </div>
  )
}

function PhotoCard({ photo, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
      return
    }
    setDeleting(true)
    try {
      await fetch(`${API}/photos/${photo.filename}`, { method: 'DELETE' })
      onDelete(photo.filename)
    } catch {
      setDeleting(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3 }}
      className="relative group aspect-square overflow-hidden rounded-xl border border-gold-500/15"
    >
      <img
        src={photo.url}
        alt={photo.filename}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/50 transition-all duration-300" />
      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 ${
          confirmDelete
            ? 'bg-red-600/90 text-white scale-110'
            : 'bg-navy-900/80 text-gold-400 hover:bg-red-600/80 hover:text-white'
        }`}
        title={confirmDelete ? 'Clica de novo para confirmar' : 'Apagar foto'}
      >
        {deleting ? '…' : confirmDelete ? '!' : '×'}
      </button>
      {/* Size badge */}
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-sans text-[9px] text-gold-300/60 bg-navy-900/70 px-1.5 py-0.5 rounded">
          {(photo.size / 1024 / 1024).toFixed(1)} MB
        </span>
      </div>
    </motion.div>
  )
}

export default function Photos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploads, setUploads] = useState([])

  const fetchPhotos = async () => {
/*     try {
      const res = await fetch(`${API}/photos`)
      if (!res.ok) throw new Error('Erro ao carregar fotos')
      const data = await res.json()
      setPhotos(data)
    } catch (e) {
      setError('Backend não disponível. Inicia o servidor NestJS (porta 3001).')
    } finally {
      setLoading(false)
    } */
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const uploadFile = async (file) => {
    const id = `${Date.now()}-${Math.random()}`
    setUploads((prev) => [
      ...prev,
      { id, name: file.name, progress: 0, status: 'uploading' },
    ])

    const formData = new FormData()
    formData.append('file', file)

    try {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `${API}/photos/upload`)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100)
          setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, progress: pct } : u))
          )
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const newPhoto = JSON.parse(xhr.responseText)
          setPhotos((prev) => [
            {
              filename: newPhoto.filename,
              url: newPhoto.url,
              size: newPhoto.size,
              uploadedAt: new Date().toISOString(),
            },
            ...prev,
          ])
          setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, progress: 100, status: 'done' } : u))
          )
          setTimeout(() => {
            setUploads((prev) => prev.filter((u) => u.id !== id))
          }, 2000)
        } else {
          setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, status: 'error' } : u))
          )
        }
      }

      xhr.onerror = () => {
        setUploads((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: 'error' } : u))
        )
      }

      xhr.send(formData)
    } catch {
      setUploads((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: 'error' } : u))
      )
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => uploadFile(file))
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 15 * 1024 * 1024,
    multiple: true,
  })

  const handleDelete = (filename) => {
    setPhotos((prev) => prev.filter((p) => p.filename !== filename))
  }

  return (
    <main className="relative min-h-screen pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900 -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 pt-6"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-500/60 mb-4">
            Momentos partilhados
          </p>
          <h2 className="font-script text-5xl sm:text-6xl  mb-4">Galeria</h2>
          <GoldDivider className="mt-2" />
          <p className="font-serif italic text-gold-300/60 text-sm mt-5 max-w-sm mx-auto">
            Partilha os teus momentos desta noite especial. As fotos ficam guardadas para sempre.
          </p>
        </motion.div>

        {/* Dropzone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-gold-400 bg-gold-500/10'
                : 'border-gold-500/25 bg-navy-800/30 hover:border-gold-500/50 hover:bg-navy-800/50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-4xl mb-4 text-center align-items-center justify-items-center">
              {isDragActive ? <FaFolder /> : <FaCamera />}
            </div>
            <p className="font-serif text-gold-300 text-lg mb-2">
              {isDragActive ? 'Larga as fotos aqui…' : 'Arrasta fotos ou clica para seleccionar'}
            </p>
            <p className="font-sans text-xs text-gold-500/50 tracking-wide">
              PNG, JPG, WEBP · Máximo 15 MB por ficheiro
            </p>
          </div>

          {/* Upload progress list */}
          <AnimatePresence>
            {uploads.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2 overflow-hidden"
              >
                {uploads.map((u) => (
                  <div key={u.id} className="glass-card p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans text-xs text-gold-300/80 truncate max-w-[70%]">
                        {u.name}
                      </span>
                      <span
                        className={`font-sans text-[10px] uppercase tracking-wider ${
                          u.status === 'done'
                            ? 'text-green-400'
                            : u.status === 'error'
                            ? 'text-red-400'
                            : 'text-gold-500'
                        }`}
                      >
                        {u.status === 'done'
                          ? 'Concluído'
                          : u.status === 'error'
                          ? 'Erro'
                          : `${u.progress}%`}
                      </span>
                    </div>
                    {u.status === 'uploading' && <ProgressBar progress={u.progress} />}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Gallery */}
        {loading ? (
          <div className="text-center py-16">
         {/*    <div className="font-sans text-gold-500/50 text-sm tracking-wider">
              A carregar galeria…
            </div> */}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 text-center"
          >
            <div className="text-3xl mb-3">⚠️</div>
            <p className="font-serif text-gold-300/70 text-sm">{error}</p>
            <button
              onClick={fetchPhotos}
              className="mt-4 px-6 py-2 border border-gold-500/30 text-gold-400 font-sans text-xs tracking-widest uppercase hover:bg-gold-500/10 transition-all"
            >
              Tentar novamente
            </button>
          </motion.div>
        ) : photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-4">🌹</div>
            <p className="font-serif italic text-gold-300/50 text-base">
              Ainda não há fotos. Sê o primeiro a partilhar um momento!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-sans text-xs tracking-widest uppercase text-gold-500/40 text-center mb-6">
              {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <AnimatePresence>
                {photos.map((photo) => (
                  <PhotoCard key={photo.filename} photo={photo} onDelete={handleDelete} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
