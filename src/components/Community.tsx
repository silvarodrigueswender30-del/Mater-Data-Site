import { useState } from 'react'

const TEST_IMG = '/images/teste2.jpeg'

const slides = [
  {
    id: 1,
    href: '/resultados/lucratividade',
    title: 'Lucratividade Sob Controle',
    description:
      'Elimine furos de estoque e divergências de caixa com monitoramento em tempo real. Tenha a visão clara de cada gota que entra e sai do seu posto.',
    src: '/images/Community/Card1.avif',
    alt: 'Monitoramento de Estoque Master Data',
  },
  {
    id: 2,
    href: '/resultados/blindagem',
    title: 'Blindagem Regulatória',
    description:
      'Evite multas pesadas e interdições com sistemas 100% adequados às exigências da ANP e INMETRO. Suporte técnico local para garantir sua operação 24/7.',
    src: '/images/Community/Card2.avif',
    alt: 'Conformidade ANP e INMETRO Master Data',
  },
  {
    id: 3,
    href: '/resultados/automacao',
    title: 'Automação Inteligente',
    description:
      'Integre bombas, tanques e conveniência em uma única interface intuitiva. Transforme dados operacionais em decisões estratégicas para escalar seu negócio.',
    src: '/images/Community/Card3.avif',
    alt: 'Automação Inteligente de Postos',
  },
]

export default function Community() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <>
      <style>{`
        .splide__img {
          transition: transform 0.65s cubic-bezier(0.23, 1, 0.32, 1);
          transform: scale(1);
        }
        .splide__item:hover .splide__img {
          transform: scale(1.05);
        }
        @media screen and (max-width: 991px) {
          .splide__item:hover .splide__img {
            transform: scale(1) !important;
          }
        }
      `}</style>

      <section
        className="relative h-[57em] max-[479px]:h-[48em] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Community/fundo.avif')",
          transform: 'scaleX(-1)' // Espelhando a foto para o posto mudar de lado
        }}
      >
        {/* Container interno espelhado de volta para o texto não ficar invertido */}
        <div className="block w-full h-full" style={{ transform: 'scaleX(-1)' }}>
          <div className="pt-[5.31em] pr-0 pl-[1.88em] max-[479px]:pt-[4.63em] max-[479px]:pl-[1em] max-[479px]:pr-[1em]">

            <h2
              text-split=""
              className="m-0 font-['Space_Grotesk',sans-serif] text-[3.6em] font-bold leading-[93%] tracking-[-0.03em] max-[991px]:text-[3em] max-[479px]:text-[1.9em] max-[479px]:leading-[100%] w-fit"
              style={{
                backgroundImage: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block"
              }}
            >
              Ecossistema <br /> Master Data
            </h2>

            <div className="mt-[2.19em] flex">
              <div className="relative flex w-full items-start justify-between translate-x-0 max-[991px]:gap-[7em] max-[479px]:gap-0">

                {/* SETAS */}
                <div className="flex flex-none flex-row items-start justify-start gap-[0.63em] h-[3.38em] max-h-[3.38em] static translate-y-[30em] max-[991px]:translate-y-[27.9em] max-[479px]:absolute max-[479px]:[inset:0%_auto_auto_0%] max-[479px]:translate-y-[28.8em]">
                  <button
                    onClick={prevSlide}
                    aria-label="Anterior"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2303060F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l-6-6 6-6'/%3E%3C/svg%3E")`,
                      backgroundSize: '0.94em 0.94em',
                      backgroundPosition: '50%',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className="block cursor-pointer border-0 w-[3.38em] h-[3.38em] p-0 rounded-[0.13em] bg-[#00D264] transition-all duration-300"
                  />
                  <button
                    onClick={nextSlide}
                    aria-label="Próximo"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2303060F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 18l6-6-6-6'/%3E%3C/svg%3E")`,
                      backgroundSize: '0.94em 0.94em',
                      backgroundPosition: '50%',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className="block cursor-pointer border-0 w-[3.38em] h-[3.38em] p-0 rounded-[0.13em] bg-[#00D264] transition-all duration-300"
                  />
                </div>

                {/* TRACK */}
                <div className="relative overflow-hidden w-[66em] max-h-[40.94em]">
                  <div
                    role="list"
                    className="flex w-full"
                    style={{
                      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {slides.map((slide) => (
                      <div
                        key={slide.id}
                        role="listitem"
                        className="relative flex flex-none items-end justify-end overflow-hidden w-[28.56em] h-[33.88em] max-[991px]:w-[25em] max-[991px]:h-[31.1em] max-[479px]:w-[22.4em] max-[479px]:h-[28.06em]"
                      >
                        <a
                          href={slide.href}
                          className="splide__item relative flex flex-none items-end justify-end overflow-hidden w-full h-full no-underline"
                        >
                          <img
                            src={slide.src}
                            loading="lazy"
                            alt={slide.alt}
                            sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                            className="splide__img absolute inset-0 w-full h-full object-cover"
                          />

                          <div className="relative z-[1] flex flex-col items-start justify-between w-[18em] h-[20.94em] p-[1.5em_1.25em] bg-[#0A1428] backdrop-blur-[20px] border border-[#0D1F3C] rounded-[0.13em] max-[479px]:w-[17.88em] max-[479px]:h-[16em]">
                            <div className="flex flex-col items-start justify-between w-[15.4em] h-full">
                              <div className="font-sans text-[1.25em] font-medium leading-[120%] uppercase w-[90%] text-[#F0F4FF] max-[991px]:text-[1.2em]">
                                {slide.title}
                              </div>
                              <div className="font-sans text-[1em] leading-[130%] uppercase mb-0 text-[#4A6A9A] max-[991px]:text-[0.9em] max-[479px]:text-[0.8em]">
                                {slide.description}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
