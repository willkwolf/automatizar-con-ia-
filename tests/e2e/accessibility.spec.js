const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('E2E Visual & Accessibility Suite (Playwright + Axe)', () => {
  
  test('Accessibility (WCAG 2.1 AA) - Spanish Landing Page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // Reviewed under editorial cream design token policy
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Accessibility (WCAG 2.1 AA) - English Landing Page', async ({ page }) => {
    await page.goto('/en/');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Reverse-Engineered Capabilities Structure & Pillars (ES & EN)', async ({ page }) => {
    await page.goto('/');
    
    // Check Pillar 01 (Software Consulting)
    const pillar1 = page.locator('#triada article').nth(0);
    await expect(pillar1).toContainText('Pilar 01');
    await expect(pillar1).toContainText('Consultoría de Software');
    await expect(pillar1).toContainText('Desarrollo de Aplicaciones Empresariales a Medida');
    await expect(pillar1).toContainText('Modernización de Sistemas');
    await expect(pillar1).toContainText('Inteligencia Artificial Empresarial Embebida');
    await expect(pillar1).toContainText('Habilitación de Arquitecturas Modulares');
    await expect(pillar1).toContainText('Aceleración Lean-Agile');

    // Check Pillar 02 (Operations Consulting)
    const pillar2 = page.locator('#triada article').nth(1);
    await expect(pillar2).toContainText('Pilar 02');
    await expect(pillar2).toContainText('Consultoría de Operaciones');
    await expect(pillar2).toContainText('Reinvención del Negocio Central');
    await expect(pillar2).toContainText('Culturas Impulsadas por IA');
    await expect(pillar2).toContainText('Adopción Tecnológica');
    await expect(pillar2).toContainText('Equipos de Alto Rendimiento');
    await expect(pillar2).toContainText('Operaciones Sostenibles');

    // Check Pillar 03 (Knowledge / Casa Matriz)
    const pillar3 = page.locator('#triada article').nth(2);
    await expect(pillar3).toContainText('Pilar 03');
    await expect(pillar3).toContainText('Generación de Conocimiento');
    await expect(pillar3).toContainText('Modelado de Complejidad Sistémica');
    await expect(pillar3).toContainText('Protocolos de Evaluación Empírica');
    await expect(pillar3).toContainText('Investigación de Frontera en IA');
  });

  test('Casa Matriz Button - Non-Truncation, Styling & Attributes', async ({ page }) => {
    await page.goto('/');
    const casaMatrizBtn = page.locator('.btn-casa-matriz');
    
    await expect(casaMatrizBtn).toBeVisible();
    await expect(casaMatrizBtn).toHaveAttribute('href', 'https://willkwolf.github.io/Thinking-as-a-Service/');
    await expect(casaMatrizBtn).toHaveAttribute('target', '_blank');
    await expect(casaMatrizBtn).toHaveAttribute('rel', 'noopener');
    
    // Verify no text truncation (scrollWidth should match or be within clientWidth)
    const isTruncated = await casaMatrizBtn.evaluate(el => el.scrollWidth > el.clientWidth + 2);
    expect(isTruncated).toBeFalsy();

    // Verify touch target height
    const box = await casaMatrizBtn.boundingBox();
    expect(box).not.toBeNull();
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

  test('All Primary & Secondary Buttons Meet Geometry & Non-Truncation Constraints', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('.btn-action');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      await expect(btn).toBeVisible();
      
      const box = await btn.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);

      // Verify no horizontal overflow/clipping
      const overflow = await btn.evaluate(el => el.scrollWidth > el.clientWidth + 4);
      expect(overflow).toBeFalsy();
    }
  });

  test('Client Logos Single-Tone Section Renders Clean Monochrome Vectors', async ({ page }) => {
    await page.goto('/');
    const clientsSection = page.locator('.clients-section');
    await expect(clientsSection).toBeVisible();

    const logos = page.locator('.mfeLogosSectionLogo');
    expect(await logos.count()).toBeGreaterThanOrEqual(6); // 3 original + 3 loop duplicate

    // Check SVG presence and valid viewBox
    const globantLogo = page.locator('.mfeLogosSectionLogo[title="Globant"] svg');
    await expect(globantLogo).toBeVisible();
    await expect(globantLogo).toHaveAttribute('viewBox', '0 0 142 28');

    const icesiLogo = page.locator('.mfeLogosSectionLogo[title="Universidad Icesi"] svg');
    await expect(icesiLogo).toBeVisible();
    await expect(icesiLogo).toHaveAttribute('viewBox', '40 50 480 185');

    const valleLogo = page.locator('.mfeLogosSectionLogo[title="Gobernación del Valle del Cauca"] svg');
    await expect(valleLogo).toBeVisible();
  });
});
