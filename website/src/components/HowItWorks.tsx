import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'Download & Install',
    description: 'Drop MyAgentsBar into your Applications folder. It lives in the menu bar — no Dock clutter, no windows.',
    visual: <InstallVisual />,
    color: '#7c3aed',
  },
  {
    number: '02',
    title: 'Connect Your Providers',
    description: 'Click a provider, authenticate via OAuth or paste your API key. We use macOS Keychain — your credentials never leave your machine.',
    visual: <ConnectVisual />,
    color: '#3b82f6',
  },
  {
    number: '03',
    title: 'Stay in Flow',
    description: 'Token counts, costs, and usage bars appear instantly in your menu bar. Click any time for a full breakdown.',
    visual: <FlowVisual />,
    color: '#10b981',
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="how-it-works" className="relative py-32 px-6" ref={ref}>
      {/* Ambient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-xs text-white/50 tracking-widest uppercase">Setup</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Up and running<br />
            <span className="text-gradient">in 60 seconds.</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepRow({ step, index, isInView }: { step: typeof STEPS[0]; index: number; isInView: boolean }) {
  const even = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${even ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
    >
      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <div
          className="text-7xl font-black mb-4 leading-none"
          style={{
            color: step.color + '18',
            WebkitTextStroke: `1px ${step.color}30`,
          }}
        >
          {step.number}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
        <p className="text-white/45 text-lg leading-relaxed max-w-sm mx-auto md:mx-0">{step.description}</p>
        <div
          className="w-12 h-1 rounded-full mt-6 mx-auto md:mx-0"
          style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
        />
      </div>

      {/* Visual */}
      <motion.div
        whileHover={{ scale: 1.03, rotateY: even ? 5 : -5 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full"
        style={{ perspective: '800px' }}
      >
        <div
          className="glass rounded-2xl p-6 shadow-2xl"
          style={{ boxShadow: `0 30px 60px ${step.color}15, 0 0 0 1px ${step.color}15` }}
        >
          {step.visual}
        </div>
      </motion.div>
    </motion.div>
  )
}

function InstallVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 glass rounded-xl">
        <img src="/app-icon.png" alt="MyAgentsBar" className="w-12 h-12 rounded-xl shadow-lg" />
        <div className="flex-1">
          <div className="font-semibold text-white text-sm">MyAgentsBar.app</div>
          <div className="text-xs text-white/40">4.2 MB · macOS 14+</div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30 text-xs text-violet-400 font-medium"
        >
          Install
        </motion.div>
      </div>
      <div className="flex items-center justify-center gap-3 text-white/30 text-sm py-2">
        <div className="flex-1 h-px bg-white/8" />
        <span>drag to Applications</span>
        <div className="flex-1 h-px bg-white/8" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['Finder', 'Safari', 'Mail', 'MyAgentsBar'].map((app, i) => (
          <div key={app} className="flex flex-col items-center gap-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg overflow-hidden ${i !== 3 ? 'bg-white/8' : ''}`}>
              {i === 3
                ? <img src="/app-icon.png" alt="MyAgentsBar" className="w-12 h-12 rounded-xl shadow-lg shadow-violet-500/30" />
                : ['📁', '🌐', '✉️'][i]
              }
            </div>
            <span className="text-xs text-white/30">{app}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConnectVisual() {
  const providers = [
    { name: 'Claude', icon: '🧠', color: '#d97706', connected: true },
    { name: 'Copilot', icon: '🐙', color: '#22c55e', connected: true },
    { name: 'Cursor', icon: '⚡', color: '#3b82f6', connected: false },
  ]
  return (
    <div className="space-y-3">
      {providers.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 + 0.3 }}
          className="flex items-center gap-3 p-3 glass rounded-xl"
        >
          <span className="text-xl">{p.icon}</span>
          <span className="text-sm text-white/80 flex-1">{p.name}</span>
          {p.connected ? (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
              <span className="text-xs" style={{ color: p.color + 'cc' }}>Connected</span>
            </div>
          ) : (
            <button className="text-xs px-3 py-1 glass rounded-lg text-white/50 hover:text-white/80 cursor-pointer transition-colors">
              Connect →
            </button>
          )}
        </motion.div>
      ))}
      <div className="flex items-center gap-2 p-3 glass rounded-xl border border-dashed border-white/10">
        <span className="text-white/30 text-sm">+ Add another provider</span>
      </div>
    </div>
  )
}

function FlowVisual() {
  return (
    <div className="space-y-4">
      {/* Menu bar preview */}
      <div className="flex items-center justify-end gap-3 p-3 bg-black/40 rounded-xl">
        <span className="text-xs text-white/30">14:47</span>
        <motion.div
          className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg"
          animate={{ borderColor: ['rgba(16,185,129,0.2)', 'rgba(16,185,129,0.5)', 'rgba(16,185,129,0.2)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-mono font-bold text-emerald-400"
          >
            73%
          </motion.span>
          <span className="text-xs text-white/30">Claude</span>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Today', value: '$2.18', color: '#10b981' },
          { label: 'Tokens', value: '127K', color: '#3b82f6' },
          { label: 'Remaining', value: '27%', color: '#f59e0b' },
        ].map(stat => (
          <div key={stat.label} className="text-center p-3 glass rounded-xl">
            <div className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-white/30 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-white/20 flex items-center justify-center gap-2">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
        />
        Live — updates every 30 seconds
      </div>
    </div>
  )
}
