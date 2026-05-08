import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTABlock() {
  const sectionRef = useRef<HTMLElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (sectionEl) {
      gsap.set(sectionEl, { autoAlpha: 0, y: 24 })
      ScrollTrigger.create({
        trigger: sectionEl, start: 'top 90%',
        onEnter: () => gsap.to(sectionEl, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power2.out' }),
      })
    }
    const descEl = descRef.current
    if (descEl) {
      gsap.set(descEl, { autoAlpha: 0, y: 20 })
      ScrollTrigger.create({
        trigger: descEl, start: 'top 90%',
        onEnter: () => gsap.to(descEl, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 }),
      })
    }
    const btnsEl = btnsRef.current
    if (btnsEl) {
      gsap.set(btnsEl, { autoAlpha: 0, y: 28 })
      ScrollTrigger.create({
        trigger: btnsEl, start: 'top 90%',
        onEnter: () => gsap.to(btnsEl, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.35 }),
      })
    }
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()) }
  }, [])

  return (
    /*
     * .cta-block
     * Farm L3558: z-index:2 | pr:0 | pl:var(--padding-web≈1.88em)
     *   bg:#596a33 → Sticker:#0A0A0A | position:relative
     * @991px L11210: overflow:hidden
     * @479px L12856: height:50.69em | pl:1em | pr:0
     *
     * ⚠️ SEM mx-auto — o .cta-block-wrap é filho direto da section.
     * O padding-left da section já posiciona o conteúdo à esquerda.
     */
    <section
      ref={sectionRef}
      animate="h2"
      className="
        relative z-[2] bg-[#E8EEF8]
        pr-0 pl-[1.88em]
        max-[991px]:overflow-hidden
        max-[479px]:h-[50.69em] max-[479px]:pl-[1em] max-[479px]:pr-0
      "
    >

      {/*
       * .w-layout-blockcontainer.container (Farm index L1139)
       * Farm CSS L2172: display:block — sem max-width limitante aqui.
       * ⚠️ NÃO usar mx-auto — causaria centralização incorreta.
       */}
      <div className="block w-full h-full max-[479px]:z-[3]">

        {/*
         * .cta-block-wrap
         * Farm L3566: justify-between | items-start | display:flex
         * @991px L11213: position:relative
         * @479px L12861: height:100% | padding-top:4em
         */}
        <div className="
          flex justify-between items-start
          max-[991px]:relative
          max-[479px]:h-full max-[479px]:pt-[4em]
        ">

          {/*
           * .cta-block-text
           * Farm L3572: gap:16.25em | flex-col | pt:5.63em | pb:7em
           * @479px L12865: gap:1.63em | pt:0 | pb:0
           */}
          <div className="
            flex flex-col gap-[16.25em] pt-[5.63em] pb-[7em]
            max-[479px]:gap-[1.63em] max-[479px]:pt-0 max-[479px]:pb-0
          ">

            {/*
             * .cta-block-heading
             * Farm L3581: gap:1.5em | flex-col | width:32.6em
             * @991px L11216: width:26em
             * @479px L12871: gap:1.2em | width:100%
             */}
            <div className="
              flex flex-col gap-[1.5em] w-[32.6em]
              max-[991px]:w-[26em]
              max-[479px]:gap-[1.2em] max-[479px]:w-full
            ">

              {/*
               * .h2-cta-heading
               * Farm @479px L13183: width:16em
               */}
              <div className="max-[479px]:w-[16em]">
                <h2 className="
                  m-0 font-[Aeonik,Arial,sans-serif]
                  text-[3.6em] font-semibold leading-[93%] tracking-[-0.01em]
                  text-[#03060F]
                  max-[991px]:text-[3em]
                  max-[479px]:text-[1.9em] max-[479px]:leading-[100%]
                ">
                  Veja a Eficiência<br />Em Cada Detalhe
                </h2>
              </div>

              {/*
               * .cta-block-description
               * Farm @991px L11416: width:90%
               */}
              <div className="max-[991px]:w-[90%]">
                <div
                  ref={descRef}
                  inner="animate"
                  className="
                    m-0 font-[Aeonik,Arial,sans-serif]
                    text-[1em] leading-[130%] uppercase
                    text-[#4A6A9A]
                    max-[991px]:text-[0.9em]
                    max-[479px]:text-[0.8em]
                  "
                >
                  Entenda como a tecnologia de ponta e o suporte especializado da Master Data transformam a operação do seu posto. Analisamos cada infraestrutura individualmente para garantir que nossos sistemas entreguem o máximo de controle, segurança e lucratividade para o seu negócio na região de Uberlândia.
                </div>
              </div>

            </div>

            {/*
             * .cta-btns
             * Farm L3589: gap:1.25em | display:flex
             * @479px L12876: gap:.8em | flex-col | items-start
             */}
            <div
              ref={btnsRef}
              className="
                flex gap-[1.25em]
                max-[479px]:flex-col max-[479px]:items-start max-[479px]:gap-[0.8em]
              "
            >
              {/* BOTÃO PRIMÁRIO — fundo bone, texto dark */}
              <a
                data-lenis-stop=""
                apply="open"
                href="https://api.whatsapp.com/send/?phone=5534996320082&text&type=phone_number&app_absent=0"
                className="relative inline-block max-w-full p-[0.88em_0.75em] no-underline transition-all duration-300"
              >
                <div className="relative z-[1] flex items-center justify-between gap-[0.63em]">
                  <span className="block flex-none w-[0.25em] h-[0.25em] rounded-full bg-[#F0F4FF]" />
                  <div className="flex-none font-[Aeonik,Arial,sans-serif] text-[0.9em] leading-[120%] uppercase text-[#F0F4FF] max-[479px]:text-[0.85em]">
                    SOLICITAR DIAGNÓSTICO
                  </div>
                  <span className="block flex-none w-[0.25em] h-[0.25em] rounded-full bg-[#F0F4FF]" />
                </div>
                <div className="absolute inset-0 border-none bg-[#0050FF] rounded-[0.25em]" />
              </a>

              {/* BOTÃO SECUNDÁRIO — borda bone, texto bone */}
              <a
                href="https://api.whatsapp.com/send/?phone=5534996320082&text&type=phone_number&app_absent=0"
                className="relative inline-block max-w-full p-[0.88em_0.75em] no-underline transition-all duration-300"
              >
                <div className="relative z-[1] flex items-center justify-between gap-[0.63em]">
                  <span className="block flex-none w-[0.25em] h-[0.25em] rounded-full bg-[#0050FF]" />
                  <div className="font-[Aeonik,Arial,sans-serif] text-[0.9em] leading-[120%] uppercase text-[#0050FF] max-[479px]:text-[0.85em]">
                    CONSULTAR ESPECIALISTA
                  </div>
                  <span className="block flex-none w-[0.25em] h-[0.25em] rounded-full bg-[#0050FF]" />
                </div>
                <div className="absolute inset-0 border-[0.08em] border-solid border-[#0050FF] rounded-[0.25em]" />
              </a>
            </div>
          </div>

          {/*
           * .cta-img-wrap
           * Farm L3595: width:47.25em | height:38.8em | relative | overflow:hidden
           * @991px L11219: width:36em | position:absolute | inset:-.8em 0% auto auto
           * @479px L12883: width:100% | inset:auto 0% 2% auto
           */}
          <div className="
            relative overflow-hidden w-[47.25em] h-[38.8em]
            max-[991px]:absolute max-[991px]:-top-[0.8em] max-[991px]:right-0 max-[991px]:w-[36em]
            max-[479px]:top-auto max-[479px]:bottom-[2%] max-[479px]:w-full
          ">
            <img src="/images/CTABlock/Foto1-central.avif" loading="lazy" alt="Master Data Eficiência"
              className="absolute bottom-[6.1em] left-[13.8em] block w-[20.3em] border-[2px] border-solid border-[#0050FF] max-[991px]:bottom-[7.1em] max-[991px]:w-[17em] max-[479px]:left-[8.6em] max-[479px]:w-[12.94em]"
            />
            <img src="/images/CTABlock/Foto2—Superior Esquerda (150px).avif" loading="lazy" alt=""
              className="absolute bottom-[26.4em] -left-[0.2em] block w-[9.5em] border-[2px] border-solid border-[#0050FF] max-[991px]:bottom-[27.3em] max-[991px]:left-[8.2em] max-[991px]:w-[8em] max-[479px]:bottom-[18em] max-[479px]:left-0 max-[479px]:w-[5.88em]"
            />
            <img src="/images/CTABlock/Foto3—Inferior Esquerda (80px).avif" loading="lazy" alt=""
              className="absolute bottom-[1.1em] left-[8.7em] block w-[5em] border-[2px] border-solid border-[#0050FF] max-[991px]:bottom-[2.1em] max-[991px]:left-[9.7em] max-[991px]:w-[4em] max-[479px]:bottom-[3.6em] max-[479px]:left-[5.2em] max-[479px]:w-[3.38em]"
            />
            <img src="/images/CTABlock/Foto4-Superior-Topo(80px).avif" loading="lazy" alt=""
              className="absolute bottom-[35.8em] left-[9.3em] block w-[5em] border-[2px] border-solid border-[#0050FF] max-[991px]:bottom-[35.3em] max-[991px]:left-[16.1em] max-[991px]:w-[4em] max-[479px]:bottom-[23.8em] max-[479px]:left-[5.8em] max-[479px]:w-[3em]"
            />
            <img src="/images/CTABlock/Foto5—Lateral-Direita(175px).avif" loading="lazy" alt=""
              className="absolute -right-[3.3em] bottom-0 block w-[10.9em] border-[2px] border-solid border-[#0050FF] max-[991px]:hidden"
            />
            <img src="/images/CTABlock/Foto6—Superior-Direita(168px).avif" loading="lazy" alt=""
              className="absolute bottom-[26.4em] left-[34.2em] block w-[10.5em] border-[2px] border-solid border-[#0050FF] max-[991px]:bottom-[24em] max-[991px]:left-[30.9em] max-[991px]:w-[8em] max-[479px]:left-[18.2em] max-[479px]:w-[6.56em]"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
