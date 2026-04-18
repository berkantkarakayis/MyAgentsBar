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

export const DOWNLOAD_LINKS = {
  'apple-silicon': {
    url: 'https://github.com/berkantkarakayis/MyAgentsBar/releases/latest/download/MyAgentsBar-arm64.dmg',
    label: 'Apple Silicon (M1/M2/M3/M4)',
    size: '~6.2 MB',
    arch: 'arm64',
  },
  intel: {
    url: 'https://github.com/berkantkarakayis/MyAgentsBar/releases/latest/download/MyAgentsBar-x64.dmg',
    label: 'Intel Mac (x86_64)',
    size: '~7.1 MB',
    arch: 'x86_64',
  },
  universal: {
    url: 'https://github.com/berkantkarakayis/MyAgentsBar/releases/latest/download/MyAgentsBar-universal.dmg',
    label: 'Universal Binary',
    size: '~12.4 MB',
    arch: 'universal',
  },
}
