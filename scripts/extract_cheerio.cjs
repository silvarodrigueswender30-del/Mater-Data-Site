const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '../documentos-marca/www_farmminerals_com.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(html);

// Extract the sections
let headerHtml = $.html($('.nav-wrap.w-nav'));
let heroHtml = $.html($('#s-first'));
let secondSectionHtml = $.html($('#s-second'));
let capsuleHtml = $.html($('.capsule'));

// Replacements as requested
// 1. Logo
headerHtml = headerHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*Farm%20Minerals%20Logo%20White\.svg/g, '/logo-principal.png');
// 2. Menu icon -> DIAMANTE.png
headerHtml = headerHtml.replace(/<div class="icon-menu".*?<\/div>/s, '<img src="/DIAMANTE.png" alt="Menu" class="icon-menu" style="width:32px;height:32px;object-fit:contain;" />');
// 3. Headline image -> METODO-STICKER.svg
heroHtml = heroHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*FM_hero_2\.svg/g, '/METODO-STICKER.svg');
heroHtml = heroHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*crop_headline_v2\.svg/g, '/METODO-STICKER.svg');
heroHtml = heroHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*FM_hero_mobile_1\.svg/g, '/METODO-STICKER.svg');
heroHtml = heroHtml.replace(/src="[^"]*FM_hero[^"]*"/g, 'src="/METODO-STICKER.svg"');
if (capsuleHtml) {
    capsuleHtml = capsuleHtml.replace(/src="[^"]*crop_headline[^"]*"/g, 'src="/METODO-STICKER.svg"');
}

const createComponent = (name, htmlContent) => {
  if (!htmlContent) return `export default () => <div>${name} not found</div>;`;
  const content = htmlContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  return `import React from 'react';\n\nconst ${name}: React.FC = () => {\n  return (\n    <div dangerouslySetInnerHTML={{ __html: \`${content}\` }} />\n  );\n};\n\nexport default ${name};\n`;
};

fs.writeFileSync(path.join(__dirname, '../src/components/Header.tsx'), createComponent('Header', headerHtml));
fs.writeFileSync(path.join(__dirname, '../src/components/HeroScroll.tsx'), createComponent('HeroScroll', heroHtml));
fs.writeFileSync(path.join(__dirname, '../src/components/Methodology.tsx'), createComponent('Methodology', secondSectionHtml));
fs.writeFileSync(path.join(__dirname, '../src/components/CapsuleDetail.tsx'), createComponent('CapsuleDetail', capsuleHtml));

// App.tsx
const appCode = `import Header from './components/Header'
import HeroScroll from './components/HeroScroll'
import Methodology from './components/Methodology'
import CapsuleDetail from './components/CapsuleDetail'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Run the custom scripts after mount
    const script = document.createElement('script');
    script.src = '/custom-scripts.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className="w-full relative text-[#F4EDE6]">
      <Header />
      <HeroScroll />
      <Methodology />
      <CapsuleDetail />
    </div>
  )
}

export default App
`;
fs.writeFileSync(path.join(__dirname, '../src/App.tsx'), appCode);

// index.css styles extraction
const cssTags = [];
$('style').each((i, el) => {
    let css = $(el).html();
    // Fix the unclosed rule: * { scrollbar-color: ...
    css = css.replace(/scrollbar-width:\s*thin;(?!\s*\})/g, 'scrollbar-width: thin; }');
    cssTags.push(css);
});

const tailwindImports = `@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/css/farm-minerals.webflow.shared.a798c87f5.min.css");
`;

fs.writeFileSync(path.join(__dirname, '../src/index.css'), tailwindImports + '\\n' + cssTags.join('\\n'));

// Scripts extraction
let scriptsCode = '';
$('script').each((i, el) => {
    if ($(el).html().includes('const frameUrls = [')) {
        scriptsCode = $(el).html();
    }
});

// Replace frame URLs with our local ones
let framesArray = 'const frameUrls = [\\n';
for (let i = 1; i <= 192; i++) {
    const pad = String(i).padStart(3, '0');
    framesArray += "  '/assets/frames/frame_" + pad + ".jpg',\\n";
}
framesArray += '];\\n';

scriptsCode = scriptsCode.replace(/const frameUrls = \[[^\]]+\];/, framesArray);

// Also add the hover target scripts if any
$('script').each((i, el) => {
    const html = $(el).html();
    if (html.includes('slider1()') || html.includes('hoverTarget.addEventListener')) {
        scriptsCode += '\\n' + html;
    }
});

fs.writeFileSync(path.join(__dirname, '../public/custom-scripts.js'), scriptsCode);

console.log('Done.');
