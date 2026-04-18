import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  detectMac,
  DOWNLOAD_LINKS,
  type MacArch,
} from "../utils/detectPlatform";

function archToSelected(arch: MacArch): "apple-silicon" | "intel" | "universal" {
  if (arch === "apple-silicon") return "apple-silicon";
  if (arch === "intel") return "intel";
  return "universal";
}

export function Download() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const mac = useMemo(() => detectMac(), []);
  const [selected, setSelected] = useState<"apple-silicon" | "intel" | "universal">(
    () => archToSelected(mac.arch)
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("brew install --cask myagentsbar")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const selectedLink = DOWNLOAD_LINKS[selected];

  return (
    <section
      id="download-section"
      className="relative py-32 px-6 overflow-hidden"
      ref={ref}
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-100 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute w-100 h-75 bg-blue-600/8 rounded-full blur-3xl translate-x-40" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Download
            <br />
            <span className="text-gradient">MyAgentsBar</span>
          </h2>
          <p className="text-white/40 text-lg">
            Free. No account. No telemetry. Just install and go.
          </p>
        </motion.div>

        {/* Smart detection banner */}
        {mac.isMac && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex items-center justify-center gap-2 text-sm text-emerald-400/80"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Detected:{" "}
            {mac.arch === "apple-silicon" ? "Apple Silicon Mac" : "Intel Mac"} —
            we pre-selected the right build
          </motion.div>
        )}

        {/* Download cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {(
            Object.entries(DOWNLOAD_LINKS) as [
              typeof selected,
              (typeof DOWNLOAD_LINKS)[keyof typeof DOWNLOAD_LINKS],
            ][]
          ).map(([key, link]) => (
            <motion.button
              key={key}
              onClick={() => setSelected(key)}
              whileHover={{ scale: 1.03, translateY: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                selected === key
                  ? "bg-linear-to-br from-violet-600/25 to-blue-600/15 border border-violet-500/40 shadow-lg shadow-violet-500/15"
                  : "glass hover:border-white/15"
              }`}
            >
              {selected === key && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
              <div className="text-2xl mb-3">
                {key === "apple-silicon" ? "🍎" : key === "intel" ? "🖥️" : "🌐"}
              </div>
              <div className="font-semibold text-white text-sm mb-1">
                {link.label}
              </div>
              <div className="text-xs text-white/35">{link.size} · .dmg</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 font-mono">
                {link.arch}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Main download button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a href={selectedLink.url} className="w-full sm:w-auto">
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 50px rgba(124,58,237,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full cursor-pointer flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-linear-to-r from-violet-600 to-blue-600 text-white font-bold text-lg shadow-2xl shadow-violet-500/30 animate-gradient transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed, #3b82f6, #7c3aed)",
              }}
            >
              <DownloadIcon />
              Download for {selectedLink.arch}
            </motion.button>
          </a>
        </motion.div>

        {/* Gatekeeper notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-10 mx-auto max-w-lg glass rounded-2xl p-5 border border-amber-500/15"
          style={{ background: "rgba(251,191,36,0.04)" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">⚠️</span>
            <div>
              <div className="text-sm font-semibold text-amber-400/90 mb-1">
                One extra step on first launch
              </div>
              <p className="text-xs text-white/45 leading-relaxed">
                Because the app is distributed without an Apple certificate,
                macOS will block it on first open. After mounting the DMG,{" "}
                <span className="text-white/70 font-medium">
                  right-click → Open → "Open Anyway"
                </span>{" "}
                on the app. You only need to do this once.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Homebrew option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest">
            Or via Homebrew (coming soon)
          </span>
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 glass px-6 py-3 rounded-xl cursor-pointer transition-all hover:border-white/20"
          >
            <code className="text-sm text-violet-400 font-mono">
              brew install --cask myagentsbar
            </code>
            <span className="text-xs text-white/30 border border-white/10 px-2 py-0.5 rounded-md">
              {copied ? "✓ Copied" : "Copy"}
            </span>
          </motion.button>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex items-center justify-center gap-6 mt-12 text-xs text-white/25"
        >
          {[
            "macOS 14 Sonoma+",
            "Free forever",
            "MIT License",
            "No telemetry",
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="text-violet-500/60">·</span>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15V3m0 12l-4-4m4 4l4-4" />
      <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
    </svg>
  );
}
