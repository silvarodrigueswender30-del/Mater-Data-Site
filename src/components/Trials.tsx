import { useState, useEffect, useRef } from 'react'

const locations = [
  { id: 'uberlandia', className: 'usa', city: 'Uberlândia', state: 'MG', info: 'Sede e Centro de Operações Master Data.' },
  { id: 'araguari', className: 'uk', city: 'Araguari', state: 'MG', info: 'Atendimento ágil e proximidade regional.' },
  { id: 'uberaba', className: 'bolivia', city: 'Uberaba', state: 'MG', info: 'Hub logístico estratégico do Triângulo.' },
  { id: 'ituiutaba', className: 'spain', city: 'Ituiutaba', state: 'MG', info: 'Extremo oeste e controle de tanques.' },
  { id: 'patos-de-minas', className: 'ireland-new', city: 'Patos de Minas', state: 'MG', info: 'Expansão e conformidade INMETRO.' },
  { id: 'araxa', className: 'araxa', city: 'Araxá', state: 'MG', info: 'Ponto estratégico de suporte técnico.' },
  { id: 'patrocinio', className: 'patrocinio', city: 'Patrocínio', state: 'MG', info: 'Manutenção e suporte especializado local.' },
  { id: 'frutal', className: 'frutal', city: 'Frutal', state: 'MG', info: 'Limite sul de atendimento presencial.' },
]

const locationPositions: Record<string, string> = {
  usa: 'top-[45%] left-[18%]          max-md:top-[45%] max-md:left-[18%]',
  uk: 'top-[40%] left-[19%]           max-md:top-[40%] max-md:left-[19%]',
  bolivia: 'top-[52%] left-[20%]      max-md:top-[52%] max-md:left-[20%]',
  spain: 'top-[47%] left-[10%]        max-md:top-[47%] max-md:left-[10%]',
  'ireland-new': 'top-[41%] left-[30%] max-md:top-[41%] max-md:left-[30%]',
  araxa: 'top-[49%] left-[27%]        max-md:top-[49%] max-md:left-[27%]',
  patrocinio: 'top-[44%] left-[26%]   max-md:top-[44%] max-md:left-[26%]',
  frutal: 'top-[58%] left-[15%]       max-md:top-[58%] max-md:left-[15%]',
}

