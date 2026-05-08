import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Nav from './components/Nav'
import Hero from './components/Hero'
import LogosStrip from './components/LogosStrip'
import Problem from './components/Problem'
import Capsule from './components/Capsule'
import Numbers from './components/Numbers'
import Community from './components/Community'
import Trials from './components/Trials'
import Products from './components/Products'
import Procedures from './components/Procedures'
import CTABlock from './components/CTABlock'
import FooterCTA from './components/FooterCTA'
gsap.registerPlugin(ScrollTrigger)

function App() {
  // ── useEffect (não useLayoutEffect) ─────────────────────────────
  // useLayoutEffect + StrictMode = Lenis inicializa DUAS vezes em dev
  // causando dois loops de scroll competindo. useEffect é seguro aqui
  // porque o Lenis não precisa do DOM pintado para iniciar.
  useEffect(() => {

    // ── FIX #1: Neutralizar CSS do Webflow ──────────────────────────
    // O CSS externo força html/body { height:100%; overflow:hidden }
    // impedindo o Lenis de calcular a altura real do documento.
    document.documentElement.style.setProperty('overflow', 'auto', 'important')
    document.documentElement.style.setProperty('height', 'auto', 'important')
    document.body.style.setProperty('overflow', 'auto', 'important')
    document.body.style.setProperty('height', 'auto', 'important')
    document.body.style.overflowX = 'hidden'
    document.documentElement.style.overflowX = 'hidden'

    // ── FIX #2: Lenis com configuração mínima e estável ─────────────
    // lerp:0.1 é previsível e compatível com scrub:3 do Hero.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // ── FIX #3: UM único loop RAF ────────────────────────────────────
    // Problema anterior: App usava gsap.ticker.add(lenis.raf) E
    // Hero tinha seu próprio requestAnimationFrame → dois loops
    // atualizando scroll em momentos diferentes = jitter nos frames.
    // Solução: UM requestAnimationFrame global aqui.
    // O Hero.tsx usa rAF APENAS para desenhar canvas (não para scroll).
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // ── FIX #4: pinType DEVE ser 'fixed' com Lenis ──────────────────
    // 'transform' faz o GSAP usar CSS transform para o pin.
    // O Lenis controla posição via scroll — os dois competem = engasgo.
    // Com 'fixed' o elemento pinado usa position:fixed,
    // independente do mecanismo de scroll do Lenis.
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value as number, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: 'fixed',
    })

    lenis.on('scroll', ScrollTrigger.update)

    // ── FIX #5: Refresh em cascata ──────────────────────────────────
    // t1 = 200ms: layout base resolvido
    // t2 = 2000ms: frames .webp do Hero terminaram de carregar
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 2000)

    // ── Resize debounced ────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      ScrollTrigger.clearScrollMemory()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <LogosStrip />
      <Problem />
      <Capsule />
      <Numbers />
      <Procedures />
      <Products />
      <Trials />
      <Community />
      <CTABlock />
      <FooterCTA />
    </main>
  )
}

export default App
