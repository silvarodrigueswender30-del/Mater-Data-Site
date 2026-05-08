"use client";

/**
 * capsule.tsx — v3 (3D TorusKnot Edition)
 * ─────────────────────────────────────────────────────────────
 * Stack  : Next.js 15 · Tailwind CSS v4 · GSAP ScrollTrigger · Three.js
 *
 * SUBSTITUIÇÃO:
 *   - Canvas de frames → objeto 3D TorusKnot de partículas (mesmo do Hero)
 *   - O objeto fica como background STICKY enquanto a seção scrolla
 *   - Reage a mouse (desktop) e toque (mobile)
 *   - Scroll muda a rotação e escala do objeto proporcionalmente
 *
 * ESTRUTURA (9 containers):
 *   1. capsule-start-text   → heading principal (sticky overlay)
 *   2. capsule-second-block → segundo bloco de texto (desktop)
 *   3–5. capsule-cards      → 3 cards de features
 *   6. meet-headline        → "Conheça a tecnologia"
 *   7–10. meet-steps        → 4 etapas do produto
 *   (total: 2 textos + 3 cards + 4 steps = 9 blocos de conteúdo)
 *
 * Paleta Master Data:
 *   #03060F → bg profundo
 *   #060E1C → surface/cards
 *   #0D1F3C → bordas
 *   #0050FF → accent azul
 *   #00D264 → accent verde
 *   #00D9A3 → teal (Three.js)
 *   #00B8D4 → cyan (Three.js)
 *   #F59E0B → amber (Three.js)
 *   #F0F4FF → heading
 *   #8AAAD0 → texto secundário
 *   #4A6A9A → texto terciário
 *   #2A4A7A → labels / muted
 *
 * npm install gsap three
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ── Brand Colors (mesmo do Hero) ────────────────────────── */
const BRAND = {
  bg: "#03060F",
  teal: "#00D9A3",
  cyan: "#00B8D4",
  amber: "#F59E0B",
  white: "#FFFFFF",
};

/* ── 9 containers de conteúdo ────────────────────────────── */
const CARDS = [
  {
    id: "card-1",
    badge: "TELEMETRIA AVANÇADA",
    title: "Automação de Ponta a Ponta.",
    body: "Do sensor físico ao relatório estratégico — controle absoluto de cada litro e centavo do seu estoque.",
  },
  {
    id: "card-2",
    badge: "MONITORAMENTO 24H",
    title: "Alertas de Conformidade.",
    body: "Notificações automáticas preventivas antes que qualquer nível crítico ou irregularidade fiscal seja atingido.",
  },
  {
    id: "card-3",
    badge: "DISPONIBILIDADE TOTAL",
    title: "Dados Sem Interrupção",
    body: "Operação garantida mesmo em modo offline. Sincronização inteligente de dados assim que a conexão é restabelecida.",
  },
] as const;

const STEPS = [
  {
    id: "step-1",
    num: "01",
    title: "Instalação Não Invasiva.",
    body: "Sem interrupção na pista ou obras complexas. Nossa tecnologia se integra à sua estrutura atual em tempo recorde, permitindo que você foque no que importa: vender mais.",
  },
  {
    id: "step-2",
    num: "02",
    title: "Zero Perdas Ocultas",
    body: "Identificação automática de qualquer variação volumétrica ou tentativa de desvio. Rastreabilidade total de cada gota, do recebimento do caminhão à ponta do bico.",
  },
  {
    id: "step-3",
    num: "03",
    title: "Escale Sem Atrito",
    body: "De 1 a 500 tanques monitorados na mesma interface. Gerencie redes inteiras de postos com a mesma precisão de uma unidade individual, sem custos surpresa por ponto adicional.",
  },
  {
    id: "step-4",
    num: "04",
    title: "ROI Em 30 Dias",
    body: "Nossos parceiros registram uma recuperação de 18% a 24% do capital perdido já no primeiro mês. Tecnologia que se paga através da eliminação imediata de desvios e erros de medição.",
  },
] as const;

/* ─────────────────────────────────────────────────────────── */
/* ── Canvas 3D TorusKnot (copiado fiel do Hero)             */
/* ─────────────────────────────────────────────────────────── */
interface ThreeCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

