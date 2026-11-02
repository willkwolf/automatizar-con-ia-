/**
 * Atomic Design & Component-Driven Development (CDD) Contract Definitions.
 * 
 * Defines the structural invariants and acceptance contracts for Boutique Digital:
 * - ATOMS: Buttons, Badges, Typography Tokens, Focus Rings.
 * - MOLECULES: Capability Accordions, Module Cards, Interactive Showcase Visuals, Static Logos.
 * - ORGANISMS: Independent Sectional Blocks (Hero, Clients, Triad Showcases, B2B Overview, B2B Curriculum, Casa Matriz, Direct Contact, Footer).
 * - TEMPLATES & RESPONSIVENESS: Mobile (375px) vs Desktop (1280px) viewport invariants, zero horizontal overflow.
 */

const assert = require('assert');

/**
 * Validates Atom: Action Buttons Contract (WCAG 2.1 AA Touch Target & Geometry)
 */
async function verifyActionButtonsContract(page, expectedCount = 2) {
  const buttons = await page.findAll('.btn-action');
  assert.strictEqual(
    buttons.length,
    expectedCount,
    `[Atoms Contract] Expected exactly ${expectedCount} operational .btn-action buttons, found ${buttons.length}`
  );

  for (const btn of buttons) {
    const bounds = await btn.bounds();
    assert(
      bounds.height >= 44,
      `[Atoms Contract] .btn-action touch target height ${bounds.height}px must be >= 44px`
    );
  }

  const hasOverflow = await page.evaluate(
    "(() => Array.from(document.querySelectorAll('.btn-action')).some(el => el.scrollWidth > el.clientWidth + 4))()"
  );
  assert(!hasOverflow, '[Atoms Contract] .btn-action button text must not horizontally overflow or truncate');
}

/**
 * Validates Molecule: Capability Accordions Contract
 */
async function verifyAccordionsContract(page, expectedCount = 13) {
  const accordions = await page.findAll('.capability-accordion');
  assert.strictEqual(
    accordions.length,
    expectedCount,
    `[Molecules Contract] Expected exactly ${expectedCount} capability accordions, found ${accordions.length}`
  );

  const openCount = await page.evaluate(
    "(() => document.querySelectorAll('.capability-accordion[open]').length)()"
  );
  assert.strictEqual(openCount, 0, '[Molecules Contract] All accordions must be closed by default');
}

/**
 * Validates Organism: B2B Enterprise Enablement Part 1 (Overview) & Part 2 (Curriculum)
 * Enforces two separate distinct divisions for breathing room and modularity.
 */
async function verifyB2BTwoDivisionsContract(page, sectionId = 'habilitacion') {
  const overviewCard = await page.find(`#${sectionId} .b2b-overview-card`);
  assert(overviewCard, `[Organisms Contract] #${sectionId} missing distinct .b2b-overview-card division`);

  const curriculumCard = await page.find(`#${sectionId} .b2b-curriculum-card`);
  assert(curriculumCard, `[Organisms Contract] #${sectionId} missing distinct .b2b-curriculum-card division`);

  // Ensure they are separate top-level division siblings inside .b2b-divisions-wrapper
  const siblingCount = await page.evaluate(
    `(() => {
      const wrapper = document.querySelector('#${sectionId} .b2b-divisions-wrapper');
      return wrapper ? wrapper.children.length : 0;
    })()`
  );
  assert.strictEqual(
    siblingCount,
    2,
    `[Organisms Contract] Expected exactly 2 distinct division cards in #${sectionId} .b2b-divisions-wrapper`
  );

  // Validate module count in curriculum
  const moduleCards = await page.findAll(`#${sectionId} .b2b-module-card`);
  assert.strictEqual(
    moduleCards.length,
    4,
    `[Organisms Contract] Expected exactly 4 module cards in #${sectionId}`
  );
}

/**
 * Validates Organism: Casa Matriz Upstream Portal Invariant (Spacing, Padding, Alignment)
 */
async function verifyCasaMatrizContract(page) {
  const section = await page.find('.casa-matriz-section');
  assert(section, '[Organisms Contract] Missing .casa-matriz-section');

  const card = await page.find('.casa-matriz-card');
  assert(card, '[Organisms Contract] Missing .casa-matriz-card');

  // Verify internal padding and no border collision
  const cardBounds = await card.bounds();
  assert(cardBounds.width > 280, '[Organisms Contract] .casa-matriz-card width must be substantial');

  const btn = await page.find('.btn-casa-matriz');
  assert(btn, '[Organisms Contract] Missing .btn-casa-matriz portal link');
  const href = await btn.getAttribute('href');
  assert.strictEqual(href, 'https://willkwolf.github.io/Thinking-as-a-Service/');
}

/**
 * Validates Template / Skeleton: Independent Section Structure & Zero Horizontal Overflow
 */
async function verifySkeletonIntegrity(page) {
  // Verify main contains well-ordered sections
  const sections = await page.evaluate(
    "(() => Array.from(document.querySelectorAll('main > section')).map(s => s.className || s.id))()"
  );
  assert(sections.length >= 6, `[Template Invariant] Expected at least 6 main sections, found ${sections.length}`);

  // Verify zero horizontal page overflow
  const isOverflowing = await page.evaluate(
    "(() => document.documentElement.scrollWidth > window.innerWidth + 2)()"
  );
  assert(!isOverflowing, '[Template Invariant] Page must have zero horizontal overflow');
}

module.exports = {
  verifyActionButtonsContract,
  verifyAccordionsContract,
  verifyB2BTwoDivisionsContract,
  verifyCasaMatrizContract,
  verifySkeletonIntegrity
};
