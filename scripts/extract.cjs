const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../documentos-marca/www_farmminerals_com.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const extractSectionString = (htmlStr, startStr, endStr) => {
  const startIndex = htmlStr.indexOf(startStr);
  if (startIndex === -1) return null;
  const endIndex = htmlStr.indexOf(endStr, startIndex);
  if (endIndex === -1) return null;
  return htmlStr.substring(startIndex, endIndex + endStr.length);
};

let headerHtml = extractSectionString(html, '<div data-animation="default" class="nav-wrap w-nav"', '</div></div></div></div>'); 
// The w-nav is a few divs deep, I'll extract from start to the next major section:
let heroHtml = extractSectionString(html, '<header id="s-first" class="hero-section">', '</header>');
let secondSectionHtml = extractSectionString(html, '<section id="s-second" class="second-section">', '</section>');
let capsuleHtml = extractSectionString(html, '<section class="capsule">', '</section>');

if (!headerHtml) {
    const s = html.indexOf('<div data-animation="default" class="nav-wrap');
    if (s > -1) {
       const e = html.indexOf('<header id="s-first"');
       headerHtml = html.substring(s, e);
    }
}

// Replacements
headerHtml = headerHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*Farm%20Minerals%20Logo%20White\.svg/g, '/logo-principal.png');
headerHtml = headerHtml.replace(/<div class="icon-menu".*?<\/div>/s, '<img src="/DIAMANTE.png" alt="Menu" class="icon-menu w-8 h-8 object-contain" />');

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

fs.mkdirSync(path.join(__dirname, '../src/components'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../src/components/HeaderClone.tsx'), createComponent('HeaderClone', headerHtml));
fs.writeFileSync(path.join(__dirname, '../src/components/HeroClone.tsx'), createComponent('HeroClone', heroHtml));
fs.writeFileSync(path.join(__dirname, '../src/components/SecondSectionClone.tsx'), createComponent('SecondSectionClone', secondSectionHtml));
fs.writeFileSync(path.join(__dirname, '../src/components/CapsuleClone.tsx'), createComponent('CapsuleClone', capsuleHtml));

// App.tsx
const appCode = `import HeaderClone from './components/HeaderClone'
import HeroClone from './components/HeroClone'
import SecondSectionClone from './components/SecondSectionClone'
import CapsuleClone from './components/CapsuleClone'

function App() {
  return (
    <div className="w-full">
      <HeaderClone />
      <HeroClone />
      <SecondSectionClone />
      <CapsuleClone />
    </div>
  )
}

export default App
`;
fs.writeFileSync(path.join(__dirname, '../src/App.tsx'), appCode);

// index.css styles extraction
const cssStart = html.indexOf('<style>');
const cssEnd = html.indexOf('</style>', cssStart);
let customCss = '';
if (cssStart > -1 && cssEnd > -1) {
    customCss = html.substring(cssStart + 7, cssEnd);
}
// Second style tag
const cssStart2 = html.indexOf('<style>', cssEnd);
const cssEnd2 = html.indexOf('</style>', cssStart2);
if (cssStart2 > -1 && cssEnd2 > -1) {
    customCss += '\n' + html.substring(cssStart2 + 7, cssEnd2);
}
// Third style tag
const cssStart3 = html.indexOf('<style>', cssEnd2);
const cssEnd3 = html.indexOf('</style>', cssStart3);
if (cssStart3 > -1 && cssEnd3 > -1) {
    customCss += '\n' + html.substring(cssStart3 + 7, cssEnd3);
}

const existingCss = fs.readFileSync(path.join(__dirname, '../src/index.css'), 'utf8');
const tailwindImports = `@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/css/farm-minerals.webflow.shared.a798c87f5.min.css");
`;

fs.writeFileSync(path.join(__dirname, '../src/index.css'), tailwindImports + '\\n' + customCss);

// Scripts extraction
const scriptsStart = html.indexOf('const frameUrls = [');
const scriptsEnd = html.indexOf('</body>');
let scriptsCode = '';
if (scriptsStart > -1 && scriptsEnd > -1) {
    scriptsCode = html.substring(scriptsStart, scriptsEnd);
}

// Replace frame URLs with our local ones
let framesArray = 'const frameUrls = [\\n';
for (let i = 1; i <= 192; i++) {
    const pad = String(i).padStart(3, '0');
    framesArray += "  '/assets/frames/frame_" + pad + ".jpg',\n";
}
framesArray += '];\\n';

scriptsCode = scriptsCode.replace(/const frameUrls = \[[^\]]+\];/, framesArray);
scriptsCode = scriptsCode.replace(/<script[^>]*>/g, '').replace(/<\/script>/g, '');

fs.writeFileSync(path.join(__dirname, '../public/custom-scripts.js'), scriptsCode);

console.log('Done.');
