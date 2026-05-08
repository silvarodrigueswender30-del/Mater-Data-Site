export default function Procedures() {
  return (
    <>
      {/*
       * .carbon-cost
       * Farm CSS L3183: background-color:var(--beige) → #0A0A0A | height:100vh
       * @991px L11140: height:auto
       */}
      <section
        id="s-carbon"
        className="relative h-screen max-[991px]:h-auto overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #03060F 0%, #020409 100%)'
        }}
      >

        {/*
         * Container — SEM mx-auto e SEM max-w
         * Farm CSS: o .carbon-cost-wrap é filho direto de .carbon-cost (section)
         * Não existe container intermediário com max-width na Farm.
         * O mx-auto + max-w-[940px] que estava aqui antes era o que centralizava
         * o conteúdo incorretamente. Removido.
         */}
        <div className="w-full h-full block">

          {/*
           * .carbon-cost-wrap
           * Farm CSS L3188:
           *   grid-template-columns: 1fr 1fr
           *   grid-template-rows: auto
           *   gap: 0
           *   height: 100%
           *   display: grid
           *
           * @991px L11143:
           *   flex-flow: column
           *   justify-content: flex-start
           *   align-items: flex-start
           *   display: flex
           */}
          <div className="
            grid grid-cols-2 gap-0 h-full
            max-[991px]:flex max-[991px]:flex-col
            max-[991px]:items-start max-[991px]:justify-start
          ">

            {/*
             * .carbon-content
             * Farm CSS L3198:
             *   height: 100%
             *   padding: 3.13em var(--padding-web≈1.88em) 3.13em 3.13em
             *   border-bottom: 1px solid #4e553833 → Sticker: rgba(212,165,116,0.20)
             *   flex-flow: column
             *   justify-content: space-between
             *   align-items: flex-start   ← CRÍTICO: alinha conteúdo à esquerda
             *   display: flex
             *
             * @991px L11149:
             *   width: 38em
             *   padding-left: var(--padding-web≈1.88em)
             *   gap: 3em (grid-row-gap + grid-column-gap)
             *
             * @479px L12722:
             *   border-bottom-style: none
             *   width: 100%
             *   padding: 4em 1em
             */}
            <div className="
              h-full
              pt-[3.13em] pr-[1.88em] pb-[3.13em] pl-[3.13em]
              bg-white/5 backdrop-blur-md border border-white/10
              flex flex-col justify-between items-start
              max-[991px]:w-[38em] max-[991px]:pl-[1.88em] max-[991px]:gap-y-[3em]
              max-[479px]:border-b-0 max-[479px]:w-full max-[479px]:p-[4em_1em]
            ">

              {/*
               * .h2-style.green
               * Farm CSS: font-size:3.6em | line-height:93% | font-weight:500
               *           letter-spacing:-.03em | color:var(--heading-color)
               *           display:block | margin:0
               * Sticker: cor → #D4A574 (gold)
               * @479px: não tem regra específica de font-size no carbon —
               *   usa o padrão herdado de 2.4em que já aplicamos
               */}
              <h2
                text-split=""
                className="
                  block m-0
                  font-[Aeonik,Arial,sans-serif]
                  text-[3.6em] font-medium leading-[93%] tracking-[-0.03em]
                  text-[#F0F4FF]
                  max-[479px]:text-[2.4em]
                "
              >
                Controle Total — Sem Dependência de Planilhas Manuais.
              </h2>

              {/*
               * .carbon-description
               * Farm CSS L3250:
               *   gap: 2.63em (grid-column-gap + grid-row-gap)
               *   flex-flow: column
               *   justify-content: flex-start
               *   align-items: flex-start
               *   width: 32.9em
               *   display: flex
               *
               * @479px L12730: width: 100%
               */}
              <div className="
                flex flex-col items-start justify-start
                gap-y-[2.63em]
                w-[32.9em]
                max-[479px]:w-full
              ">

                {/*
                 * .text-18-caps
                 * Farm CSS L3208:
                 *   color: var(--main-green) → Sticker: #C2847A (nude)
                 *   text-transform: uppercase
                 *   font-family: Aeonik, Arial, sans-serif
                 *   font-size: 1.13em
                 *   line-height: 120%
                 *
                 * @991px L11155: font-size: 1em
                 * @479px L12727: font-size: .86em
                 */}
                <div className="
                  font-[Aeonik,Arial,sans-serif]
                  text-[1.13em] leading-[120%] uppercase
                  text-[#F0F4FF]
                  max-[991px]:text-[1em]
                  max-[479px]:text-[.86em]
                ">
                  DECIDA COM BASE EM DADOS REAIS, NÃO EM SUPOSIÇÕES.
                  <br />
                  <br />
                  NA MASTER DATA, INTEGRAMOS TODA A SUA OPERAÇÃO
                  DESDE O MONITORAMENTO REMOTO DE TANQUES
                  ATÉ O FECHAMENTO DE CAIXA AUTOMÁTICO, COLOCANDO A GESTÃO DO SEU POSTO NA PALMA DA SUA MÃO.
                </div>

                {/*
                 * .btn-green
                 * Farm CSS L3260:
                 *   background-color: transparent
                 *   flex: none
                 *   padding: .88em .75em
                 *   text-decoration: none
                 *   position: relative
                 *
                 * @991px L11158: flex: none
                 */}
                <a
                  href="https://api.whatsapp.com/send/?phone=5534996320082&text&type=phone_number&app_absent=0"
                  className="
                    relative flex-none
                    py-[.88em] px-[.75em]
                    no-underline bg-transparent
                  "
                >
                  {/* btn-content: z-1, flex, justify-between, items-center, gap-.63em */}
                  <div className="
                    relative z-[1]
                    flex items-center justify-between
                    gap-x-[.63em]
                  ">
                    <span className="rounded-full w-[.25em] h-[.25em] bg-[#0050FF] flex-none" />
                    <span className="
                      font-[Aeonik,Arial,sans-serif]
                      text-[1em] leading-[130%] uppercase
                      text-[#0050FF] mb-0
                    ">
                      SUPORTE ESPECIALIZADO
                    </span>
                    <span className="rounded-full w-[.25em] h-[.25em] bg-[#0050FF] flex-none" />
                  </div>

                  {/* btn-background green: borda dourada, sem preenchimento */}
                  <div className="
                    absolute inset-0 w-full
                    rounded-[.25em]
                    border-[.08em] border-[#0050FF]
                  " />
                </a>
              </div>
            </div>

            {/*
             * .potato-wrap
             * Farm CSS L4431:
             *   width: 100%
             *   height: 100vh
             *   display: block
             *   position: relative
             *   overflow: hidden
             *
             * @991px L11396: height: 50em
             * @479px L13117: height: 30.63em
             */}
            <div className="
              block w-full h-screen
              relative overflow-hidden
              max-[991px]:h-[50em]
              max-[479px]:h-[30.63em]
            ">

              {/*
               * .potato-img
               * Farm CSS L3268: object-fit:cover | width:100% | height:120vh
               * @991px L11161: height:120% | overflow:visible
               * @479px L12733: object-fit:cover | flex:none | height:38em
               */}
              <img
                src="/images/controle.avif"
                loading="lazy"
                alt="Controle Master Data"
                className="
                  object-cover w-full h-[120vh]
                  max-[991px]:h-[120%] max-[991px]:overflow-visible
                  max-[479px]:object-cover max-[479px]:flex-none max-[479px]:h-[38em]
                "
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}