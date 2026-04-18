import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const STORY_BEATS = [
  {
    tag: 'The Problem',
    headline: 'You\'re using AI agents all day.',
    subline: 'But you have no idea where your tokens are going.',
    detail: 'Claude for code review. Copilot autocomplete. Cursor refactors. Codex pipelines. By end of day — surprise billing.',
    color: '#f87171',
    icon: '😰',
  },
  {
    tag: 'The Reality',
    headline: 'Every provider has a different dashboard.',
    subline: 'None of them show you what\'s happening right now.',
    detail: 'You\'re constantly tab-switching, logging in again, guessing what\'s consuming your plan. That context switch costs you.',
    color: '#fb923c',
    icon: '😤',
  },
  {
    tag: 'The Solution',
    headline: 'One glance. Every provider. Live.',
    subline: 'MyAgentsBar lives exactly where you work — your menu bar.',
    detail: 'Persistent, real-time, beautiful. No dashboards. No logins. No surprises.',
    color: '#34d399',
    icon: '🎯',
  },
]

export function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-16 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto space-y-8">
        {STORY_BEATS.map((beat, i) => (
          <StoryBeat key={beat.tag} beat={beat} index={i} />
        ))}
      </div>
    </section>
  )
}

function StoryBeat({ beat, index }: { beat: typeof STORY_BEATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div
        className="p-8 md:p-10 rounded-3xl glass overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at ${index % 2 === 0 ? 'top left' : 'top right'}, ${beat.color}10, transparent 60%)`,
          border: `1px solid ${beat.color}15`,
        }}
      >
        <div className="flex items-start gap-5">
          <motion.div
            animate={isInView ? { scale: [0.5, 1.2, 1], rotate: [0, 10, 0] } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl shrink-0 mt-1"
          >
            {beat.icon}
          </motion.div>
          <div className="flex-1">
            <div
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: beat.color }}
            >
              {beat.tag}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {beat.headline}
            </h3>
            <p className="text-lg font-medium mb-3" style={{ color: beat.color + 'cc' }}>
              {beat.subline}
            </p>
            <p className="text-white/40 leading-relaxed">{beat.detail}</p>
          </div>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 h-px origin-left"
          style={{ background: `linear-gradient(90deg, ${beat.color}40, transparent)` }}
        />
      </div>
    </motion.div>
  )
}
