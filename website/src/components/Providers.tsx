import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const PROVIDERS = [
  {
    name: "Claude",
    company: "Anthropic",
    icon: "🧠",
    color: "#d97706",
    bg: "#d9770615",
    description:
      "Full token tracking with OAuth, plan usage, cost breakdown, and usage history.",
  },
  {
    name: "GitHub Copilot",
    company: "GitHub / Microsoft",
    icon: "🐙",
    color: "#22c55e",
    bg: "#22c55e15",
    description:
      "Device flow auth, seat usage monitoring, and response rate metrics.",
  },
  {
    name: "Cursor",
    company: "Cursor Inc.",
    icon: "⚡",
    color: "#3b82f6",
    bg: "#3b82f615",
    description:
      "Request usage tracking, fast & slow request breakdown per billing period.",
  },
  {
    name: "OpenAI Codex",
    company: "OpenAI",
    icon: "🤖",
    color: "#10b981",
    bg: "#10b98115",
    description:
      "Multi-account support, credits monitoring, and OAuth session management.",
  },
  {
    name: "Gemini",
    company: "Google",
    icon: "✨",
    color: "#f59e0b",
    bg: "#f59e0b15",
    description:
      "API token tracking with cost estimates for Gemini Pro and Ultra models.",
  },
];

export function Providers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="providers"
      className="relative py-32 px-6 overflow-hidden"
      ref={ref}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-xs text-white/50 tracking-widest uppercase">
              Integrations
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            All your AI tools,
            <br />
            <span className="text-gradient">one menu bar.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Switch between providers instantly. Each with native auth, real
            metrics, and zero setup complexity.
          </p>
        </motion.div>

        {/* Provider grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {PROVIDERS.map((provider, i) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.05, translateY: -6 }}
              className="relative group cursor-default"
            >
              <div
                className="p-5 rounded-2xl glass transition-all duration-400 h-full"
                style={{
                  background:
                    hovered === i ? provider.bg : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hovered === i ? provider.color + "40" : "rgba(255,255,255,0.06)"}`,
                  boxShadow:
                    hovered === i ? `0 20px 40px ${provider.color}20` : "none",
                }}
              >
                <div className="text-3xl mb-3">{provider.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">
                  {provider.name}
                </div>
                <div className="text-xs text-white/35 mb-3">
                  {provider.company}
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hovered === i ? 1 : 0,
                    height: hovered === i ? "auto" : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-white/50 leading-relaxed">
                    {provider.description}
                  </p>
                </motion.div>

                {/* Status dot */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: provider.color,
                      boxShadow: `0 0 6px ${provider.color}`,
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: provider.color + "aa" }}
                  >
                    Supported
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More coming */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-10"
        >
          <span className="text-sm text-white/25">
            More providers added regularly via community contributions
          </span>
        </motion.div>
      </div>
    </section>
  );
}
