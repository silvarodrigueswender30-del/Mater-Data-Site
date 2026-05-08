const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const htmlPath = path.join(__dirname, '../documentos-marca/www_farmminerals_com.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

// 1. Extract and fix CSS
let cssContent = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@import url("https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/css/farm-minerals.webflow.shared.a798c87f5.min.css");\n\n';

$('style').each((i, el) => {
    let css = $(el).html();
    // Fix unclosed rules
    css = css.replace(/scrollbar-width:\s*thin;(?!\s*\})/g, 'scrollbar-width: thin; }');
    cssContent += css + '\n';
});

fs.writeFileSync(path.join(__dirname, '../src/index.css'), cssContent);

// 2. Extract Body HTML (inside <div class="page-wrapper"> to ignore script tags at bottom)
let bodyHtml = $.html($('.page-wrapper'));

if (!bodyHtml) {
    // If no page-wrapper, get body contents but exclude scripts
    $('script').remove();
    bodyHtml = $('body').html();
}

// 3. Replacements
bodyHtml = bodyHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*Farm%20Minerals%20Logo%20White\.svg/g, '/logo-principal.png');
bodyHtml = bodyHtml.replace(/<div class="icon-menu".*?<\/div>/s, '<img src="/DIAMANTE.png" alt="Menu" class="icon-menu" style="width:32px;height:32px;object-fit:contain;" />');
bodyHtml = bodyHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*FM_hero_2\.svg/g, '/METODO-STICKER.svg');
bodyHtml = bodyHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*crop_headline_v2\.svg/g, '/METODO-STICKER.svg');
bodyHtml = bodyHtml.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^"]*FM_hero_mobile_1\.svg/g, '/METODO-STICKER.svg');
bodyHtml = bodyHtml.replace(/src="[^"]*FM_hero[^"]*"/g, 'src="/METODO-STICKER.svg"');
bodyHtml = bodyHtml.replace(/src="[^"]*crop_headline[^"]*"/g, 'src="/METODO-STICKER.svg"');

// Fix Next.js/React hydration and parsing errors with dangerouslySetInnerHTML
bodyHtml = bodyHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$');

const componentCode = `import React, { useEffect } from 'react';

const FullLanding: React.FC = () => {
  useEffect(() => {
    // Inject scripts
    const script = document.createElement('script');
    script.src = '/custom-scripts.js';
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
         document.body.removeChild(script);
      }
    }
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: \`${bodyHtml}\` }} />
  );
};

export default FullLanding;
`;

fs.writeFileSync(path.join(__dirname, '../src/components/FullLanding.tsx'), componentCode);

// App.tsx
const appCode = `import FullLanding from './components/FullLanding'

function App() {
  return (
    <div className="w-full relative text-[#F4EDE6]">
      <FullLanding />
    </div>
  )
}

export default App
`;
fs.writeFileSync(path.join(__dirname, '../src/App.tsx'), appCode);

console.log('Extraction complete!');
