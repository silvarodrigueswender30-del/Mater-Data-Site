'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Problem() {
  const miniMapRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Estado do player: parado até o usuário decidir assistir
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  /* ─────────────────────────────────────────────────────────────
   * GSAP — fade-in do mini-map PNG via scroll (fluido em mobile)
   * Usa opacity + translateY com will-change para GPU no iOS/Safari
   * ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const mapEl = miniMapRef.current
    if (mapEl) {
      gsap.fromTo(
        mapEl,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapEl,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    /* ── ScrollTrigger: pausa o vídeo ao sair da seção ──
     * video.pause() NÃO requer gesto do usuário → funciona em iOS sem restrições.
     * Não há nenhuma manipulação de volume ou muted aqui — zero conflito com Safari.
     */
    const st = ScrollTrigger.create({
      trigger: '#s-second',
      start: 'top 80%',
      end: 'bottom 20%',
      onLeave: () => {
        const video = videoRef.current
        if (video && !video.paused) {
          video.pause()
          setIsPlaying(false)
        }
      },
      onLeaveBack: () => {
        const video = videoRef.current
        if (video && !video.paused) {
          video.pause()
          setIsPlaying(false)
        }
      },
    })

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((s) => s.kill())
    }
  }, [])

  /* ─────────────────────────────────────────────────────────────
   * handlePlay — dispara apenas por toque/clique direto do usuário.
   * Esse é o único método de iniciar o vídeo.
   * iOS aceita plenamente porque é uma ação de gesto direto.
   * ───────────────────────────────────────────────────────────── */
  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return

    // Inicia sempre mudo — o usuário ativa som com o botão dedicado
    video.muted = true
    setIsMuted(true)

    video.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        // Fallback improvável: já iniciamos mudo, mas iOS ainda bloqueou
        // Não fazemos nada — o botão de play volta a aparecer
        setIsPlaying(false)
      })
  }

  /* ─────────────────────────────────────────────────────────────
   * toggleMute — alterna som com gesto direto do usuário.
   * iOS aceita video.muted em gestos diretos.
   * Não manipulamos video.volume (iOS ignora essa propriedade).
   * ───────────────────────────────────────────────────────────── */
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const newMuted = !video.muted
    video.muted = newMuted
    setIsMuted(newMuted)

    // Se o usuário desmutou e o vídeo pausou (iOS às vezes pausa ao desmutar)
    if (!newMuted && video.paused) {
      video.play().catch(() => {
        video.muted = true
        setIsMuted(true)
      })
    }
  }

  return (
    /*
     * .second-section
     * z-index: 4 | background-color: var(--beige) → #F5F0E8 | height: 66em | position: relative
     * Mobile (<768px): height: auto
     * → Cor adaptada para Sticker: bg-[#0A0A0A] (fundo escuro do projeto)
     */
    <section
      id="s-second"
      ref={sectionRef}
      className="relative z-[4] bg-[#F0F4FF] h-[66em] max-md:h-auto overflow-hidden"
    >
      {/*
       * .w-layout-blockcontainer.container
       * w-layout-blockcontainer: max-width: 940px | mx-auto | display: block
       * .container (override): width: 100% | max-width: none | height: 100% | display: block
       * Mobile (<768px): max-width: none
       * → .container sobrescreve o blockcontainer, então: w-full h-full block
       */}
      <div className="w-full h-full block">

        {/*
         * .second-section-wrap
         * grid-template-columns: 1fr 1fr | grid-template-rows: auto | height: 100% | display: grid
         * Mobile (<992px): flex-flow: column | grid-template-columns: 1fr | display: flex
         * Mobile (<768px): padding: 0
         */}
        <div className="grid grid-cols-2 grid-rows-[auto] h-full max-lg:flex max-lg:flex-col">

          {/*
           * .most-fertilizers-mobile
           * display: none (desktop) | Mobile (<992px): display: flex | padding: 6em var(--padding-web)
           * background-color: var(--beige) → adaptado para Sticker: bg-[#0A0A0A]
           * Mobile (<768px): padding: 4.63em 1em
           */}
          <div
            className="
              hidden
              max-lg:flex max-lg:flex-col max-lg:justify-start max-lg:items-start
              max-lg:pt-[6em] max-lg:pb-[6em] max-lg:px-[var(--padding-web)]
              max-lg:bg-master-ice
              max-md:pt-[4.63em] max-md:pb-[4.63em] max-md:px-[1em]
            "
          >
            {/*
             * .up-to-70-title
             * gap: 1em | flex-flow: column | width: 36.2em | display: flex
             * Mobile (<992px): width: 35em
             * Mobile (<768px): width: 20.1em
             */}
            <div
              className="
                flex flex-col gap-[1em]
                w-[36.2em]
                max-lg:w-[35em]
                max-md:w-full max-md:max-w-[20.1em]
              "
            >
              {/*
               * .h2-style.green
               * color: var(--heading-color) → adaptado: #D4A574 (--sticker-gold)
               * letter-spacing: -.03em | font-weight: 500 | display: block
               * font-size: 3.6em (desktop) | 3em (tablet) | 2em (mobile) | line-height: 93%
               * font-family: Aeonik → sua fonte primária serifada editorial
               */}
              <h2
                text-split=""
                className="
                  block text-[#03060F] tracking-[-0.03em] font-bold
                  text-[3.6em] leading-[93%]
                  mt-0 mb-0
                  max-lg:text-[3em]
                  max-md:text-[2em] max-md:leading-[100%]
                "
              >
                Quem vive a operação confirma: a Master Data transforma o seu posto.
              </h2>

              {/*
               * .text-16-regular-caps.green
               * color: var(--main-green) → adaptado: #C2847A (--sticker-nude)
               * text-transform: uppercase | font-family: Aeonik | font-size: 1em | line-height: 130%
               * Mobile (<768px): font-size: .86em
               */}
              <div
                className="
                  text-[#4A6A9A] uppercase font-[Aeonik,Arial,sans-serif]
                  text-[1em] leading-[130%] mb-0
                  max-md:text-[0.86em]
                "
              >
                Ouça como nossos parceiros elevaram o nível de gestão e segurança operacional com um suporte que não deixa ninguém na mão.
              </div>
            </div>
          </div>

          {/*
           * .corn-video-wrap-new
           * height: 100% | padding-bottom: 3em | padding-left: var(--padding-web)
           * justify-content: flex-start | align-items: flex-end | display: flex | position: relative
           * Mobile (<992px): flex-flow: column | justify-content: flex-start | align-items: flex-start
           *                   width: 100% | height: 50em | display: flex | overflow: hidden
           * Mobile (<768px): height: 29.75em
           */}
          <div
            data-w-id="7e8b480f-fad0-4834-a1f1-c0b6f92922da"
            className="
              relative flex justify-start items-end
              h-full pb-[3em] pl-[var(--padding-web)]
              max-lg:flex-col max-lg:justify-start max-lg:items-start
              max-lg:w-full max-lg:h-[50em] max-lg:overflow-hidden
              max-md:h-[29.75em]
            "
          >
            {/*
             * .farmer-video
             * object-fit: cover | width: 100% | height: 100% | position: absolute | inset: 0%
             * NÃO tem autoPlay — o usuário decide quando assistir
             */}
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.85) contrast(1.1)' }}
            >
              <source
                src="/videos/SESSAO-PROBLEM/output_final_extra_leve.webm"
                type="video/webm"
              />
              Seu navegador não suporta vídeos.
            </video>

            {/* ── THUMBNAIL — visível apenas antes do play, cobre o vídeo ── */}
            {!isPlaying && (
              <img
                src="/images/cliente.webp"
                alt="Thumbnail depoimento"
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{ filter: 'brightness(0.85) contrast(1.1)' }}
              />
            )}

            {/* OVERLAY GRADIENTE — Para esconder legenda e dar contraste */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to top, #03060F 0%, rgba(3,6,15,0.4) 40%, transparent 100%)',
                opacity: 0.8
              }}
            />

            {/* ── BOTÃO DE PLAY (aparece enquanto o vídeo não está tocando) ──
             * Centralizado sobre o vídeo, ativa via toque/clique direto.
             * iOS aceita video.play() dentro de onClick sem restrições.
             * Sem backdropFilter para não embaçar o texto abaixo.
             */}
            {!isPlaying && (
              <button
                id="video-play-btn"
                onClick={handlePlay}
                aria-label="Assistir depoimento"
                className="
                  absolute inset-0 z-20 flex flex-col items-center justify-center gap-3
                  w-full h-full
                  transition-opacity duration-300
                "
                style={{ background: 'rgba(3,6,15,0.35)' }}
              >
                {/* Círculo com ícone de play */}
                <div
                  className="
                    flex items-center justify-center
                    w-16 h-16 rounded-full
                    bg-white/15 backdrop-blur-md border border-white/30
                    transition-transform duration-200 active:scale-95
                  "
                  style={{ boxShadow: '0 0 40px rgba(255,255,255,0.12)' }}
                >
                  {/* Triângulo de play — deslocado 2px para parecer centralizado visualmente */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{ marginLeft: '3px' }}
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </div>

                {/* Label sob o botão */}
                <span
                  className="text-white text-sm font-medium uppercase tracking-widest"
                  style={{ fontFamily: 'Aeonik, Arial, sans-serif', letterSpacing: '0.15em' }}
                >
                  Assistir depoimento
                </span>
              </button>
            )}

            {/* ── BOTÃO DE CONTROLE DE SOM (aparece apenas enquanto o vídeo toca) ── */}
            {isPlaying && (
              <button
                id="video-mute-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Ativar som' : 'Mutar vídeo'}
                className="absolute bottom-6 left-6 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-white/20 active:scale-95"
                style={{ pointerEvents: 'auto' }}
              >
                {isMuted ? (
                  /* Ícone mudo */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                ) : (
                  /* Ícone com som */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                )}
              </button>
            )}

            {/*
             * .corn-text-wrap
             * z-index: 1 | gap: 1.25em | flex-flow: column | width: 37em | display: flex | position: relative
             * Mobile (<992px): display: none
             * → z-index elevado para z-[30] para ficar acima da máscara de play
             */}
            <div
              className="
                relative z-[30] flex flex-col gap-[1.25em] w-[37em]
                max-lg:hidden
              "
            >
              {/*
               * .h2-style (sem .green)
               * color: #fff | letter-spacing: -.01em | font-weight: 500
               * font-size: 3.6em | line-height: 93% | mt-0 mb-0
               */}
              <h2
                text-split=""
                className="
                  text-white tracking-[-0.01em] font-medium
                  text-[3.6em] leading-[93%] mt-0 mb-0
                "
              >
                Quem vive a operação confirma: A Master Data transforma o seu posto.
              </h2>

              {/*
               * .description-wrap
               * width: 28.7em
               */}
              <div className="w-[28.7em]">
                {/*
                 * .text-16-regular-caps (base, sem modificador)
                 * color: var(--beige) → adaptado: #F5F0E8 (--sticker-bone)
                 * text-transform: uppercase | font-size: 1em | line-height: 130%
                 * Mobile (<768px): font-size: .8em
                 */}
                <div
                  className="
                    text-[#F5F0E8] uppercase font-[Aeonik,Arial,sans-serif]
                    text-[1em] leading-[130%] mb-0
                    max-md:text-[0.8em]
                  "
                >
                  Ouça como nossos parceiros elevaram o nível de gestão e segurança operacional com um suporte que não deixa ninguém na mão.
                </div>
              </div>
            </div>
          </div>

          {/*
           * .up-to-70-wrap
           * padding-top: 5em | padding-right: var(--padding-web) | padding-left: 3.13em
           * flex-flow: column | justify-content: space-between | align-items: flex-start | display: flex
           * Mobile (<992px): padding-top: 3em | padding-left: var(--padding-web)
           * Mobile (<768px): padding: 4.63em 1em 4em | gap: 3em
           */}
          <div
            className="
              flex flex-col justify-start items-start
              pt-[5em] pr-[var(--padding-web)] pl-[3.13em]
              max-lg:pt-[3em] max-lg:pl-[var(--padding-web)]
              max-md:pt-[4.63em] max-md:pr-[1em] max-md:pb-[4em] max-md:pl-[1em] max-md:gap-[3em]
              gap-[6em]
            "
          >
            {/*
             * .up-to-70-title
             * gap: 1em | flex-flow: column | width: 36.2em | display: flex
             * Mobile (<992px): width: 35em
             * Mobile (<768px): width: 20.1em
             */}
            <div
              className="
                flex flex-col gap-[1em] w-[36.2em]
                max-lg:w-[35em]
                max-md:w-[20.1em]
              "
            >
              {/*
               * .h2-style.green → cor adaptada para Sticker: #D4A574
               */}
              <h2
                text-split=""
                className="
                  block text-[#03060F] tracking-[-0.03em] font-bold
                  text-[3.6em] leading-[93%] mt-0 mb-0
                  max-lg:text-[3em]
                  max-md:text-[2em] max-md:leading-[100%]
                "
              >
                Atendimento técnico rápido e sistemas de gestão que realmente funcionam.
              </h2>

              {/*
               * .text-16-regular.green
               * color: var(--main-green) → adaptado: #C2847A | line-height: 125%
               * text-transform: none | font-size: 1em
               */}
              <div
                className="
                  text-master-slate text-lg font-[Aeonik,Arial,sans-serif]
                  leading-[125%] mt-0 mb-0
                "
              >
                Mais que automação, entregamos a tranquilidade de uma operação blindada contra falhas e perdas financeiras no Triângulo Mineiro.
              </div>
            </div>

            {/*
             * .corn-animated-wrap
             * justify-content: center | align-items: flex-end | width: 100% | display: flex
             * Mobile (<768px): position: relative
             */}
            <div
              className="
                flex justify-center items-end w-full
                max-md:relative
              "
            >
              {/*
             * .mini-map-wrap
             * PNG substitui os dois SVGs de corn animado.
             * Fade-in via GSAP ScrollTrigger: opacity 0→1 + translateY 32→0
             * Tamanho contido para não dominar a seção: max-w-[22em]
             * will-change: transform, opacity → força GPU no iOS/Safari
             */}
              <img
                ref={miniMapRef}
                src="/images/mini-map.png"
                loading="lazy"
                alt="Mapa de cobertura Master Data"
                className="w-full max-w-[42em] max-md:max-w-[16em] object-contain"
                style={{ opacity: 0, willChange: 'transform, opacity' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
