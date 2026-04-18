import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Real-Time Tracking',
    description: 'Watch your token consumption update live in the menu bar. No refresh needed, no tab-switching.',
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/5',
    delay: 0,
  },
  {
    icon: '💰',
    title: 'Cost Analytics',
    description: 'Know exactly what you\'re spending. Per-session, daily, and monthly cost breakdowns with smart projections.',
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-teal-500/5',
    delay: 0.1,
  },
  {
    icon: '🔌',
    title: 'Multi-Provider',
    description: 'Claude, Copilot, Cursor, Codex, Gemini, Kimi, MiniMax and more — all unified in one elegant interface.',
    color: '#8b5cf6',
    gradient: 'from-violet-500/20 to-purple-500/5',
    delay: 0.2,
  },
  {
    icon: '📊',
    title: 'Usage History',
    description: 'Beautiful 24-hour timeline charts. See your AI usage patterns, peak times, and productivity trends.',
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-cyan-500/5',
    delay: 0.3,
  },
  {
    icon: '🎯',
    title: 'Plan Utilization',
    description: 'Never hit unexpected limits. Get visual warnings as you approach your plan\'s token ceiling.',
    color: '#ec4899',
    gradient: 'from-pink-500/20 to-rose-500/5',
    delay: 0.4,
  },
  {
    icon: '🔒',
    title: 'Keychain Secure',
    description: 'Your credentials never leave your Mac. OAuth tokens stored securely in macOS Keychain.',
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-sky-500/5',
    delay: 0.5,
  },
]

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-xs text-white/50 tracking-widest uppercase">Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Built for AI-heavy<br />
            <span className="text-gradient">workflows.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Every feature designed to keep you in flow — not context-switching between dashboards.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, isInView }: { feature: typeof FEATURES[0]; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.03,
        rotateY: 3,
        rotateX: -3,
        translateZ: 20,
        transition: { duration: 0.3 },
      }}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      <div
        className={`relative h-full p-6 rounded-2xl glass overflow-hidden transition-all duration-500 group-hover:border-white/15`}
        style={{
          background: `radial-gradient(ellipse at top left, ${feature.color}12, transparent 70%)`,
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
        >
          {feature.icon}
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-sm text-white/45 leading-relaxed">{feature.description}</p>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ boxShadow: `inset 0 0 40px ${feature.color}08` }}
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${feature.color}15, transparent)` }}
        />
      </div>
    </motion.div>
  )
}
