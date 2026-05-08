import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ── StrictMode REMOVIDO intencionalmente ────────────────────────────
// Em desenvolvimento, StrictMode monta → desmonta → remonta cada
// componente. Com Lenis + GSAP ScrollTrigger isso cria:
//   1. Dois loops RAF rodando ao mesmo tempo
//   2. Dois ScrollTrigger.create() para o mesmo pin
//   3. Engasgo visual de 1–2 frames no reload
//
// Em produção o StrictMode não tem efeito, mas em dev causa
// exatamente o "scroll instável" que estamos corrigindo.
// Reative apenas se precisar detectar side effects puros de React.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
