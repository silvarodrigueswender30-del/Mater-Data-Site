import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

// Âmbar para os números das métricas
const AMBER = "#F59E0B";

// ── BRAND COLORS (canvas) ────────────────────────────────────────────────────
const BRAND = {
  bg: "#03060F",
  teal: "#00D9A3",
  cyan: "#00B8D4",
  amber: "#F59E0B",
  white: "#FFFFFF",
};

// ── CANVAS THREE.JS ───────────────────────────────────────────────────────────
export function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(BRAND.bg), 1);
    el.appendChild(renderer.domElement);

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

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      _mw.set(mouse.x * 4.5, mouse.y * 4.5, 0);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3, iy = ix + 1, iz = ix + 2;

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

      points.rotation.y = t * 0.055;
      points.rotation.x = Math.sin(t * 0.12) * 0.06;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      el.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      knot.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}

// ── HERO PRINCIPAL ────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-h1 > span", {
        y: 50, opacity: 0, duration: 1.05, ease: "power3.out",
        stagger: 0.1, delay: 0.25,
      });
      gsap.from(".anim-sub", {
        y: 18, opacity: 0, duration: 0.85, ease: "power3.out", delay: 0.7,
      });
      gsap.from(".anim-ctas", {
        y: 16, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.88,
      });
      gsap.from(".anim-metric", {
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
        stagger: 0.07, delay: 1.05,
      });
      gsap.from(".anim-card-top", {
        x: 32, opacity: 0, duration: 0.95, ease: "power3.out", delay: 0.45,
      });
      gsap.from(".anim-social", {
        opacity: 0, duration: 0.6, ease: "power3.out", delay: 1.35,
      });
      gsap.from(".anim-about", {
        opacity: 0, duration: 0.6, ease: "power3.out", delay: 1.4,
      });
      gsap.from(".anim-bottom-text", {
        y: 20, opacity: 0, duration: 0.95, ease: "power3.out", delay: 1.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: BRAND.bg }}
    >
      {/* ── CANVAS 3D (substitui o vídeo de fundo) ── */}
      <WovenCanvas />

      {/* ── OVERLAYS: preservam legibilidade do conteúdo (lateral + vertical + vinheta) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(3,6,15,0.97) 0%, rgba(3,6,15,0.86) 35%, rgba(3,6,15,0.55) 60%, rgba(3,6,15,0.25) 100%)"
      }} />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(3,6,15,0.82) 0%, rgba(3,6,15,0.0) 25%, rgba(3,6,15,0.0) 65%, rgba(3,6,15,0.97) 100%)"
      }} />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: "radial-gradient(ellipse at 58% 50%, rgba(3,6,15,0) 18%, rgba(3,6,15,0.65) 100%)"
      }} />

      {/* ── CORPO PRINCIPAL ── */}
      <div
        className="relative z-10 w-full flex items-center"
        style={{ minHeight: "100svh" }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{
            padding: "clamp(5.5rem,12vh,7rem) clamp(1.5rem,5vw,4.5rem) clamp(3.5rem,8vh,5rem)",
            gap: "clamp(1rem,2.5vw,2.5rem)",
          }}
        >

          {/* ══ COLUNA ESQUERDA ══ */}
          <div
            className="flex flex-col"
            style={{
              maxWidth: "clamp(280px, 92%, 560px)",
              width: "100%",
              flexShrink: 0,
            }}
          >

            {/* H1 */}
            <h1
              className="anim-h1 flex flex-col"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.7rem,3.6vw,3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                gap: 0,
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
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}>
                  total.
                </span>
              </span>
              <span style={{
                background: "linear-gradient(115deg, rgba(255,255,255,0.92) 0%, rgba(0,217,163,0.88) 60%, rgba(0,184,212,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}>
                Gestão{" "}
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}>
                  inteligente.
                </span>
              </span>
              <span style={{
                background: "linear-gradient(115deg, rgba(255,255,255,0.88) 0%, rgba(0,217,163,0.85) 50%, rgba(0,184,212,0.80) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}>
                Seu posto{" "}
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}>
                  lucrativo.
                </span>
              </span>
            </h1>

            {/* Subtítulo */}
            <p
              className="anim-sub"
              style={{
                marginTop: "clamp(0.75rem,1.8vw,1.3rem)",
                maxWidth: 400,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.72rem,1.1vw,0.92rem)",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.01em",
              }}
            >
              Automação completa e suporte especializado em{" "}
              <span style={{ color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>
                Uberlândia e região.
              </span>
            </p>

            {/* CTAs */}
            <div
              className="anim-ctas flex items-center flex-wrap"
              style={{
                gap: "clamp(0.5rem,1vw,0.8rem)",
                marginTop: "clamp(1.1rem,2.5vw,1.85rem)",
              }}
            >
              {/* Primário */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.42rem",
                  padding: "clamp(0.52rem,0.95vw,0.76rem) clamp(0.95rem,1.9vw,1.65rem)",
                  background: "#00D9A3",
                  borderRadius: "6px",
                  border: "none",
                  color: "#03060F",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.68rem,0.95vw,0.84rem)",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  boxShadow: "0 0 28px rgba(0,217,163,0.25)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#00C896";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#00D9A3";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: "1em", height: "1em" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Falar com especialista
              </button>

              {/* Secundário ghost */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.38rem",
                  padding: "clamp(0.52rem,0.95vw,0.76rem) clamp(0.95rem,1.9vw,1.65rem)",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.68rem,0.95vw,0.84rem)",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.22s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.36)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.72)";
                }}
              >
                Ver serviços
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* ── METRIC CARDS: desktop row — números em ÂMBAR ── */}
            <div
              className="hidden md:flex items-stretch"
              style={{
                gap: "clamp(0.42rem,0.85vw,0.68rem)",
                marginTop: "clamp(1.3rem,2.8vw,2.2rem)",
              }}
            >
              {[
                { label: "Postos atendidos", value: "150+", sub: "e crescendo" },
                { label: "Satisfação dos clientes", value: "98%", sub: "média geral" },
                { label: "Cidades cobertas", value: "10+", sub: "Triângulo Mineiro" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="anim-metric"
                  style={{
                    padding: "clamp(0.52rem,0.95vw,0.82rem) clamp(0.65rem,1.1vw,1rem)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "clamp(0.6rem,0.95vw,0.85rem)",
                    backdropFilter: "blur(12px)",
                    flex: "1 1 0",
                    minWidth: 0,
                  }}
                >
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.52rem,0.7vw,0.62rem)",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "clamp(0.22rem,0.45vw,0.38rem)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {m.label}
                  </p>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1.15rem,2vw,1.75rem)",
                    fontWeight: 700,
                    color: AMBER,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}>
                    {m.value}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.5rem,0.68vw,0.6rem)",
                    color: "rgba(255,255,255,0.28)",
                    marginTop: "0.2rem",
                    whiteSpace: "nowrap",
                  }}>
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* ── METRIC CARDS: mobile carrossel ── */}
            <div
              className="flex md:hidden items-stretch overflow-x-auto pb-1"
              style={{
                gap: "0.5rem",
                marginTop: "2.8rem",
                scrollbarWidth: "none",
              }}
            >
              {[
                { label: "Postos atendidos", value: "150+", sub: "e crescendo" },
                { label: "Satisfação", value: "98%", sub: "média geral" },
                { label: "Cidades", value: "10+", sub: "Triângulo Mineiro" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="anim-metric"
                  style={{
                    padding: "0.5rem 0.75rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "0.65rem",
                    backdropFilter: "blur(12px)",
                    minWidth: "6.5rem",
                    flexShrink: 0,
                  }}
                >
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.52rem",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "0.2rem",
                  }}>
                    {m.label}
                  </p>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: AMBER,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}>
                    {m.value}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.52rem",
                    color: "rgba(255,255,255,0.28)",
                    marginTop: "0.16rem",
                  }}>
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ══ COLUNA DIREITA: APENAS CARD SUPERIOR (20%) ══ */}
          <div
            className="hidden lg:flex flex-col"
            style={{
              width: "clamp(185px,19vw,230px)",
              flexShrink: 0,
            }}
          >
            {/* Card único — 20% equiv AgentAI/230+ */}
            <div
              className="anim-card-top flex flex-col overflow-hidden"
              style={{
                background: "rgba(6,10,20,0.88)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "clamp(0.8rem,1.2vw,1.05rem)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.62)",
              }}
            >
              {/* Header do card */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(0.52rem,0.85vw,0.72rem) clamp(0.6rem,0.95vw,0.85rem)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.52rem,0.68vw,0.6rem)",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.42)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  Master Data
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.5rem,0.62vw,0.56rem)",
                  color: "rgba(255,255,255,0.2)",
                }}>
                  01/04
                </span>
              </div>

              {/* Área placeholder de imagem */}
              <div style={{
                width: "100%",
                aspectRatio: "16/8",
                overflow: "hidden",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <img 
                  src="/images/imagem-mini-posto.avif" 
                  alt="Operação Master Data"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.85,
                    filter: "contrast(1.1) brightness(0.9)",
                  }}
                />
              </div>

              {/* Número 20% + label */}
              <div style={{
                padding: "clamp(0.58rem,0.95vw,0.82rem) clamp(0.6rem,0.95vw,0.85rem)",
              }}>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.65rem,2.8vw,2.4rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}>
                  20<span style={{ color: "#00D9A3" }}>%</span>
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.56rem,0.72vw,0.62rem)",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "0.26rem",
                  lineHeight: 1.45,
                }}>
                  de redução média de perdas<br />com automação completa
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── SOCIAL ICONS — centro-direita, apenas desktop, sem colidir com cards ── */}
      <div
        className="anim-social hidden lg:flex flex-col items-center gap-2 absolute z-20"
        style={{
          right: "clamp(14rem,21vw,27rem)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.52rem",
          color: "rgba(255,255,255,0.16)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          marginBottom: "0.3rem",
        }}>
          Social
        </span>
        {[
          {
            href: "#",
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "0.8em", height: "0.8em" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            ),
          },
          {
            href: "#",
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "0.78em", height: "0.78em" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
              </svg>
            ),
          },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            style={{
              width: "clamp(1.6rem,1.9vw,1.9rem)",
              height: "clamp(1.6rem,1.9vw,1.9rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
              color: "rgba(255,255,255,0.32)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,217,163,0.45)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#00D9A3";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.32)";
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* ── TEXTO INFERIOR DIREITO ── */}
      <div
        className="anim-bottom-text hidden lg:block absolute z-20"
        style={{
          bottom: "clamp(1.6rem,3.2vw,2.8rem)",
          right: "clamp(1.5rem,5vw,4.5rem)",
          width: "clamp(280px,28vw,420px)",
          textAlign: "right",
        }}
      >
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(0.85rem,1.4vw,1.1rem)",
          lineHeight: 1.4,
          color: "#fff",
          letterSpacing: "-0.01em",
        }}>
          Instalamos e{" "}
          <span style={{ color: "#00D9A3" }}>mantemos</span>{" "}
          com <span style={{ color: "#00D9A3" }}>excelência</span>{" "}
          sua automação, do hardware ao software.
        </p>
      </div>

      {/* ── ABOUT LINK RODAPÉ ESQUERDO ── */}
      <div
        className="anim-about absolute z-20"
        style={{
          bottom: "clamp(1.2rem,2.5vw,2rem)",
          left: "clamp(1.5rem,5vw,4.5rem)",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.24)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.55rem,0.7vw,0.62rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.52)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.24)"; }}
        >
          <span style={{ display: "block", width: "1rem", height: "1px", background: "currentColor" }} />
          Sobre a Master Data
        </button>
      </div>
    </section>
  );
}