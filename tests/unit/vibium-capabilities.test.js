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
  console.log(' Vibium Unit & Component Test Suite: Capabilities, Accordions & B2B');
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

    // Test 4: Collapsible Accordions in Service Architecture
    await it('Capabilities are collapsible with <details> and <summary> saving cognitive load', async () => {
      const accordions = await page.findAll('.capability-accordion');
      assert.strictEqual(accordions.length, 13, `Expected 13 capability accordions, found ${accordions.length}`);
      
      const summaries = await page.findAll('.capability-summary');
      assert.strictEqual(summaries.length, 13, `Expected 13 capability summaries, found ${summaries.length}`);

      // Verify all are closed by default
      const openCount = await page.evaluate(
        "(() => document.querySelectorAll('.capability-accordion[open]').length)()"
      );
      assert.strictEqual(openCount, 0, 'Accordions should be closed by default to save visual space');
    })({ page });

    // Test 5: Casa Matriz Button
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

    // Test 6: All Buttons Geometry and Non-Truncation
    await it('All .btn-action buttons meet min-height (>=44px) and non-truncation', async () => {
      const buttons = await page.findAll('.btn-action');
      assert(buttons.length >= 7, 'Expected at least 7 action buttons including B2B sales');
      for (const btn of buttons) {
        const bounds = await btn.bounds();
        assert(bounds.height >= 44, `A .btn-action button height ${bounds.height}px is below 44px`);
      }
      const hasOverflow = await page.evaluate(
        "(() => Array.from(document.querySelectorAll('.btn-action')).some(el => el.scrollWidth > el.clientWidth + 4))()"
      );
      assert(!hasOverflow, 'A .btn-action button text is horizontally clipped/overflowing');
    })({ page });

    // Test 7: Static Client Logos Island
    await it('Client logos section is static with exactly 3 logos (Globant, Icesi, Valle del Cauca)', async () => {
      const logos = await page.findAll('.mfeLogosSectionLogo');
      assert.strictEqual(logos.length, 3, `Expected exactly 3 static client logos, found ${logos.length}`);

      const bodyText = await page.content();
      assert(!bodyText.includes('logosTrackScroll'), 'Animation logosTrackScroll must be removed');
      assert(!bodyText.includes('-              <g transform='), 'Found diff minus lines in HTML');
      assert(!bodyText.includes('+            <svg viewBox='), 'Found diff plus lines in HTML');
    })({ page });

    // Test 8: Dedicated B2B Enterprise Training Section
    await it('B2B Enterprise Training block has exactly 2 direct container divs with sales CTA', async () => {
      const b2bSection = await page.find('.b2b-training-section');
      assert(b2bSection, 'Missing .b2b-training-section');

      const containerChildren = await page.evaluate(
        "(() => document.querySelector('.b2b-training-container').children.length)()"
      );
      assert.strictEqual(containerChildren, 2, `Expected exactly 2 direct divs in B2B training block, found ${containerChildren}`);

      const overviewText = await page.evaluate(
        "(() => document.querySelector('.b2b-training-overview').textContent)()"
      );
      assert(overviewText.includes('Programa Ejecutivo'), 'Missing executive program heading');
      assert(overviewText.includes('Audiencia Objetivo'), 'Missing target audience');
      assert(overviewText.includes('Objetivos Centrales'), 'Missing core learning objectives');
      assert(overviewText.includes('Formato'), 'Missing format / seats specification');

      const curriculumText = await page.evaluate(
        "(() => document.querySelector('.b2b-training-curriculum').textContent)()"
      );
      assert(curriculumText.includes('Fase 01'), 'Missing Phase 1');
      assert(curriculumText.includes('Fase 02'), 'Missing Phase 2');
      assert(curriculumText.includes('Fase 03'), 'Missing Phase 3');
      assert(curriculumText.includes('Fase 04'), 'Missing Phase 4');

      const salesBtn = await page.find('.b2b-sales-cta-wrap .btn-action');
      const href = await salesBtn.getAttribute('href');
      assert(href.includes('wa.me/573002976815'), 'Sales CTA must connect to institutional WhatsApp');
    })({ page });

    console.log('\n[Suite 2: English Landing Page (en/index.html)]');
    await page.go(enUrl);

    // Test 9: English Capabilities & Accordions
    await it('English Triad has reverse-engineered capabilities, accordions and B2B block', async () => {
      const pilar1 = await page.find('#triada article:nth-of-type(1)');
      const text1 = await pilar1.text();
      assert(text1.includes('Software Consulting'), 'Missing EN title');
      assert(text1.includes('Custom Enterprise Application Engineering'), 'Missing EN custom apps');
      assert(text1.includes('Legacy Modernization & Cloud Evolution'), 'Missing EN modernization');

      const accordions = await page.findAll('.capability-accordion');
      assert.strictEqual(accordions.length, 13, 'Expected 13 EN accordions');

      const b2bChildren = await page.evaluate(
        "(() => document.querySelector('.b2b-training-container').children.length)()"
      );
      assert.strictEqual(b2bChildren, 2, 'Expected exactly 2 divs in EN B2B training container');

      const logos = await page.findAll('.mfeLogosSectionLogo');
      assert.strictEqual(logos.length, 3, 'Expected exactly 3 static logos in EN version');
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
