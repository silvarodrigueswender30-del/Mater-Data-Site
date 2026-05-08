export default function FooterCTA() {
  return (
    <footer data-wf--footer--variant="base" className="footer bg-[#020409]">
      <div className="w-layout-blockcontainer container w-container">
        <div className="footer-wrap">

          {/* ── FOOTER TOP ── */}
          <div className="footer-top">
            <div className="footer-links">

              {/* Coluna: Protocolos (footer-links-group-wrap) */}
              <div className="footer-links-group-wrap">
                <div className="text-14-caps text-[#4A6A9A]">
                  MASTER DATA
                </div>
                <div className="footer-links-group">
                  <a href="#" className="footer-link w-inline-block">
                    <div className="text-14-caps text-[#F0F4FF] opacity-50">CrioEndolift</div>
                    <div className="underline bg-[#0D1F3C]"></div>
                  </a>
                  <a href="#" className="footer-link w-inline-block">
                    <div className="text-14-caps text-[#F0F4FF] opacity-50">Ultra MD</div>
                    <div className="underline bg-[#0D1F3C]"></div>
                  </a>
                  <a href="#" className="footer-link w-inline-block">
                    <div className="text-14-caps text-[#F0F4FF] opacity-50">Hidrolipo</div>
                    <div className="underline bg-[#0D1F3C]"></div>
                  </a>
                </div>
              </div>

              {/* Bloco sem label (footer-links-group direto) — igual ao bloco blog/contact/mobile do original */}
              <div className="footer-links-group">
                <a href="mailto:contato@masterdataautomacao.com.br" className="footer-link w-inline-block">
                  <div className="text-14-caps text-[#F0F4FF] opacity-50">E-mail</div>
                  <div className="underline bg-[#0D1F3C]"></div>
                </a>
                <a href="https://api.whatsapp.com/send/?phone=5534996320082&text&type=phone_number&app_absent=0" className="footer-link w-inline-block">
                  <div className="text-14-caps text-[#F0F4FF] opacity-50">WhatsApp</div>
                  <div className="underline bg-[#0D1F3C]"></div>
                </a>
                <a href="#" className="footer-link w-inline-block">
                  <div className="text-14-caps text-[#F0F4FF] opacity-50">Instagram</div>
                  <div className="underline bg-[#0D1F3C]"></div>
                </a>

                {/* Links de política visíveis apenas no mobile */}
                <div className="div-block-3 mobile">
                  <a href="/privacy" className="footer-link w-inline-block">
                    <div className="text-14-caps text-[#F0F4FF] opacity-50">Política de Privacidade</div>
                    <div className="underline bg-[#0D1F3C]"></div>
                  </a>
                  <a href="/terms-of-use" className="footer-link w-inline-block">
                    <div className="text-14-caps text-[#F0F4FF] opacity-50">Termos de Uso</div>
                    <div className="underline bg-[#0D1F3C]"></div>
                  </a>
                </div>
              </div>

            </div>

            {/* footer-right: CTA de contato + redes sociais */}
            <div className="footer-right">
              <div className="gap-20">
                <div className="text-14-caps text-[#4A6A9A] align-right">
                  Atendimento Presencial,
                  <br />
                  Raio de Até 150km.
                </div>
                <a href="mailto:contato@masterdataautomacao.com.br" className="footer-link w-inline-block">
                  <div className="text-20-medium">
                    <div className="link-2 text-[#F0F4FF] opacity-50">
                      E-mail: contato@masterdataautomacao.com.br
                    </div>
                  </div>
                  <div className="underline bg-[#0D1F3C]"></div>
                </a>
              </div>
              <div className="socials-group">
                <a href="https://www.instagram.com/master_data_automacao/" target="_blank" rel="noreferrer" className="footer-link w-inline-block">
                  <div className="text-14-caps text-[#F0F4FF] opacity-50">instagram</div>
                  <div className="underline bg-[#0D1F3C]"></div>
                </a>
              </div>
            </div>
          </div>

          {/* ── FOOTER BOTTOM ── */}
          <div className="footer-bottom">

            {/* Copyright */}
            <div className="text-14-caps text-[#4A6A9A]">
              © 2026. MASTER DATA AUTOMAÇÃO LTDA.
            </div>

            {/* Ícone/logo central — equivalente ao farm-icon-green-wrap */}
            <div className="farm-icon-green-wrap">
                <img src="/assets/LOGO-MD-PNG 1.svg" alt="Master Data Logo" className="w-12 h-auto opacity-70" />
            </div>

            {/* Links de política + website by */}
            <div className="footer-bottom-links">
              <div className="div-block-3">
                <a href="/privacy" className="footer-link w-inline-block">
                  <div className="text-14-caps text-[#F0F4FF] opacity-50">Política de Privacidade</div>
                  <div className="underline bg-[#0D1F3C]"></div>
                </a>
                <a href="/terms-of-use" className="footer-link w-inline-block">
                  <div className="text-14-caps text-[#F0F4FF] opacity-50">Termos de Uso</div>
                  <div className="underline bg-[#0D1F3C]"></div>
                </a>
              </div>
              <a href="https://antigravidade.studio" target="_blank" rel="noreferrer" className="footer-link adelt w-inline-block">
                <div className="text-14-caps text-[#1A3060] font-mono xx adelt-text">
                  website by
                </div>
                <div className="underline bg-[#0D1F3C]"></div>
                <div className="adelt-wrap-logo">
                    <img src="/assets/LOGO-MD-PNG 1.svg" alt="Master Data Logo" className="w-16 h-auto grayscale brightness-0 invert opacity-50" />
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
