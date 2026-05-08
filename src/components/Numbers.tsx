'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);



    /* ── green-line: scale lateral ── */
    gsap.fromTo(
      '.green-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    /* ── numberstext: fade + slide ── */
    gsap.fromTo(
      '[numberstext]',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    /* ── Video Control: Pausa ao sair da seção ── */
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onLeave: () => {
        videoRef.current?.pause();
        setIsPlaying(false);
      },
      onLeaveBack: () => {
        videoRef.current?.pause();
        setIsPlaying(false);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="s-numbers"
      className="relative z-[6] bg-[#03060F] mt-0 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,210,100,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,100,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >
      <div className="w-full h-full block">
        <div
          className="
            grid grid-cols-2 grid-rows-[auto] h-full min-h-screen
            max-lg:flex max-lg:flex-col
          "
        >
          {/* Coluna do Vídeo */}
          <div
            className="
              relative h-full overflow-hidden
              max-lg:order-1 max-lg:w-full max-lg:h-[50em]
              max-md:h-[30.63em]
            "
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              poster="/videos/pasta-numbers/imagem-numbers.jpeg"
              className="absolute inset-0 w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source
                type="video/webm"
                src="/videos/pasta-numbers/video-numbers.webm"
              />
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div 
                onClick={handleTogglePlay}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/10 transition-all hover:bg-black/20 group"
              >
                <div className="w-[6em] h-[6em] rounded-full bg-[#F0F4FF]/10 backdrop-blur-xl border border-[#F0F4FF]/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#F0F4FF]/40">
                  <div className="w-0 h-0 border-t-[1.2em] border-t-transparent border-l-[1.8em] border-l-[#F0F4FF] border-b-[1.2em] border-b-transparent ml-[0.5em] opacity-80" />
                </div>
                <div className="mt-[1.5em] font-jetbrains text-[0.7em] tracking-[0.3em] uppercase text-[#F0F4FF] opacity-60 group-hover:opacity-100 transition-opacity">
                  Assistir Demonstração
                </div>
              </div>
            )}

          </div>

          {/* Coluna de Conteúdo */}
          <div
            className="
              flex flex-col justify-between items-start
              gap-[10em]
              pt-[3.13em] pr-[var(--padding-web)] pb-[3.13em] pl-[3.13em]
              max-lg:w-full max-lg:pl-[var(--padding-web)]
              max-md:gap-[4em] max-md:p-[4em_1em]
            "
          >
            <h2
              text-split-delay="0.2"
              className="
                block text-master-ice tracking-[-0.03em] font-space font-bold
                text-[3.6em] leading-[93%] mt-0 mb-0
                max-md:text-[2em] max-md:leading-[100%]
              "
            >
              Autoridade em Automação de Postos no Triângulo Mineiro.
              <br />

            </h2>

            <div
              className="
                relative flex flex-col gap-[3.2em] w-full pb-[5em]
                max-md:gap-[2.38em]
              "
            >
              {/* Item 1: +150 */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                <div
                  numberstext=""
                  className="
                    text-master-ice tracking-[-0.02em] font-bold font-jetbrains tabular-nums
                    text-[4.5em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  +150
                </div>
                <div
                  numberstext=""
                  className="text-master-slate font-jetbrains font-medium text-[1em] leading-[130%] mb-0"
                >
                  Postos Automatizados no Triângulo Mineiro e MG.
                </div>
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left bg-master-ice"
                />
              </div>

              {/* Item 2: 94% */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                <div
                  numberstext=""
                  className="
                    text-master-orange tracking-[-0.02em] font-bold font-jetbrains tabular-nums
                    text-[4.5em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  94%
                </div>
                <div
                  numberstext=""
                  className="text-master-slate font-jetbrains font-medium text-[1em] leading-[130%] mb-0"
                >
                  Redução em Desvios de Combustível e Erros Operacionais.
                </div>
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left bg-master-orange"
                />
              </div>

              {/* Item 3: <4h */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                <div
                  numberstext=""
                  className="
                    text-master-ice tracking-[-0.02em] font-bold font-jetbrains tabular-nums
                    text-[4.5em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  &lt;4h
                </div>
                <div
                  numberstext=""
                  className="text-master-slate font-jetbrains font-medium text-[1em] leading-[130%] mb-0"
                >
                  Tempo de Resposta Técnica em Uberlândia e Região.
                </div>
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left bg-master-ice"
                />
              </div>

              {/* Item 4: 10+ */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                <div
                  numberstext=""
                  className="
                    text-master-orange tracking-[-0.02em] font-bold font-jetbrains tabular-nums
                    text-[4.5em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  10+
                </div>
                <div
                  numberstext=""
                  className="text-master-slate font-jetbrains font-medium text-[1em] leading-[130%] mb-0"
                >
                  Anos Liderando o Mercado de Automação Industrial.
                </div>
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left bg-master-orange"
                />
              </div>

              {/* Rodapé da seção */}
              <div
                className="
                  absolute bottom-0 left-0 w-[26em]
                  max-md:w-[90%] max-md:bottom-[1em]
                "
              >
                <div
                  className="
                    text-master-slate font-inter
                    text-[12px] leading-[120%] flex-none
                  "
                >
                  *Metodologia baseada em auditorias técnicas de campo e métricas de performance histórica de nossos parceiros.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}