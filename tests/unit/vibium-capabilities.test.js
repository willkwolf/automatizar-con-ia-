const { browser } = require('vibium');
const path = require('path');
const assert = require('assert');
const {
  verifyActionButtonsContract,
  verifyAccordionsContract,
  verifyB2BTwoDivisionsContract,
  verifyCasaMatrizContract,
  verifyDirectContactContract,
  verifySkeletonIntegrity
} = require('../fixtures/atomic-contracts');

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
  console.log(' Vibium Unit & Component Test Suite: Atomic Contracts, CDD & Animations');
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

    // Test 4: Triada Service Architecture Animated Showcase Cards (No FIG Numbering)
    await it('Spanish #triada renders 3 interactive animated stage cards without static FIG numbering', async () => {
      const stageCards = await page.findAll('#triada .interactive-stage-card');
      assert.strictEqual(stageCards.length, 3, 'Expected exactly 3 interactive stage cards in #triada');

      // Assert zero FIG numbering text remains in page
      const figCount = await page.evaluate(
        "(() => Array.from(document.querySelectorAll('*')).filter(el => /FIG\\.\\s*\\d+/i.test(el.textContent) && el.children.length === 0).length)()"
      );
      assert.strictEqual(figCount, 0, 'No FIG numbering text should remain in the DOM');

      // Pillar 01 Card
      const p1Text = await stageCards[0].text();
      assert(p1Text.includes('SOFTWARE ENGINEERING WORKSPACE'), 'Missing P1 workspace title');
      assert(p1Text.includes('COMPILER ACTIVE'), 'Missing P1 compiler status');

      // Pillar 02 Card (showcase-reverse)
      const p2Article = await page.find('#triada article:nth-of-type(2)');
      const p2Class = await p2Article.getAttribute('class');
      assert(p2Class.includes('showcase-reverse'), 'Pilar 02 must have showcase-reverse for alternating Z-pattern');
      const p2Text = await stageCards[1].text();
      assert(p2Text.includes('OPERATIONS COMMAND'), 'Missing P2 operations command title');
      assert(p2Text.includes('FLOW OPTIMIZED'), 'Missing P2 flow status');

      // Pillar 03 Card
      const p3Text = await stageCards[2].text();
      assert(p3Text.includes('EPISTEMOLOGICAL LAB'), 'Missing P3 lab title');
      assert(p3Text.includes('RESEARCH UPSTREAM'), 'Missing P3 research status');

      // Assert anim scenes exist in each card
      const scenes = await page.findAll('#triada .anim-scene');
      assert.strictEqual(scenes.length, 9, 'Expected 9 animated scenes (3 per stage card)');
    })({ page });

    // Test 5: Atomic Contract - Collapsible Capability Accordions
    await it('[Atomic Contract] 13 capability accordions closed by default', async () => {
      await verifyAccordionsContract(page, 13);
    })({ page });

    // Test 6: Atomic Contract - Exactly 2 Operational Action Buttons
    await it('[Atomic Contract] Exactly 2 operational .btn-action buttons meet touch target & geometry', async () => {
      await verifyActionButtonsContract(page, 2);

      // Assert header and hero have 0 CTA buttons
      const headerBtns = await page.evaluate("(() => document.querySelectorAll('.nav-header .nav-cta').length)()");
      assert.strictEqual(headerBtns, 0, 'Header must have 0 CTA buttons to avoid fatigue');
      const heroBtns = await page.evaluate("(() => document.querySelectorAll('.hero-section .btn-action').length)()");
      assert.strictEqual(heroBtns, 0, 'Hero section must have 0 action buttons for editorial look');
    })({ page });

    // Test 7: Atomic Contract - Static Client Logos Island
    await it('[Atomic Contract] Client logos section is static with exactly 3 logos (Globant, Icesi, Valle del Cauca)', async () => {
      const logos = await page.findAll('.mfeLogosSectionLogo');
      assert.strictEqual(logos.length, 3, `Expected exactly 3 static client logos, found ${logos.length}`);

      const bodyText = await page.content();
      assert(!bodyText.includes('logosTrackScroll'), 'Animation logosTrackScroll must be removed');
    })({ page });

    // Test 8: Atomic Contract - Dedicated B2B Enterprise Training Section (Two Separate Divisions)
    await it('[Atomic Contract] B2B Enterprise Training has exactly 2 distinct division cards', async () => {
      await verifyB2BTwoDivisionsContract(page, 'habilitacion');

      const overviewText = await page.evaluate(
        "(() => document.querySelector('#habilitacion .b2b-overview-card').textContent)()"
      );
      assert(overviewText.includes('En qué consiste'), 'Missing overview heading');
      assert(overviewText.includes('Audiencia Objetivo'), 'Missing target audience');
      assert(overviewText.includes('Criterio de Supervisión'), 'Missing supervision criteria');
      assert(overviewText.includes('Formato'), 'Missing format specification');

      const curriculumText = await page.evaluate(
        "(() => document.querySelector('#habilitacion .b2b-curriculum-card').textContent)()"
      );
      assert(curriculumText.includes('Fase 01'), 'Missing Phase 1');
      assert(curriculumText.includes('Fase 02'), 'Missing Phase 2');
      assert(curriculumText.includes('Fase 03'), 'Missing Phase 3');
      assert(curriculumText.includes('Fase 04'), 'Missing Phase 4');

      const salesBtn = await page.find('#habilitacion .b2b-sales-cta-wrap .btn-action');
      const href = await salesBtn.getAttribute('href');
      assert(href.includes('wa.me/573002976815'), 'Sales CTA must connect to institutional WhatsApp');
    })({ page });

    // Test 9: Atomic Contract - Casa Matriz Portal & Direct Contact Organisms
    await it('[Atomic Contract] Casa Matriz Upstream portal and Direct Contact section invariants', async () => {
      await verifyCasaMatrizContract(page);
      await verifyDirectContactContract(page);
    })({ page });

    // Test 10: Spanish Delivery Models with Separated Showcase Divs & Duotone Figures (No FIG headers)
    await it('Spanish #metodologia renders 3 separated showcase divs with prominent duotones and no FIG headers', async () => {
      const items = await page.findAll('#metodologia .delivery-showcase-item');
      assert.strictEqual(items.length, 3, 'Expected exactly 3 delivery showcase items');

      // Assert no showcase-visual-header in methodology
      const figHeaders = await page.evaluate(
        "(() => document.querySelectorAll('#metodologia .showcase-visual-header').length)()"
      );
      assert.strictEqual(figHeaders, 0, 'showcase-visual-header must be removed from methodology');

      // Check Duotone SVGs prominence
      const svgs = await page.findAll('#metodologia .showcase-duotone-svg');
      assert.strictEqual(svgs.length, 3, 'Expected 3 prominent duotone SVGs in methodology section');
    })({ page });

    // Test 11: Skeleton & Template Invariant
    await it('[Template Invariant] Page skeleton structure and zero horizontal overflow', async () => {
      await verifySkeletonIntegrity(page);
    })({ page });

    console.log('\n[Suite 2: English Landing Page (en/index.html)]');
    await page.go(enUrl);

    // Test 12: English Triad Capabilities & Animated Stages
    await it('English Triad has capabilities, 13 accordions, 3 animated stages, and 2 B2B divisions', async () => {
      const pilar1 = await page.find('#triada article:nth-of-type(1)');
      const text1 = await pilar1.text();
      assert(text1.includes('Software Consulting'), 'Missing EN title');
      assert(text1.includes('Custom Enterprise Application Engineering'), 'Missing EN custom apps');
      assert(text1.includes('Legacy Modernization & Cloud Evolution'), 'Missing EN modernization');

      // Verify accordions
      await verifyAccordionsContract(page, 13);

      // Verify action buttons
      await verifyActionButtonsContract(page, 2);

      // Verify 3 animated stage cards
      const stageCards = await page.findAll('#triada .interactive-stage-card');
      assert.strictEqual(stageCards.length, 3, 'Expected 3 animated stage cards in EN #triada');

      // Verify 2 B2B divisions
      await verifyB2BTwoDivisionsContract(page, 'enablement');

      // Verify Casa Matriz & Direct Contact
      await verifyCasaMatrizContract(page);
      await verifyDirectContactContract(page);

      // Verify static logos
      const logos = await page.findAll('.mfeLogosSectionLogo');
      assert.strictEqual(logos.length, 3, 'Expected exactly 3 static logos in EN version');
    })({ page });

    // Test 13: English Delivery Models with Separated Showcase Divs & Zero FIG headers
    await it('English #methodology renders 3 separated showcase divs with prominent duotones and zero FIG headers', async () => {
      const items = await page.findAll('#methodology .delivery-showcase-item');
      assert.strictEqual(items.length, 3, 'Expected exactly 3 EN delivery showcase items');

      const figHeaders = await page.evaluate(
        "(() => document.querySelectorAll('#methodology .showcase-visual-header').length)()"
      );
      assert.strictEqual(figHeaders, 0, 'showcase-visual-header must be removed from EN methodology');

      const svgs = await page.findAll('#methodology .showcase-duotone-svg');
      assert.strictEqual(svgs.length, 3, 'Expected 3 prominent duotone SVGs in EN methodology section');
    })({ page });

    // Test 14: EN Skeleton Integrity
    await it('[Template Invariant] EN Page skeleton structure and zero horizontal overflow', async () => {
      await verifySkeletonIntegrity(page);
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
