const { browser } = require('vibium');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let failedTests = 0;

function it(desc, fn) {
  return async (context) => {
    try {
      await fn(context);
      console.log(`  \x1b[32m✔ PASS\x1b[0m: ${desc}`);
      passedTests++;
    } catch (err) {
      console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${desc}`);
      console.error(`    ${err.message}`);
      failedTests++;
    }
  };
}

async function runVibiumSuite() {
  console.log('\n======================================================');
  console.log(' Vibium Unit & Component Test Suite: Capabilities & Buttons');
  console.log('======================================================\n');

  const b = await browser.start({ headless: true });
  const page = await b.page();

  try {
    const esUrl = 'file://' + path.resolve('index.html').replace(/\\/g, '/');
    const enUrl = 'file://' + path.resolve('en/index.html').replace(/\\/g, '/');

    console.log('[Suite 1: Spanish Landing Page (index.html)]');
    await page.go(esUrl);

    // Test 1: Reverse-engineered Software Capabilities
    await it('Pilar 01 has reverse-engineered Fast Code & Engineering Studio capabilities', async () => {
      const pilar1 = await page.find('#triada article:nth-of-type(1)');
      const text = await pilar1.text();
      assert(text.includes('Consultoría de Software'), 'Missing title');
      assert(text.includes('Desarrollo de Aplicaciones Empresariales a Medida'), 'Missing custom apps capability');
      assert(text.includes('Modernización de Sistemas & Evolución Cloud'), 'Missing modernization capability');
      assert(text.includes('Inteligencia Artificial Empresarial Embebida'), 'Missing enterprise AI capability');
      assert(text.includes('Habilitación de Arquitecturas Modulares & Ecosistemas'), 'Missing modular arch capability');
      assert(text.includes('Aceleración Lean-Agile & Optimización de TCO'), 'Missing TCO acceleration capability');
      assert(!text.includes('Conexión determinista entre tus plataformas'), 'Contains old SLA copy');
    })({ page });

    // Test 2: Reverse-engineered Operations Capabilities
    await it('Pilar 02 has reverse-engineered Cultural & Business Consulting capabilities', async () => {
      const pilar2 = await page.find('#triada article:nth-of-type(2)');
      const text = await pilar2.text();
      assert(text.includes('Consultoría de Operaciones'), 'Missing title');
      assert(text.includes('Reinvención del Negocio Central & Eficiencia Operativa'), 'Missing core reinvention capability');
      assert(text.includes('Culturas Impulsadas por IA & Gestión del Cambio'), 'Missing AI culture capability');
      assert(text.includes('Adopción Tecnológica & Habilitación de Plataformas'), 'Missing tech adoption capability');
      assert(text.includes('Equipos de Alto Rendimiento & Liderazgo Ágil'), 'Missing high perf teams capability');
      assert(text.includes('Operaciones Sostenibles & Sobriedad Digital (Green IT)'), 'Missing sustainable ops capability');
    })({ page });

    // Test 3: Reverse-engineered Knowledge Capabilities
    await it('Pilar 03 has Thinking-as-a-Service Hub capabilities', async () => {
      const pilar3 = await page.find('#triada article:nth-of-type(3)');
      const text = await pilar3.text();
      assert(text.includes('Generación de Conocimiento'), 'Missing title');
      assert(text.includes('Modelado de Complejidad Sistémica'), 'Missing complexity modeling capability');
      assert(text.includes('Protocolos de Evaluación Empírica & Anti-Slop'), 'Missing anti-slop eval capability');
      assert(text.includes('Investigación de Frontera en IA & Gobernanza Ética'), 'Missing AI frontier capability');
    })({ page });

    // Test 4: Casa Matriz Button
    await it('Casa Matriz button has elegant typography, valid link and no truncation', async () => {
      const btn = await page.find('.btn-casa-matriz');
      const href = await btn.getAttribute('href');
      const target = await btn.getAttribute('target');
      const rel = await btn.getAttribute('rel');
      const bounds = await btn.bounds();
      
      const isTruncated = await page.evaluate(
        "(() => { const el = document.querySelector('.btn-casa-matriz'); return el.scrollWidth > el.clientWidth + 2; })()"
      );

      assert.strictEqual(href, 'https://willkwolf.github.io/Thinking-as-a-Service/');
      assert.strictEqual(target, '_blank');
      assert.strictEqual(rel, 'noopener');
      assert(!isTruncated, 'Button text is truncated horizontally');
      assert(bounds.height >= 44, `Button touch target height ${bounds.height}px is below 44px`);
    })({ page });

    // Test 5: All Buttons Geometry and Non-Truncation
    await it('All .btn-action buttons meet min-height (>=44px) and non-truncation', async () => {
      const buttons = await page.findAll('.btn-action');
      assert(buttons.length >= 6, 'Expected at least 6 action buttons');
      for (const btn of buttons) {
        const bounds = await btn.bounds();
        assert(bounds.height >= 44, `A .btn-action button height ${bounds.height}px is below 44px`);
      }
      const hasOverflow = await page.evaluate(
        "(() => Array.from(document.querySelectorAll('.btn-action')).some(el => el.scrollWidth > el.clientWidth + 4))()"
      );
      assert(!hasOverflow, 'A .btn-action button text is horizontally clipped/overflowing');
    })({ page });

    // Test 6: Reconciled Client Logos Single-Tone SVGs
    await it('Client logos section has reconciled Globant, Icesi and Valle del Cauca SVGs without diff errors', async () => {
      const logos = await page.findAll('.mfeLogosSectionLogo');
      assert(logos.length >= 6, 'Expected at least 6 logo instances');

      const bodyText = await page.content();
      assert(!bodyText.includes('-              <g transform='), 'Found diff minus lines in HTML');
      assert(!bodyText.includes('+            <svg viewBox='), 'Found diff plus lines in HTML');
    })({ page });

    console.log('\n[Suite 2: English Landing Page (en/index.html)]');
    await page.go(enUrl);

    // Test 7: English Capabilities
    await it('English Triad has reverse-engineered capabilities across all 3 pillars', async () => {
      const pilar1 = await page.find('#triada article:nth-of-type(1)');
      const text1 = await pilar1.text();
      assert(text1.includes('Software Consulting'), 'Missing EN title');
      assert(text1.includes('Custom Enterprise Application Engineering'), 'Missing EN custom apps');
      assert(text1.includes('Legacy Modernization & Cloud Evolution'), 'Missing EN modernization');

      const pilar2 = await page.find('#triada article:nth-of-type(2)');
      const text2 = await pilar2.text();
      assert(text2.includes('Operations Consulting'), 'Missing EN title');
      assert(text2.includes('Core Business Reinvention & Operational Efficiency'), 'Missing EN core reinvention');

      const pilar3 = await page.find('#triada article:nth-of-type(3)');
      const text3 = await pilar3.text();
      assert(text3.includes('Knowledge Generation'), 'Missing EN title');
      assert(text3.includes('Systemic Complexity Modeling'), 'Missing EN complexity');

      const btn = await page.find('.btn-casa-matriz');
      const href = await btn.getAttribute('href');
      assert.strictEqual(href, 'https://willkwolf.github.io/Thinking-as-a-Service/');
      
      const isTruncated = await page.evaluate(
        "(() => { const el = document.querySelector('.btn-casa-matriz'); return el.scrollWidth > el.clientWidth + 2; })()"
      );
      assert(!isTruncated, 'EN Casa Matriz button is truncated');
    })({ page });

  } finally {
    await b.stop();
  }

  console.log('\n------------------------------------------------------');
  console.log(` Vibium Tests: ${passedTests} passed, ${failedTests} failed`);
  console.log('------------------------------------------------------\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runVibiumSuite().catch(err => {
  console.error('Unhandled suite error:', err);
  process.exit(1);
});
