import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PROVIDERS = [
  { name: 'Claude', color: '#d97706', icon: '🧠', usage: 73, tokens: '127.4K', cost: '$2.18', plan: 'Pro' },
  { name: 'Copilot', color: '#22c55e', icon: '🐙', usage: 45, tokens: '89.2K', cost: '$1.45', plan: 'Business' },
  { name: 'Cursor', color: '#3b82f6', icon: '⚡', usage: 88, tokens: '201.7K', cost: '$4.02', plan: 'Pro' },
  { name: 'Codex', color: '#8b5cf6', icon: '🤖', usage: 32, tokens: '54.1K', cost: '$0.87', plan: 'Free' },
]

export function MenuBarMockup() {
  const [activeProvider, setActiveProvider] = useState(0)
  const [animatedUsage, setAnimatedUsage] = useState(0)

  useEffect(() => {
    const target = PROVIDERS[activeProvider].usage
    let start = 0
    const step = () => {
      start += 2
      if (start < target) {
        setAnimatedUsage(start)
        requestAnimationFrame(step)
      } else {
        setAnimatedUsage(target)
      }
    }
    setAnimatedUsage(0)
    requestAnimationFrame(step)
  }, [activeProvider])

  useEffect(() => {
    const id = setInterval(() => {
      setActiveProvider(p => (p + 1) % PROVIDERS.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const provider = PROVIDERS[activeProvider]

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      {/* macOS Menu Bar strip */}
      <motion.div
        className="w-full glass-strong rounded-2xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${provider.color}22`,
        }}
        animate={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${provider.color}33` }}
        transition={{ duration: 0.8 }}
      >
        {/* macOS top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-4 text-white/40 text-xs">
            <span>Finder</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30">Wed 14:32</span>
            <div className="flex items-center gap-1.5 px-2 py-1 glass rounded-md">
              <motion.span
                key={activeProvider}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-mono font-bold"
                style={{ color: provider.color }}
              >
                {animatedUsage}%
              </motion.span>
              <div className="w-px h-3 bg-white/10" />
              <span className="text-xs text-white/40">{provider.name}</span>
            </div>
          </div>
        </div>

        {/* Dropdown panel */}
        <div className="p-5 bg-black/40">
          {/* Provider tabs */}
          <div className="flex gap-2 mb-5">
            {PROVIDERS.map((p, i) => (
              <motion.button
                key={p.name}
                onClick={() => setActiveProvider(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 cursor-pointer py-2 px-3 rounded-xl text-xs font-medium transition-all duration-300 ${
                  i === activeProvider
                    ? 'text-white shadow-lg'
                    : 'text-white/40 glass hover:text-white/70'
                }`}
                style={i === activeProvider ? { background: `${p.color}30`, border: `1px solid ${p.color}60` } : {}}
              >
                {p.icon} {p.name}
              </motion.button>
            ))}
          </div>

          {/* Usage display */}
          <motion.div
            key={activeProvider}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Main stat */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-4xl font-bold text-white tracking-tight">
                  {animatedUsage}<span className="text-lg text-white/40">%</span>
                </div>
                <div className="text-xs text-white/40 mt-1">of {provider.plan} plan used</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-white">{provider.tokens}</div>
                <div className="text-xs text-white/40">tokens</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${provider.color}aa, ${provider.color})` }}
                animate={{ width: `${animatedUsage}%` }}
                transition={{ duration: 0.05 }}
              />
              <div
                className="absolute inset-0 shimmer-line opacity-50 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${provider.color}20, transparent)` }}
              />
            </div>

            {/* Cost & details */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Cost Today', value: provider.cost },
                { label: 'Rate/hr', value: '~12K' },
                { label: 'Resets In', value: '14d' },
              ].map(item => (
                <div key={item.label} className="glass rounded-xl p-3">
                  <div className="text-xs text-white/30 mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="h-16 flex items-end gap-1">
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 20 + Math.sin(i * 0.5 + activeProvider) * 15 + Math.random() * 25
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.4, delay: i * 0.02 }}
                    className="flex-1 rounded-sm"
                    style={{
                      background: i > 18
                        ? `${provider.color}90`
                        : `${provider.color}30`,
                    }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-white/20">
              <span>24h ago</span>
              <span>Token usage timeline</span>
              <span>Now</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
