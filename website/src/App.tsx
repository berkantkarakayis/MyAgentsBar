import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { StoryScroll } from './components/StoryScroll'
import { Features } from './components/Features'
import { Providers } from './components/Providers'
import { HowItWorks } from './components/HowItWorks'
import { Download } from './components/Download'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StoryScroll />
        <Features />
        <Providers />
        <HowItWorks />
        <Download />
      </main>
      <Footer />
    </div>
  )
}
