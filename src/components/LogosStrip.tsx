/*
 * LogosStrip.tsx — Barra de logos com scroll infinito (marquee)
 * v4 — cores fundidas ao fundo da hero (#03060F · paleta Master Data)
 */

const logos = [
  {
    src: '/images/LOGOS/ADAPTIVE-LOGO.png',
    alt: 'Adaptive',
    width: 'w-[9.38em] max-lg:w-[7.5em]',
  },
  {
    src: '/images/LOGOS/GILBARCO-LOGO-PNG.png',
    alt: 'Gilbarco Veeder-Root',
    width: 'w-[8.5em] max-lg:w-[7em]',
  },
  {
    src: '/images/LOGOS/LOGO-COMPANYTEC.png',
    alt: 'Companytec',
    width: 'w-[10.5em] max-lg:w-[9em]',
  },
  {
    src: '/images/LOGOS/logo-petros.png',
    alt: 'Petros',
    width: 'w-[9.5em] max-lg:w-[8em]',
  },
]

export default function LogosStrip() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logos-marquee {
          animation: marquee 60s linear infinite;
        }
        .logos-marquee:hover {
          animation-play-state: paused;
        }

        /* Logos filtradas: converte para branco frio e aplica tom azul-noite */
        .logo-img {
          filter:
            brightness(0) invert(1)
            sepia(1)
            hue-rotate(190deg)
            saturate(0.25)
            brightness(0.55);
          transition: filter 0.35s ease, opacity 0.35s ease;
          opacity: 0.55;
        }
        .logo-img:hover {
          filter:
            brightness(0) invert(1)
            sepia(1)
            hue-rotate(195deg)
            saturate(0.4)
            brightness(0.85);
          opacity: 0.85;
        }

        /* Fade lateral — dissolve as logos no fundo exatamente como a hero */
        .logos-fade-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #03060F 12%,
            #03060F 88%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #03060F 12%,
            #03060F 88%,
            transparent 100%
          );
        }
      `}</style>

      <div
        className="
          relative z-[3] flex items-center
          w-full overflow-hidden
          h-[17em] bg-[#03060F]
          max-lg:h-[18em]
          max-md:h-auto max-md:py-[2em]
        "
      >
        {/* Linha divisória superior sutil — igual à borda da hero */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#03060F]" />

        {/* Container com fade lateral */}
        <div className="logos-fade-mask w-full overflow-hidden">
          <div
            className="
              logos-marquee flex items-center w-max
              gap-[3.5em] max-lg:gap-[3em] max-md:gap-[2em]
            "
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
              <img
                key={`${i}-${logo.alt}`}
                src={logo.src}
                loading="lazy"
                alt={i >= logos.length ? '' : logo.alt}
                aria-hidden={i >= logos.length ? 'true' : undefined}
                className={`${logo.width} flex-shrink-0 logo-img`}
              />
            ))}
          </div>
        </div>

        {/* Linha divisória inferior sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#03060F]" />
      </div>
    </>
  )
}