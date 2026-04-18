export type MacArch = 'apple-silicon' | 'intel' | 'unknown'

export function detectMac(): { isMac: boolean; arch: MacArch } {
  const ua = navigator.userAgent
  const isMac = /Mac/.test(ua)

  if (!isMac) return { isMac: false, arch: 'unknown' }

  // WebGL renderer trick for Apple Silicon detection
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info')
      if (ext) {
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string
        if (/apple/i.test(renderer) || /m[1-9]/i.test(renderer)) {
          return { isMac: true, arch: 'apple-silicon' }
        }
      }
    }
  } catch {
    // ignore
  }

  // Platform string check
  const platform = (navigator as Navigator & { userAgentData?: { platform: string } }).userAgentData?.platform ?? navigator.platform
  if (/arm/i.test(platform) || /apple/i.test(platform)) {
    return { isMac: true, arch: 'apple-silicon' }
  }

  return { isMac: true, arch: 'intel' }
}

const DMG_URL = 'https://github.com/berkantkarakayis/MyAgentsBar/releases/download/v1.0.0/MyAgentsBar.dmg'

export const DOWNLOAD_LINKS = {
  'apple-silicon': {
    url: DMG_URL,
    label: 'Apple Silicon (M1/M2/M3/M4)',
    size: '~6.2 MB',
    arch: 'macOS',
  },
  intel: {
    url: DMG_URL,
    label: 'Intel Mac (x86_64)',
    size: '~6.2 MB',
    arch: 'macOS',
  },
  universal: {
    url: DMG_URL,
    label: 'Universal (All Macs)',
    size: '~6.2 MB',
    arch: 'macOS',
  },
}
