'use client'

/**
 * Nav.tsx — Head Bar | Master Data  (v2)
 * ─────────────────────────────────────────────────────────────────
 * CORREÇÕES:
 *  ✅ Largura 100% da tela (position fixed, sem wrapper com padding)
 *  ✅ Logo maior e proporcional à altura do bar (clamp 32→44px)
 *  ✅ Botão Atendimento com gradiente da paleta Master Data
 *     Ciano Elétrico #00E5FF → Turquesa #00C9A7 → Verde Esmeralda #00A878
 *  ✅ Fontes: Space Grotesque (links) + Inter Medium (botão/UI)
 *     via Google Fonts import no <style> interno
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── CONFIG ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Regiões', href: '#regioes' },
]

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=5534996320082&text&type=phone_number&app_absent=0'

// Paleta Master Data — Ciano Elétrico → Turquesa → Verde Esmeralda
const BTN_GRADIENT = 'linear-gradient(90deg, #00E5FF 0%, #00C9A7 55%, #00A878 100%)'
const BTN_GRADIENT_HOVER = 'linear-gradient(90deg, #33EEFF 0%, #00D4B8 55%, #00BE90 100%)'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: '60px top',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          HEAD BAR — 100% largura, fixed no topo
      ─────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Navegação principal"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(10px, 1.6vh, 18px) clamp(24px, 3.5vw, 56px)',
          background: 'linear-gradient(90deg, #03060F 0%, #03060F 50%, #0D1F3C 100%)',
          backdropFilter: scrolled ? 'blur(18px)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'blur(8px)',
          borderBottom: scrolled
            ? '1px solid rgba(0,201,167,0.28)'
            : '1px solid rgba(0,201,167,0.10)',
          boxShadow: scrolled
            ? '0 4px 32px rgba(0,0,0,0.65), 0 1px 0 rgba(0,229,255,0.05)'
            : '0 2px 16px rgba(0,0,0,0.40)',
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
          willChange: 'border-color, box-shadow',
        }}
      >
        {/* ── LOGO ──────────────────────────────────────────────── */}
        <a
          href="#"
          aria-label="Master Data — Página inicial"
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}
        >
          <img
            src="/assets/LOGO-MD-PNG 1.svg"
            alt="Master Data"
            style={{
              /* Proporcional à altura do bar (~60px total) — ocupa ~65% */
              height: 'clamp(32px, 4vh, 44px)',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </a>

        {/* ── LINKS DESKTOP ─────────────────────────────────────── */}
        <ul
          className="nav-links-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(24px, 3.5vw, 52px)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  color: 'rgba(200,235,255,0.68)',
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesque', 'Inter', sans-serif",
                  fontSize: 'clamp(11px, 0.95vw, 13px)',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#00E5FF'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,235,255,0.68)'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── DIREITA: BOTÃO + HAMBURGER ────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>

          {/* CTA Atendimento — gradiente paleta Master Data */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Atendimento via WhatsApp"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: 'clamp(8px, 1.1vh, 13px) clamp(16px, 1.8vw, 28px)',
              background: BTN_GRADIENT,
              borderRadius: '6px',
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(10px, 0.88vw, 12px)',
              fontWeight: 600,
              letterSpacing: '0.11em',
              textTransform: 'uppercase',
              color: '#03060F',           // texto escuro sobre gradiente claro
              textDecoration: 'none',
              border: '1px solid rgba(0,229,255,0.20)',
              boxShadow:
                '0 0 20px rgba(0,201,167,0.38), inset 0 1px 0 rgba(255,255,255,0.18)',
              transition:
                'background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
              willChange: 'transform',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = BTN_GRADIENT_HOVER
              el.style.boxShadow =
                '0 0 32px rgba(0,229,255,0.55), inset 0 1px 0 rgba(255,255,255,0.22)'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = BTN_GRADIENT
              el.style.boxShadow =
                '0 0 20px rgba(0,201,167,0.38), inset 0 1px 0 rgba(255,255,255,0.18)'
              el.style.transform = 'translateY(0)'
            }}
          >
            {/* Ícone WhatsApp */}
            <svg
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              style={{ flexShrink: 0 }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Atendimento
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              color: '#F0F8FF',
            }}
          >
            <HamburgerSVG open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* ── SIDEBAR MENU (mobile) ───────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'clamp(260px, 75vw, 360px)',
          background: 'linear-gradient(180deg, #03060F 0%, #03060F 55%, #0D1F3C 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(0,229,255,0.10)',
          zIndex: 300,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(70px, 12vh, 100px) clamp(28px, 6vw, 48px) 40px',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {[{ label: 'Início', href: '#' }, ...NAV_LINKS, { label: 'Atendimento', href: WHATSAPP_URL }].map((item, i, arr) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={() => setMenuOpen(false)}
            style={{
              color: item.label === 'Atendimento' ? '#00E5FF' : 'rgba(200,235,255,0.85)',
              textDecoration: 'none',
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontFamily: "'Space Grotesque', sans-serif",
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              transition: 'color 0.25s',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(0,229,255,0.08)' : 'none',
              paddingBottom: '1.5rem',
              marginBottom: '1.5rem',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#00E5FF'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                item.label === 'Atendimento' ? '#00E5FF' : 'rgba(200,235,255,0.85)'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Overlay ao abrir menu mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(3,6,15,0.70)',
            backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* ── FONTES + BREAKPOINTS ────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesque:wght@400;500;700&family=Inter:ital,wght@0,400;0,500;0,600;1,500&display=swap');

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger      { display: flex !important; }
        }
      `}</style>
    </>
  )
}

// ── ÍCONE HAMBURGER ─────────────────────────────────────────────
function HamburgerSVG({ open }: { open: boolean }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
      <line x1="0" y1="1" x2="22" y2="1" stroke="#F0F8FF" strokeWidth="1"
        style={{
          transformOrigin: 'center',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
        }}
      />
      <line x1="0" y1="8" x2="16" y2="8" stroke="#00E5FF" strokeWidth="1"
        style={{ transition: 'opacity 0.3s', opacity: open ? 0 : 1 }}
      />
      <line x1="0" y1="15" x2="22" y2="15" stroke="#F0F8FF" strokeWidth="1"
        style={{
          transformOrigin: 'center',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
        }}
      />
    </svg>
  )
}