export default function Trials() {
  const [activeId, setActiveId] = useState('uberlandia')

  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const ctaImgRef = useRef<HTMLImageElement>(null)
  const boxFirstRef = useRef<HTMLDivElement>(null)
  const boxSecondRef = useRef<HTMLDivElement>(null)
  const ctaTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items: { el: Element; delay: number }[] = [
      { el: headingRef.current!, delay: 0 },
      { el: subtitleRef.current!, delay: 0.12 },
      { el: mapRef.current!, delay: 0.22 },
      { el: ctaImgRef.current!, delay: 0 },
      { el: boxFirstRef.current!, delay: 0.15 },
      { el: boxSecondRef.current!, delay: 0.3 },
      { el: ctaTextRef.current!, delay: 0.18 },
    ].filter(({ el }) => el != null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = el.dataset.animDelay ?? '0s'
            el.classList.add('trials-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    items.forEach(({ el, delay }) => {
      (el as HTMLElement).dataset.animDelay = `${delay}s`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* ── animações de entrada ── */
        .trials-anim       { opacity:0; transform:translateY(32px);  transition:opacity .75s ease, transform .75s ease; }
        .trials-anim-left  { opacity:0; transform:translateX(-28px); transition:opacity .75s ease, transform .75s ease; }
        .trials-anim-scale { opacity:0; transform:scale(0.97);       transition:opacity .8s ease,  transform .8s ease; }
        .trials-visible    { opacity:1 !important; transform:none !important; }

        /* ── location-info hover reveal (desktop only) ── */
        @media screen and (min-width: 992px) {
          .location-info {
            transition: 0.55s ease-out all;
            max-height: 0px;
            display: flex;
            pointer-events: none;
            opacity: 0;
          }
          .location-hover.active .location-info {
            max-height: 500px;
            opacity: 1;
          }
        }

        /*
         * ── BOXES DESKTOP (Farm CSS L3511–3528) ──────────────────────────
         *
         * .fiels-trial-box-info (base):
         *   z-index:1 | position:absolute | inset:0% 0% auto auto
         *   → top:0, right:0 | width:15.8em | height:15.5em
         *
         * .fiels-trial-box-info.second:
         *   top:15.55em | right:15.9em
         */
        .fiels-trial-box-info {
          position: absolute;
          top: 0;
          right: 0;
          bottom: auto;
          left: auto;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 15.8em;
          height: 15.5em;
          padding: 0;
        }
        .fiels-trial-box-info.second {
          top: 15.55em;
          right: 15.9em;
        }

        /*
         * ── BOXES MOBILE @479px (Farm CSS L12828–12841) ──────────────────
         *
         * .fiels-trial-box-info.first:
         *   width:50vw | height:11.38em
         *   inset: -11.38em auto auto 0%
         *   → top:-11.38em | right:auto | bottom:auto | left:0
         *   background:#7c914c → Sticker: rgba(212,165,116,0.15)
         *
         * .fiels-trial-box-info.second:
         *   width:50vw | height:11.38em
         *   inset: -11.38em 0% auto auto
         *   → top:-11.38em | right:0 | bottom:auto | left:auto
         *   background:#596a33 → Sticker: rgba(194,132,122,0.15)
         *
         * NOTA: overflow:visible na .field-trials-cta no mobile
         * é o que permite os boxes subirem acima da seção (top negativo).
         */
        @media screen and (max-width: 479px) {
          .fiels-trial-box-info.first {
            top: -11.38em;
            right: auto;
            bottom: auto;
            left: 0%;
            width: 50vw;
            height: 11.38em;
            background: rgba(2, 4, 9, 0.9) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid #1A3060 !important;
          }
          .fiels-trial-box-info.second {
            top: 10%; /* Posicionado dentro do container para não embolar com o topo */
            right: 0%;
            bottom: auto;
            left: auto;
            width: 50vw;
            height: 11.38em;
            background: rgba(2, 4, 9, 0.9) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid #1A3060 !important;
          }
        }

        /*
         * ── INSIDE DOS BOXES (Farm CSS L4029–4038) ───────────────────────
         * .fiels-trial-box-info--inside:
         *   gap:.75em | flex-col | justify-between | items-start
         *   height:100% | padding:1.5em
         *
         * @479px L12981: padding:1em
         */
        .fiels-trial-box-info--inside {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75em;
          height: 100%;
          padding: 1.5em;
        }
        @media screen and (max-width: 479px) {
          .fiels-trial-box-info--inside {
            padding: 1em;
          }
        }

        /*
         * ── text-27-regular (Farm CSS L3530–3543) ────────────────────────
         * desktop: color:#4c5b20→#D4A574 | font-size:1.69em | weight:500
         *          line-height:120% | display:block
         *
         * @479px L12842: display:none (esconde no mobile — mostra o mobile version)
         */
        .text-27-regular {
          color: #F0F4FF;
          font-size: 1.69em;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: -0.01em;
          margin: 0;
          display: block;
        }
        .text-27-regular.h-100 {
          line-height: 110%;
        }
        @media screen and (max-width: 479px) {
          .text-27-regular {
            display: none;
          }
        }

        /*
         * ── text-27-regular-mobile ───────────────────────────────────────
         * Farm CSS L4465: display:none (desktop)
         * @479px: display:block | color:#fff | font-size:1.3em | line-height:105%
         */
        .text-27-regular-mobile {
          display: none;
          color: #F0F4FF;
          font-size: 1.3em;
          font-weight: 500;
          line-height: 105%;
          letter-spacing: -0.01em;
          margin: 0;
        }
        @media screen and (max-width: 479px) {
          .text-27-regular-mobile {
            display: block;
          }
        }
      `}</style>

      {/*
       * .field-trials
       * Farm L3397: background-color:var(--beige) → #0A0A0A
       * @991px L11192: position:relative
       */}
      <section id="s-trials" className="relative bg-[#020409]">
        <div className="w-full h-full block">

          {/*
           * .field-trials-wrap
           * Farm L3401: grid 1fr 1fr | border-top:1px solid #4e553833
           * @991px L11195: flex-col | display:flex
           * @479px L12796: border-top:none
           */}
          <div className="
            grid grid-cols-2 gap-0
            max-lg:flex max-lg:flex-col
            max-md:border-t-0
          ">

            {/*
             * .field-trials-content
             * Farm L3411: flex-col | justify-between | items-start
             *   max-width:50vw | padding-top:3.13em | overflow:hidden
             * @991px L11199: max-width:100%
             * @479px L12799: padding-top:0 | padding-bottom:12em
             */}
            <div className="
              flex flex-col justify-between items-start
              max-w-[50vw] pt-[3.13em] overflow-hidden
              max-lg:max-w-full
              max-md:pt-0 max-md:pb-[12em]
            ">

              {/*
               * .field-trials-content_heading
               * Farm L3477: width:31em | pl:1.88em | gap:1.5em | flex-col
               * @479px L12812: width:100% | pl:1em | pr:1em
               */}
              <div className="
                flex flex-col gap-[1.5em] w-[31em] pl-[1.88em]
                max-md:w-full max-md:pl-[1em] max-md:pr-[1em]
              ">
                {/*
                 * .field-trials-content_title
                 * Farm L3486: width:19em
                 * @479px L12817: width:auto
                 */}
                <div ref={headingRef} className="w-[19em] max-md:w-auto trials-anim-left">
                  <h2
                    text-split=""
                    className="m-0 font-['Space_Grotesk',sans-serif] tracking-[-0.03em] font-bold text-[3.6em] leading-[93%] max-md:text-[2em] max-md:leading-[100%] w-fit"
                    style={{
                      backgroundImage: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                    }}
                  >
                    Presença Local. Suporte Imediato.
                  </h2>
                </div>

                <div ref={subtitleRef} className="text-[#8AAAD0] uppercase text-[1em] leading-[130%] mb-0 trials-anim">
                  COM SEDE EM UBERLÂNDIA - MG, A MASTER DATA AUTOMAÇÃO É A PARCEIRA ESTRATÉGICA DOS POSTOS NO TRIÂNGULO MINEIRO. GARANTIMOS ATENDIMENTO TÉCNICO PRESENCIAL RÁPIDO PARA QUE SUA OPERAÇÃO NUNCA FIQUE DESAMPARADA.
                </div>
              </div>

              {/*
               * .field-trials-map
               * Farm L3490: width:100% | height:39.5em | transition:all 1s
               * @479px L12820: height:auto
               */}
              <div className="w-full h-[39.5em] transition-all duration-1000 max-md:h-auto">
                <div ref={mapRef} className="relative flex justify-center items-center w-full h-full trials-anim-scale">

                  {/*
                   * .map-item
                   * Farm L3496: flex:none | width:61.75em | max-width:none
                   * @991px: width:100%
                   * @479px L12823: object-fit:cover | object-position:35% 50% | height:22em
                   */}
                  <img
                    src="/images/map.svg"
                    loading="lazy"
                    alt="Mapa de Atuação Master Data"
                    className="flex-none w-[61.75em] max-w-none max-lg:w-full max-md:object-cover max-md:object-[35%_50%] max-md:h-[22em]"
                  />

                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className={`
                        location-hover ${loc.className}
                        absolute cursor-pointer flex justify-center items-center
                        ${locationPositions[loc.className] ?? ''}
                        ${activeId === loc.id ? 'active' : ''}
                      `}
                      onMouseEnter={() => setActiveId(loc.id)}
                      onMouseLeave={() => setActiveId('')}
                    >
                      <div className="relative flex items-center justify-center">
                        {loc.id === 'uberlandia' && (
                          <div className="absolute w-[2.5em] h-[2.5em] bg-[#FFB800] rounded-full animate-ping opacity-30" />
                        )}
                        <img
                          src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/69d6420e002fdcd5f4040c5f_marker.svg"
                          loading="lazy" alt=""
                          style={{ filter: 'invert(75%) sepia(90%) saturate(3000%) hue-rotate(5deg) brightness(105%) contrast(105%)' }}
                          className="relative z-10 w-[1.5em] max-lg:w-[1.25em] max-md:w-[1em]"
                        />
                      </div>
                      <div className="
                        location-info absolute flex-col
                        w-[9.25em] h-[9.25em] bottom-[3.6em] -left-[3em]
                        bg-[rgba(6,14,28,0.85)] backdrop-blur-[12px]
                        border border-[#1A3060] rounded-[0.25em] overflow-hidden
                      ">
                        <div className="flex flex-col gap-[0.4em] p-[1em_1em_1em_1.2em]">
                          <div className="text-[#FFB800] font-mono text-[1.4em] font-medium leading-[105%] tracking-[-0.01em] mt-0 mb-0">
                            {loc.city}, {loc.state}
                          </div>
                          <div className="text-[#8AAAD0] uppercase text-[0.9em] leading-[120%]">
                            {loc.info}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* .plus-wrap — tablet/mobile only */}
                  <div className="
                    hidden
                    max-lg:flex max-lg:justify-center max-lg:items-center
                    max-lg:absolute max-lg:bottom-[2em] max-lg:right-[2em]
                    max-lg:z-[1] max-lg:w-[3.5em] max-lg:h-[3.5em]
                    max-lg:border max-lg:border-[#00D264]
                    max-lg:bg-[#F0F4FF] max-lg:rounded-[0.4em]
                    max-md:w-[2.5em] max-md:h-[2.5em] max-md:bottom-[1em] max-md:right-[1em]
                  ">
                    <img
                      src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68cbaf5aacce1183f44df4a4_8plus.svg"
                      loading="lazy" alt=""
                      style={{ filter: 'invert(52%) sepia(91%) saturate(1518%) hue-rotate(107deg) brightness(101%) contrast(105%)' }}
                      className="w-[1.1em] h-[1.1em] max-md:w-[0.9em] max-md:h-[0.9em]"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/*
             * .field-trials-cta
             * Farm L3421:
             *   justify-content:flex-start | align-items:flex-end
             *   height:57.5em | pb:3.75em | pl:3.75em
             *   display:flex | position:relative | overflow:hidden
             * @991px L11202: pl:1.88em | border-top:1px solid #b7b8a033
             * @479px L12803:
             *   height:32.81em | pl:1em | pr:1em
             *   overflow:VISIBLE ← permite boxes com top negativo subirem acima
             */}
            <div
              data-w-id="9903e210-d82a-41ac-ea03-a62e28cb4a56"
              className="
                relative flex justify-start items-end overflow-hidden
                h-full pb-[3.75em] pl-[3.75em]
                max-lg:pl-[1.88em] max-lg:border-t max-lg:border-[#C8D8F0]
                max-md:h-[48em] max-md:pl-[1em] max-md:pr-[1em] max-md:overflow-visible
              "
            >

              {/* .capsusta-video — vídeo de fundo */}
              <video
                ref={ctaImgRef as any}
                src="/videos/canva1/canva-capsule01.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-0 w-full h-full object-cover object-[25%_50%] trials-anim"
              />

              {/* Camada de Gradiente para legibilidade (Profundidade Master Data) */}
              <div 
                className="absolute inset-0 z-[0] pointer-events-none" 
                style={{ 
                  background: 'linear-gradient(45deg, rgba(3, 6, 15, 0.85) 0%, rgba(6, 14, 28, 0.15) 50%, transparent 100%)' 
                }} 
              />

              {/*
               * .fiels-trial-box-info.first
               * Classes CSS definidas no <style> acima:
               *   Desktop → top:0, right:0, w:15.8em, h:15.5em
               *   @479px  → top:-11.38em, left:0, w:50vw, h:11.38em
               */}
              <div
                ref={boxFirstRef}
                data-w-id="ac7801f1-7ed1-25ee-c7b3-7205520c690c"
                className="fiels-trial-box-info first trials-anim bg-[rgba(2,4,9,0.85)] backdrop-blur-[20px]"
              >
                <div className="fiels-trial-box-info--inside">
                  <div className="max-[479px]:w-[6em]">
                    <h3 className="text-27-regular-mobile">Suporte 24h</h3>
                    <h3 className="text-27-regular">Suporte 24h</h3>
                  </div>
                  <div className="text-[#8AAAD0] uppercase text-[0.9em] leading-[120%]">
                    DISPONÍVEL PARA CLIENTES COM PLANO DE MANUTENÇÃO ATIVO.
                  </div>
                </div>
              </div>

              {/*
               * .fiels-trial-box-info.second
               * Classes CSS definidas no <style> acima:
               *   Desktop → top:15.55em, right:15.9em, w:15.8em, h:15.5em
               *   @479px  → top:-11.38em, right:0, w:50vw, h:11.38em
               */}
              <div
                ref={boxSecondRef}
                data-w-id="6b2ee82d-b3a5-6581-754e-cfad6c04cf04"
                className="fiels-trial-box-info second trials-anim bg-[rgba(2,4,9,0.85)] backdrop-blur-[20px]"
              >
                <div className="fiels-trial-box-info--inside">
                  <div className="max-[479px]:w-[6em]">
                    <h3 className="text-27-regular-mobile">Por que Local?</h3>
                    <h3 className="text-27-regular h-100">Por que Local?</h3>
                  </div>
                  <div className="text-[#8AAAD0] uppercase text-[0.9em] leading-[120%]">
                    PORQUE CADA MINUTO DE POSTO PARADO É PREJUÍZO REAL. ESTAMOS PERTO PARA AGIR RÁPIDO.
                  </div>
                </div>
              </div>

              {/* .field-trials-cta_text */}
              <div ref={ctaTextRef} className="relative z-[1] flex flex-col justify-between items-start gap-[1.25em] trials-anim">
                <div className="w-[34em] max-md:w-full">
                  <h2
                    className="m-0 font-['Space_Grotesk',sans-serif] tracking-[-0.03em] font-bold text-[2.63em] leading-[100%] max-md:text-[2em] w-fit"
                    style={{
                      backgroundImage: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                    }}
                  >
                    Regularize seu posto<br />e assuma o controle<br />total agora.
                  </h2>
                </div>
                <a
                  data-lenis-stop=""
                  href="https://api.whatsapp.com/send/?phone=5534996320082&text&type=phone_number&app_absent=0"
                  className="relative bg-transparent no-underline py-[0.88em] px-[0.75em] transition-all duration-300"
                >
                  <div className="relative z-[1] flex justify-between items-center gap-[0.63em]">
                    <div className="rounded-full w-[0.25em] h-[0.25em] bg-[#F0F4FF]" />
                    <div className="text-[#F0F4FF] uppercase text-[1em] leading-[130%]">SOLICITAR ORÇAMENTO</div>
                    <div className="rounded-full w-[0.25em] h-[0.25em] bg-[#F0F4FF]" />
                  </div>
                  <div className="absolute inset-0 rounded-[0.25em] bg-[#0050FF] hover:bg-[#0040CC] transition-colors duration-300" style={{ zIndex: 0 }} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}