function ThreeCanvas({ scrollProgressRef }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* Scene */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const isMobile = window.innerWidth < 768;
    camera.position.z = isMobile ? 6.5 : 4.45;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color("#03060F"), 1);
    el.appendChild(renderer.domElement);
    // canvas deve preencher 100% do container sticky (100vh)
    renderer.domElement.style.cssText =
      "display:block;width:100%;height:100%;position:absolute;top:0;left:0;";

    /* ── Fundo "Azul Abissal" via GLSL shader ─────────────
     * Renderizado no WebGL, sem nenhuma camada HTML por cima.
     * Gradiente radial centrado na direita onde o objeto está. */
    const bgScene = new THREE.Scene();
    const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 dark  = vec3(0.008, 0.012, 0.028);   /* #020307 quase preto */
          vec3 mid   = vec3(0.016, 0.032, 0.072);   /* #040820 azul noite  */
          vec3 glow  = vec3(0.022, 0.055, 0.120);   /* #061630 brilho      */
          /* centro-direita = onde o objeto vive */
          float d1 = distance(vUv, vec2(0.70, 0.50));
          vec3 col = mix(glow, mid,  smoothstep(0.0, 0.50, d1));
               col = mix(col,  dark, smoothstep(0.3, 0.95, d1));
          /* brilho sutil teal no ponto focal */
          float g  = 1.0 - smoothstep(0.0, 0.40, d1);
          col += vec3(0.0, 0.018, 0.042) * g * 0.6;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    bgScene.add(new THREE.Mesh(bgGeo, bgMat));

    /* Mouse & Touch */
    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const PARTICLE_COUNT = 45000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    const geometry = new THREE.BufferGeometry();
    const knot = new THREE.TorusKnotGeometry(2.1, 0.52, 220, 32);
    const knotPos = knot.attributes.position;

    const palette = [
      new THREE.Color(BRAND.teal),
      new THREE.Color(BRAND.teal),
      new THREE.Color(BRAND.cyan),
      new THREE.Color(BRAND.cyan),
      new THREE.Color(BRAND.amber),
      new THREE.Color(BRAND.white),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vi = i % knotPos.count;
      const x = knotPos.getX(vi);
      const y = knotPos.getY(vi);
      const z = knotPos.getZ(vi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      const base = palette[Math.floor(Math.random() * palette.length)].clone();
      base.multiplyScalar(0.8 + Math.random() * 0.75);

      colors[i * 3] = base.r;
      colors[i * 3 + 1] = base.g;
      colors[i * 3 + 2] = base.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const _cur = new THREE.Vector3();
    const _ori = new THREE.Vector3();
    const _vel = new THREE.Vector3();
    const _mw = new THREE.Vector3();
    const _dir = new THREE.Vector3();
    const _ret = new THREE.Vector3();

    const material = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* Mouse */
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    /* Touch */
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mouse.x = (t.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(t.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouchEnd = () => {
      /* gradually return to center */
      mouse.x *= 0.5;
      mouse.y *= 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    /* Animation loop */
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* Scroll-driven: move objeto, rotação e escala */
      const sp = scrollProgressRef.current; // 0 → 1
      points.rotation.y = t * 0.055 + sp * Math.PI * 2.5;
      points.rotation.x = Math.sin(t * 0.12) * 0.06 + sp * 0.4;

      /* Scale pulse */
      const scaleTarget = 1 - Math.sin(sp * Math.PI) * 0.18;
      points.scale.setScalar(
        THREE.MathUtils.lerp(points.scale.x, scaleTarget, 0.04)
      );

      /* Translação X: começa levemente à direita (0.4) e centraliza durante o scroll */
      const targetX = 0.4 * (1 - Math.min(sp * 2, 1)); // chega ao centro em 50% do scroll
      points.position.x = THREE.MathUtils.lerp(points.position.x, targetX, 0.05);

      _mw.set(mouse.x * 4.5, mouse.y * 4.5, 0);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3,
          iy = ix + 1,
          iz = ix + 2;

        _cur.set(positions[ix], positions[iy], positions[iz]);
        _ori.set(origPos[ix], origPos[iy], origPos[iz]);
        _vel.set(velocities[ix], velocities[iy], velocities[iz]);

        const dist = _cur.distanceTo(_mw);
        if (dist < 1.8) {
          const force = (1.8 - dist) * 0.012;
          _dir.subVectors(_cur, _mw).normalize().multiplyScalar(force);
          _vel.add(_dir);
        }

        _ret.subVectors(_ori, _cur).multiplyScalar(0.0015);
        _vel.add(_ret);
        _vel.multiplyScalar(0.94);

        positions[ix] += _vel.x;
        positions[iy] += _vel.y;
        positions[iz] += _vel.z;
        velocities[ix] = _vel.x;
        velocities[iy] = _vel.y;
        velocities[iz] = _vel.z;
      }

      geometry.attributes.position.needsUpdate = true;

      /* 1. fundo abissal GLSL */
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(bgScene, bgCam);
      /* 2. partículas por cima */
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const isMobileNow = window.innerWidth < 768;
      camera.position.z = isMobileNow ? 6.5 : 4.45;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      bgGeo.dispose();
      bgMat.dispose();
      renderer.dispose();
      knot.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function Capsule() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  /* refs dos 9 containers */
  const heading1Ref = useRef<HTMLDivElement>(null);
  const secondBlkRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const meetHeadRef = useRef<HTMLDivElement>(null);
  const stepsRef = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  /* ── GSAP ScrollTrigger ─────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* scroll progress → alimenta o Three.js via ref */
      gsap.to(scrollProgressRef, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: canvasWrapRef.current,
          pinSpacing: false,
          scrub: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      /* ── heading 1 — fade-in ao entrar na viewport */
      gsap.fromTo(
        heading1Ref.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── second block — slide da direita */
      gsap.fromTo(
        secondBlkRef.current,
        { opacity: 0, x: 56 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: secondBlkRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── 3 cards — stagger */
      gsap.fromTo(
        cardRefs.map((r) => r.current).filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── meet headline */
      gsap.fromTo(
        meetHeadRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: meetHeadRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── 4 steps — stagger alternando esquerda/direita */
      stepsRef.forEach((ref, i) => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── JSX ──────────────────────────────────────────────── */
  return (
    /*
     * section.capsule — SEM background CSS. O fundo é 100% WebGL.
     * O canvas fica sticky top-0 e cobre 100vw×100vh.
     * Os textos ficam em position:relative z-[2] por CIMA do canvas sticky.
     * Não há nenhuma camada de cor HTML entre o canvas e os textos.
     */
    <section
      ref={sectionRef}
      style={{ minHeight: "250em", position: "relative", zIndex: 3, overflow: "hidden" }}
    >
      {/*
       * ── CANVAS WRAPPER (GSAP PIN) ──────────────────────────
       * Substituímos o 'sticky' do CSS pelo 'pin' do GSAP.
       * Isso garante que o canvas fique fixo 100% do tempo,
       * mesmo que outras partes do site usem overflow-hidden.
       */}
      <div
        ref={canvasWrapRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <ThreeCanvas scrollProgressRef={scrollProgressRef} />
      </div>

      {/*
       * ── CONTEÚDO ───────────────────────────────────────────
       * position:relative z-index:2 → por cima do canvas.
       * background:transparent → 3D aparece atrás.
       */}
      <div
        style={{ position: "relative", zIndex: 2, background: "transparent" }}
      >

        {/*
         * ── CONTAINER 1: heading principal ───────────────
         */}
        <div
          className="
            h-screen
            pt-[5em] pr-[1.88em] pl-[1.88em]
            flex flex-col justify-between items-start
            max-lg:pt-[3em]
            max-[479px]:pt-[4.63em] max-[479px]:pl-[1em]
          "
        >
          {/* ── CONTAINER 1a: heading principal */}
          <div
            ref={heading1Ref}
            className="
                z-[1] w-[35.4em] relative
                max-lg:sticky max-lg:top-[7em]
                max-[479px]:w-full max-[479px]:top-[5em]
              "
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                <span style={{
                  background: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "block",
                }}>
                  Controle{" "}
                  <span style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontWeight: 600 }}>Total.</span>
                </span>
                <span style={{
                  background: "linear-gradient(115deg, rgba(255,255,255,0.92) 0%, rgba(0,217,163,0.88) 60%, rgba(0,184,212,0.85) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "block",
                }}>
                  Gestão{" "}
                  <span style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontWeight: 600 }}>Em Tempo Real.</span>
                </span>
              </h2>
            </div>
          </div>

          {/* ── CONTAINER 2: capsule-second-block ── */}
          <div
            ref={secondBlkRef}
            className="
                z-[1] w-[35.4em] relative self-end pb-[2.5em]
                max-lg:w-full max-[479px]:self-start
              "
          >
            <div className="flex flex-col gap-[2.5em] justify-start items-start w-fit max-w-[24em] bg-[#060E1C]/30 backdrop-blur-md border border-[#0D1F3C]/50 rounded-[1.5em] p-[2.5em] max-[479px]:p-[1.5em]">
              <div className="flex flex-col gap-[1.5em]">
                <p className="m-0 font-['JetBrains_Mono',monospace] text-[0.5625rem] tracking-[0.2em] uppercase text-[#0050FF] flex items-center gap-[0.5rem]">
                  <span className="text-[#0D1F3C] font-bold" aria-hidden>
                    01
                  </span>
                  Tecnologia de campo
                </p>

                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  <span style={{
                    background: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                  }}>
                    Zero Perdas.
                  </span>
                  <span style={{
                    background: "linear-gradient(115deg, rgba(255,255,255,0.92) 0%, rgba(0,217,163,0.88) 60%, rgba(0,184,212,0.85) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                  }}>
                    Máxima Eficiência.
                  </span>
                </h2>

                <p className="m-0 font-['Space_Grotesk',sans-serif] text-[1em] leading-[120%] text-[#4A6A9A]">
                  Seu tanque sob monitoramento constante. O sistema emite alertas preventivos e relatórios de conformidade automáticos. Do sensor físico ao dashboard estratégico — controle absoluto da sua operação no Triângulo Mineiro.
                </p>
              </div>

              <a
                href="#contato"
                className="
                    font-['JetBrains_Mono',monospace]
                    text-[0.625rem] tracking-[0.15em] uppercase
                    text-[#00D264] no-underline
                    flex items-center gap-2
                    hover:opacity-70 transition-opacity duration-200
                  "
              >
                Diagnóstico gratuito <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
        {/* /capsule-start-text (containers 1 e 2) */}

        {/*
           * ── CONTAINERS 3–5: capsule-cards ────────────
           */}
        <div
          ref={cardsWrapRef}
          className="max-lg:mt-[5em]"
        >
          {/* Label de seção */}
          <div className="px-[1.88em] mt-[8em] mb-[3em] max-[479px]:px-[1em] max-[479px]:mt-0">
            <p className="m-0 font-['JetBrains_Mono',monospace] text-[0.5625rem] tracking-[0.2em] uppercase text-[#2A4A7A]">
              Recursos principais
            </p>
          </div>

          {/* grid dos 3 cards */}
          <div
            className="
                grid grid-cols-3
                gap-[1.88em]
                items-start
                h-[16.13em]
                px-[1.88em]
                max-[479px]:px-[1em]
                max-lg:grid-cols-1 max-lg:h-auto max-lg:gap-[1.25em]
              "
          >
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                id={card.id}
                ref={cardRefs[i]}
                className="
                    w-full min-w-0
                    bg-[#060E1C] border border-[#0D1F3C]
                    rounded-[1.25em]
                    overflow-hidden group
                    transition-colors duration-300
                    hover:border-[#0050FF]/40
                  "
              >
                <div
                  className="
                      flex flex-col justify-between items-start
                      h-[16.13em]
                      pt-[1.25em] pb-[1.25em] px-[1.25em]
                      max-lg:h-[14em]
                      max-[479px]:h-[13em]
                    "
                >
                  {/* topo: badge + ponto */}
                  <div className="flex items-start justify-between w-full">
                    <span
                      className="
                          font-['JetBrains_Mono',monospace]
                          text-[0.5rem] tracking-[0.15em] uppercase
                          text-[#FF8B00]
                          border border-[#FF8B00]/40
                          rounded-[0.3em]
                          px-[0.5rem] py-[0.125rem]
                        "
                    >
                      {card.badge}
                    </span>
                    <div
                      className="w-[2.25em] h-[2.25em] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="w-[0.3125rem] h-[0.3125rem] rounded-full bg-[#0050FF] group-hover:bg-[#00D264] transition-colors duration-300" />
                    </div>
                  </div>

                  {/* conteúdo do card */}
                  <div className="flex flex-col gap-[0.75em]">
                    <h3
                      className="
                          font-['Space_Grotesk',sans-serif] font-bold
                          text-[1.69em] leading-[110%] tracking-[-0.03em]
                          text-[#F0F4FF] m-0
                        "
                    >
                      {card.title}
                    </h3>
                    <p className="m-0 font-['Space_Grotesk',sans-serif] text-[0.875rem] leading-[1.5] text-[#4A6A9A]">
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* /capsule-cards (containers 3–5) */}

        {/*
           * ── CONTAINER 6: meet headline ───────────────
           * Título da seção de steps, centralizado
           */}
        <div
          ref={meetHeadRef}
          className="mt-[18em] px-[1.88em] max-lg:mt-[8em] max-[479px]:mt-[4em] max-[479px]:px-[1em]"
        >
          <div className="flex flex-col gap-[0.75em]">
            <p className="m-0 font-['JetBrains_Mono',monospace] text-[0.5625rem] tracking-[0.2em] uppercase text-[#0050FF]">
              Como funciona
            </p>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              <span style={{
                background: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}>
                Tecnologia Que{" "}
              </span>
              <span style={{
                background: "linear-gradient(115deg, rgba(255,255,255,0.92) 0%, rgba(0,217,163,0.88) 60%, rgba(0,184,212,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}>
                Gera Liberdade.
              </span>
            </h2>
          </div>
        </div>

        {/*
           * ── CONTAINERS 7–10: meet steps ──────────────
           * 4 etapas em grid 2 colunas (esquerda / direita)
           */}
        <div
          className="
              mt-[5em] px-[1.88em] pb-[12em]
              grid grid-cols-2 gap-x-[4em] gap-y-[25em]
              max-lg:grid-cols-1 max-lg:gap-y-[5em]
              max-[479px]:px-[1em] max-[479px]:pb-[8em]
            "
        >
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              id={step.id}
              ref={stepsRef[i]}
              className={`${i % 2 !== 0 ? "max-lg:pl-0 lg:mt-[8em]" : ""}`}
            >
              <div className="flex flex-col gap-[1.5em] bg-[#060E1C]/40 backdrop-blur-md border border-[#0D1F3C]/50 rounded-[1.25em] p-[2em] max-[479px]:p-[1.5em] max-w-[22em]">
                {/* linha decorativa + número */}
                <div className="flex items-center gap-[1em]">
                  <div
                    className="h-px flex-1 max-w-[3em]"
                    style={{ background: "rgba(0,210,100,0.25)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="
                      font-['JetBrains_Mono',monospace]
                      text-[0.5rem] tracking-[0.2em]
                      text-[#00D264] uppercase
                    "
                  >
                    {step.num}
                  </span>
                </div>

                <h3
                  className="
                    font-['Space_Grotesk',sans-serif] font-bold
                    text-[clamp(1.4rem,2.2vw,1.875rem)] leading-[110%] tracking-[-0.03em]
                    m-0
                  "
                  style={{
                    background: "linear-gradient(115deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 40%, rgba(0,217,163,0.88) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.title}
                </h3>

                <p className="m-0 font-['Space_Grotesk',sans-serif] text-[1em] leading-[150%] text-[#4A6A9A]">
                  {step.body}
                </p>

                {/* underline accent */}
                <div
                  className="h-px w-[3em]"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,80,255,0.5), transparent)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
        {/* /meet steps (containers 7–10) */}

      </div>
      {/* /conteúdo */}

      {/* ── Brand Watermark (SVG) ──
          Uma marca d'água extra grande que marca o encerramento da seção.
      */}
      <div className="absolute bottom-[-5vw] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-[2] opacity-[0.06]">
        <img 
          src="/images/master1.svg" 
          alt="Master Data Branding"
          className="w-[140vw] max-w-none lg:w-[100vw] h-auto object-contain select-none"
        />
      </div>

    </section>
  );
}

/*
 * ─────────────────────────────────────────────────────────────
 * NOTAS DE INTEGRAÇÃO
 * ─────────────────────────────────────────────────────────────
 *
 * 1. LENIS (root layout ou providers.tsx):
 *    import Lenis from "lenis";
 *    import gsap from "gsap";
 *    import { ScrollTrigger } from "gsap/ScrollTrigger";
 *
 *    const lenis = new Lenis();
 *    lenis.on("scroll", ScrollTrigger.update);
 *    gsap.ticker.add((time) => lenis.raf(time * 1000));
 *    gsap.ticker.lagSmoothing(0);
 *
 * 2. TAILWIND v4 — globals.css (@theme block):
 *    --color-md-deep:    #03060F;
 *    --color-md-surface: #060E1C;
 *    --color-md-border:  #0D1F3C;
 *    --color-md-blue:    #0050FF;
 *    --color-md-green:   #00D264;
 *    --color-md-hi:      #F0F4FF;
 *
 * 3. FONTES (Google Fonts):
 *    Syne:wght@700;800
 *    Space+Grotesk:wght@300;400;500;600;700
 *    JetBrains+Mono:wght@400;500
 *
 * 4. DEPENDÊNCIAS:
 *    npm install gsap three lenis
 *
 * 5. PERFORMANCE:
 *    - PARTICLE_COUNT=45000 é o mesmo do Hero.
 *      Para dispositivos mais lentos, reduza para 20000.
 *    - O renderer THREE.js é criado uma única vez por mount.
 *    - Cleanup completo no unmount (sem memory leaks).
 * ─────────────────────────────────────────────────────────────
 */