export default function Products() {
    return (
        <>
            {/* ─── #products ─── */}
            <section
                id="products"
                data-w-id="688441f0-da8a-8314-aeea-06fbd64feb48"
                className="
                    relative w-full
                    bg-[#020409]
                    pt-[6em] pb-[15em] px-[1.88em]
                    max-[991px]:pb-[10em] max-[991px]:px-0
                    max-[479px]:pt-[4em] max-[479px]:pb-[7em]
                "
            >
                <section className="w-full max-w-none h-full block">
                    {/* prodcuts-wrap — typo preservado intencionalmente do DOM original */}
                    <div className="prodcuts-wrap">

                        {/* products-heading-wrap */}
                        <div
                            className="
                                flex justify-between items-end
                                max-[991px]:px-[1.88em]
                                max-[479px]:flex-col max-[479px]:items-start
                                max-[479px]:gap-y-[1.2em] max-[479px]:px-[1em]
                            "
                        >
                            {/* products-heading */}
                            <div className="w-[44.25em] max-[991px]:w-full">
                                {/*
                                    h2-style green →
                                    font: Aeonik 3.6em / 93% weight-500 tracking-[-0.03em]
                                    cor: --heading-color substituída por --sticker-gold
                                */}
                                <h2
                                    text-split=""
                                    className="
                                        m-0
                                        font-['Space_Grotesk',sans-serif]
                                        text-[3.6em] font-bold leading-[93%]
                                        tracking-[-0.03em]
                                        max-[479px]:text-[2.6em]
                                        w-fit
                                    "
                                    style={{
                                        backgroundImage: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        display: "inline-block"
                                    }}
                                >
                                    Para sua Operação.
                                    <br />
                                    Para seu Lucro.
                                </h2>
                            </div>
                        </div>

                        {/* products-items — grid 3 colunas desktop / flex scroll tablet + mobile */}
                        <div
                            className="
                                grid grid-cols-3 gap-[1.88em]
                                mt-[12em]
                                max-[991px]:flex max-[991px]:flex-row max-[991px]:overflow-x-scroll
                                max-[991px]:mt-0 max-[991px]:pt-[10em] max-[991px]:pb-[10em]
                                max-[991px]:px-[1.88em]
                                max-[479px]:gap-[1em]
                                max-[479px]:pt-[7em] max-[479px]:px-[1em] max-[479px]:pb-[14em]
                                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                            "
                        >

                            {/* ── produto 1 ── */}
                            <a
                                data-w-id="2a7c0fd0-825e-1061-a699-548e219ea8ab"
                                href="/procedimentos/crioendolift"
                                className="
                                    product-item product-1
                                    relative flex items-end justify-center
                                    h-[23.88em] p-[1.25em] rounded-[0.4em]
                                    bg-[#0A1428] backdrop-blur-[20px]
                                    border border-[#0D1F3C] hover:border-[#0050FF] transition-colors duration-300
                                    no-underline
                                    max-[991px]:flex-none max-[991px]:w-[25em]
                                    max-[479px]:w-[19em] max-[479px]:flex-col max-[479px]:justify-end
                                "
                            >
                                {/* Data Flow Effect */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10 z-0"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 80, 255, 0.4) 50%, transparent 100%)',
                                        backgroundSize: '200% 100%',
                                        animation: 'dataFlow 6s linear infinite'
                                    }}
                                />
                                <img
                                    src="/images/Products/bombas.webp"
                                    loading="lazy"
                                    alt="Automação de Bombas e Dispensers"
                                    className="
                                        absolute z-[1] w-[25em] top-[-8.5em] left-1/2 -translate-x-1/2
                                        max-[479px]:w-[14em] max-[479px]:top-[-2.5em]
                                    "
                                />
                                {/* Lottie hover */}
                                <div
                                    data-is-ix2-target="1"
                                    className="absolute z-[1] w-[27.5em] top-[-6em]"
                                    data-w-id="6415f455-13f8-0410-b449-5a777c8c7ee1"
                                    data-animation-type="lottie"
                                    data-src=""
                                    data-loop="0"
                                    data-direction="1"
                                    data-autoplay="0"
                                    data-renderer="svg"
                                    data-default-duration="0"
                                    data-duration="5"
                                    data-ix2-initial-state="0"
                                />
                                <div className="product-description w-full max-[479px]:absolute max-[479px]:bottom-[1.25em] max-[479px]:left-[1.25em] max-[479px]:w-[calc(100%-2.5em)] max-[479px]:z-[10]">
                                    <div
                                        className="
                                            flex flex-col gap-y-[0.75em]
                                            w-[21em]
                                            max-[479px]:w-[85%]
                                        "
                                    >
                                        <h3
                                            className="
                                                m-0
                                                font-[Aeonik,Arial,sans-serif]
                                                text-[2em] font-normal leading-[100%]
                                                text-[#F0F4FF]
                                                max-[479px]:text-[1.6em] max-[479px]:leading-[99%]
                                            "
                                        >
                                            Automação de Bombas<br className="max-[479px]:block hidden" /> e Dispensers
                                        </h3>
                                        <div
                                            className="
                                                font-[Aeonik,Arial,sans-serif]
                                                text-[1em] leading-[130%]
                                                uppercase
                                                text-[#4A6A9A]
                                                mb-0
                                            "
                                        >
                                            INTEGRAÇÃO TOTAL EM TEMPO REAL. CONFORMIDADE COM O INMETRO E CONTROLE ABSOLUTO DE CADA GOTA ABASTECIDA.
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="
                                        absolute z-[2]
                                        top-[0.63em] right-[0.63em]
                                        flex items-center justify-center
                                        w-[3.38em] h-[3.38em] rounded-[0.13em]
                                        bg-[rgba(0,80,255,0.1)]
                                        max-[479px]:w-[3em] max-[479px]:h-[3em]
                                    "
                                >
                                    <div className="text-[#00D264] w-[0.75em]">
                                        <svg width="100%" height="100%" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.7627 11.5605H10.3623V3.25098L1.55762 12.0557L0.567383 11.0654L9.37207 2.26074H1.0625V0.860352H11.7627V11.5605Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </a>

                            {/* ── produto 2 ── */}
                            <a
                                href="/procedimentos/ultra-md"
                                className="
                                    product-item product-2
                                    relative flex items-end justify-center
                                    h-[23.88em] p-[1.25em] rounded-[0.4em]
                                    bg-[#0A1428] backdrop-blur-[20px]
                                    border border-[#0D1F3C] hover:border-[#0050FF] transition-colors duration-300
                                    no-underline
                                    max-[991px]:flex-none max-[991px]:w-[25em]
                                    max-[479px]:w-[19em] max-[479px]:flex-col max-[479px]:justify-end
                                "
                            >
                                {/* Data Flow Effect */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10 z-0"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 80, 255, 0.4) 50%, transparent 100%)',
                                        backgroundSize: '200% 100%',
                                        animation: 'dataFlow 6s linear infinite'
                                    }}
                                />
                                <img
                                    src="/images/Products/gestao.webp"
                                    loading="lazy"
                                    alt="Sistema de Gestão Especializado ERP"
                                    className="
                                        absolute z-[1] w-[25em] top-[-8.5em] left-1/2 -translate-x-1/2
                                        max-[479px]:w-[14em] max-[479px]:top-[-2.5em]
                                    "
                                />
                                <div
                                    data-is-ix2-target="1"
                                    className="absolute z-[1] w-[27.5em] top-[-6em]"
                                    data-w-id="b897cdff-d63b-81bb-1b63-1a3b84ad4880"
                                    data-animation-type="lottie"
                                    data-src=""
                                    data-loop="0"
                                    data-direction="1"
                                    data-autoplay="0"
                                    data-renderer="svg"
                                    data-default-duration="0"
                                    data-duration="5"
                                    data-ix2-initial-state="0"
                                />
                                <div className="product-description w-full max-[479px]:absolute max-[479px]:bottom-[1.25em] max-[479px]:left-[1.25em] max-[479px]:w-[calc(100%-2.5em)] max-[479px]:z-[10]">
                                    <div
                                        className="
                                            flex flex-col gap-y-[0.75em]
                                            w-[26em]
                                            max-[991px]:w-full max-[479px]:w-[85%]
                                        "
                                    >
                                        <h3
                                            className="
                                                m-0
                                                font-[Aeonik,Arial,sans-serif]
                                                text-[2em] font-normal leading-[100%]
                                                text-[#F0F4FF]
                                                max-[479px]:text-[1.6em] max-[479px]:leading-[99%]
                                            "
                                        >
                                            Sistema de Gestão
                                            <br />
                                            Especializado ERP
                                        </h3>
                                        <div
                                            className="
                                                font-[Aeonik,Arial,sans-serif]
                                                text-[1em] leading-[130%]
                                                uppercase
                                                text-[#4A6A9A]
                                                mb-0
                                            "
                                        >
                                            O PDV QUE NÃO TRAVA. GESTÃO FINANCEIRA, FISCAL E DE ESTOQUE UNIFICADA PARA UMA TOMADA DE DECISÃO INTELIGENTE.
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="
                                        absolute z-[2]
                                        top-[0.63em] right-[0.63em]
                                        flex items-center justify-center
                                        w-[3.38em] h-[3.38em] rounded-[0.13em]
                                        bg-[rgba(0,80,255,0.1)]
                                        max-[479px]:w-[3em] max-[479px]:h-[3em]
                                    "
                                >
                                    <div className="text-[#00D264] w-[0.75em]">
                                        <svg width="100%" height="100%" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.7627 11.5605H10.3623V3.25098L1.55762 12.0557L0.567383 11.0654L9.37207 2.26074H1.0625V0.860352H11.7627V11.5605Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </a>

                            {/* ── produto 3 ── */}
                            <a
                                href="/procedimentos/hidrolipo"
                                className="
                                    product-item product-3
                                    relative flex items-end justify-center
                                    h-[23.88em] p-[1.25em] rounded-[0.4em]
                                    bg-[#0A1428] backdrop-blur-[20px]
                                    border border-[#0D1F3C] hover:border-[#0050FF] transition-colors duration-300
                                    no-underline
                                    max-[991px]:flex-none max-[991px]:w-[25em]
                                    max-[479px]:w-[19em] max-[479px]:flex-col max-[479px]:justify-end
                                "
                            >
                                {/* Data Flow Effect */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10 z-0"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 80, 255, 0.4) 50%, transparent 100%)',
                                        backgroundSize: '200% 100%',
                                        animation: 'dataFlow 6s linear infinite'
                                    }}
                                />
                                <img
                                    src="/images/Products/somda-3d.webp"
                                    loading="lazy"
                                    alt="Controle de Tanques e Sondas"
                                    className="
                                        absolute z-[1] w-[25em] top-[-8.5em] left-1/2 -translate-x-1/2
                                        max-[479px]:w-[14em] max-[479px]:top-[-2.5em]
                                    "
                                />
                                <div className="product-description w-full max-[479px]:absolute max-[479px]:bottom-[1.25em] max-[479px]:left-[1.25em] max-[479px]:w-[calc(100%-2.5em)] max-[479px]:z-[10]">
                                    <div
                                        className="
                                            flex flex-col gap-y-[0.75em]
                                            w-[23.9em]
                                            max-[479px]:w-[85%]
                                        "
                                    >
                                        <h3
                                            className="
                                                m-0
                                                font-[Aeonik,Arial,sans-serif]
                                                text-[2em] font-normal leading-[100%]
                                                text-[#F0F4FF]
                                                max-[479px]:text-[1.6em] max-[479px]:leading-[99%]
                                            "
                                        >
                                            Controle de Tanques<br className="max-[479px]:block hidden" /> e Sondas
                                        </h3>
                                        <div
                                            className="
                                                font-[Aeonik,Arial,sans-serif]
                                                text-[1em] leading-[130%]
                                                uppercase
                                                text-[#4A6A9A]
                                                mb-0
                                            "
                                        >
                                            MONITORAMENTO REMOTO 24H. ALERTAS DE VAZAMENTO E INVENTÁRIO AUTOMÁTICO PARA ELIMINAR PERDAS INVISÍVEIS.
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="
                                        absolute z-[2]
                                        top-[0.63em] right-[0.63em]
                                        flex items-center justify-center
                                        w-[3.38em] h-[3.38em] rounded-[0.13em]
                                        bg-[rgba(0,80,255,0.1)]
                                        max-[479px]:w-[3em] max-[479px]:h-[3em]
                                    "
                                >
                                    <div className="text-[#00D264] w-[0.75em]">
                                        <svg width="100%" height="100%" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.7627 11.5605H10.3623V3.25098L1.55762 12.0557L0.567383 11.0654L9.37207 2.26074H1.0625V0.860352H11.7627V11.5605Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </a>

                        </div>

                        {/* scrollbar hide */}
                        <style>{`
                            .prodcuts-wrap .product-description { width: 100%; }
                            @keyframes dataFlow {
                                0% { background-position: 200% 0%; }
                                100% { background-position: -200% 0%; }
                            }
                        `}</style>
                    </div>
                </section>
            </section>
        </>
    )
}
