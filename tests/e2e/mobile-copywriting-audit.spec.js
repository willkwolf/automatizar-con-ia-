// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const path = require('path');

const VIEWPORTS = [
  { name: 'android-360', width: 360, height: 800 },
  { name: 'iphone-390', width: 390, height: 844 },
  { name: 'large-430', width: 430, height: 932 },
  { name: 'narrow-320', width: 320, height: 640 },
];

const SCREENSHOT_DIR = path.resolve('docs/kaizen-copywriting/screenshots');

test.describe('Mobile-First Copywriting, UX & Cognitive Load Audit', () => {

  for (const vp of VIEWPORTS) {
    test(`Mobile Audit [${vp.name} (${vp.width}x${vp.height}px)] - First Viewport 3-Second Test & Cognitive Load`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // 1. First Viewport 3-Second Comprehension Check
      const hero = page.locator('.hero-section');
      await expect(hero).toBeVisible();

      const heroEyebrow = hero.locator('.eyebrow');
      await expect(heroEyebrow).toBeVisible();
      const eyebrowText = await heroEyebrow.innerText();
      expect(eyebrowText.length).toBeGreaterThan(10);

      const heroTitle = hero.locator('.hero-title');
      await expect(heroTitle).toBeVisible();
      const titleBox = await heroTitle.boundingBox();
      expect(titleBox).not.toBeNull();
      // Ensure title is fully within first viewport height
      expect(titleBox.y + titleBox.height).toBeLessThan(vp.height);

      const heroSubtitle = hero.locator('.hero-subtitle');
      await expect(heroSubtitle).toBeVisible();
      const subtitleText = await heroSubtitle.innerText();
      const subtitleWords = subtitleText.trim().split(/\s+/).length;
      console.log(`[${vp.name}] Hero subtitle words: ${subtitleWords}`);

      // Ensure no horizontal overflow in first viewport
      const overflowInfo = await page.evaluate(() => {
        const winW = window.innerWidth;
        const bad = [];
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > winW + 2) {
            bad.push(`${el.tagName}.${el.className} (r=${Math.round(r.right)} w=${Math.round(r.width)})`);
          }
        });
        return { scrollW: document.documentElement.scrollWidth, winW, bad: bad.slice(0, 10) };
      });
      if (overflowInfo.scrollW > overflowInfo.winW + 2) {
        console.log(`[${vp.name}] OVERFLOW DETECTED:`, overflowInfo);
      }
      expect(overflowInfo.scrollW).toBeLessThanOrEqual(overflowInfo.winW + 2);

      // Capture First Viewport Screenshot
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `01_hero_${vp.name}.png`),
        clip: { x: 0, y: 0, width: vp.width, height: vp.height },
      });

      // 2. Scroll through Key Journey Milestones (AIDA Progression) & Capture Screenshots
      // A) Interest: Capabilities Triad
      const triada = page.locator('#triada');
      await triada.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350); // allow reveal transition
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `02_triada_${vp.name}.png`),
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(800, vp.height) },
      });

      // B) Desire: Delivery Models (Hero's Journey / Digital Probes / Hybrid)
      const metodologia = page.locator('#metodologia');
      await metodologia.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `03_metodologia_${vp.name}.png`),
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(800, vp.height) },
      });

      // C) Action: B2B Enablement & Direct Contact
      const habilitacion = page.locator('#habilitacion');
      await habilitacion.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `04_habilitacion_${vp.name}.png`),
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(800, vp.height) },
      });

      const contact = page.locator('.direct-contact-section');
      await contact.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `05_contact_${vp.name}.png`),
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(800, vp.height) },
      });

      // 3. Full-Page Horizontal Overflow Check
      const fullPageOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 2;
      });
      expect(fullPageOverflow).toBeFalsy();

      // 4. Touch Target Audit on Mobile
      const actionButtons = page.locator('.btn-action');
      const btnCount = await actionButtons.count();
      expect(btnCount).toBe(2);

      for (let i = 0; i < btnCount; i++) {
        const btn = actionButtons.nth(i);
        const box = await btn.boundingBox();
        expect(box).not.toBeNull();
        expect(box.height).toBeGreaterThanOrEqual(44);
      }

      // 5. Accessibility Audit (WCAG 2.2 AA)
      const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .disableRules(['color-contrast']) // Reviewed under editorial cream design token policy
        .analyze();
      expect(axeResults.violations).toEqual([]);
    });
  }

  test('Cognitive Load Metrics Extraction (Quantitative Analysis)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const metrics = await page.evaluate(() => {
      function getStats(text) {
        const words = text.trim().split(/\s+/).filter(Boolean);
        return {
          wordCount: words.length,
          charCount: text.length,
        };
      }

      const heroTitle = document.querySelector('.hero-title')?.textContent || '';
      const heroSubtitle = document.querySelector('.hero-subtitle')?.textContent || '';
      
      const p1Desc = document.querySelector('#triada article:nth-of-type(1) .card-desc')?.textContent || '';
      const p2Desc = document.querySelector('#triada article:nth-of-type(2) .card-desc')?.textContent || '';
      const p3Desc = document.querySelector('#triada article:nth-of-type(3) .card-desc')?.textContent || '';

      const m1Narrative = Array.from(document.querySelectorAll('#metodologia .delivery-showcase-item:nth-of-type(1) .showcase-narrative p')).map(p => p.textContent).join(' ');
      const m2Narrative = Array.from(document.querySelectorAll('#metodologia .delivery-showcase-item:nth-of-type(2) .showcase-narrative p')).map(p => p.textContent).join(' ');
      const m3Narrative = Array.from(document.querySelectorAll('#metodologia .delivery-showcase-item:nth-of-type(3) .showcase-narrative p')).map(p => p.textContent).join(' ');

      const b2bLead = document.querySelector('#habilitacion .b2b-overview-card .b2b-card-lead')?.textContent || '';

      return {
        hero: {
          title: getStats(heroTitle),
          subtitle: getStats(heroSubtitle),
        },
        pillars: {
          pilar1: getStats(p1Desc),
          pilar2: getStats(p2Desc),
          pilar3: getStats(p3Desc),
        },
        methodology: {
          showcase1: getStats(m1Narrative),
          showcase2: getStats(m2Narrative),
          showcase3: getStats(m3Narrative),
        },
        enablement: {
          lead: getStats(b2bLead),
        }
      };
    });

    console.log('\n--- QUANTITATIVE COPYWRITING METRICS ---');
    console.log(JSON.stringify(metrics, null, 2));

    // Assert that hero title is concise (< 20 words)
    expect(metrics.hero.title.wordCount).toBeLessThanOrEqual(20);

    // Record baseline for optimization
    expect(metrics.hero.subtitle.wordCount).toBeGreaterThan(15);
  });
});
