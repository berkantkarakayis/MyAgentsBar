import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 80], [0, 1])

  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 40))
  }, [scrollY])

  const handleDownload = () => {
    const link = document.getElementById('download-section')
    link?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{ opacity: scrolled ? 1 : 1 }}
    >
      <motion.div
        className="absolute inset-0 glass border-b border-white/5"
        style={{ opacity }}
      />

      <div className="relative flex items-center gap-2">
        <img src="/app-icon.png" alt="MyAgentsBar" className="w-7 h-7 rounded-lg shadow-lg" />
        <span className="font-semibold text-white/90 text-sm tracking-tight">MyAgentsBar</span>
      </div>

      <div className="relative hidden md:flex items-center gap-8">
        {['Features', 'Providers', 'How It Works'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm text-white/50 hover:text-white/90 transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </div>

      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative cursor-pointer text-sm font-medium px-5 py-2 rounded-full bg-linear-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow duration-300"
      >
        Download Free
      </motion.button>
    </motion.nav>
  )
}
