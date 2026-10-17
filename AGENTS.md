# AGENTS.md — Directrices de Gobierno Agéntico y Estándares de Ingeniería

> **Repositorio Matriz de Pensamiento Sistémico:** [Thinking-as-a-Service](https://github.com/willkwolf/Thinking-as-a-Service)  
> **Repositorio Git de Despliegue:** [automatizar-con-ia-](https://github.com/willkwolf/automatizar-con-ia-.git)  
> **Entorno:** `c:\Dev\Boutique-Digital`  
> **Última sincronización Upstream:** Commit `4e5662d` (2026-10-17) — *test(anti-slop): incorporar suite de auditoria de politicas de diseño anti-slop y cumplimiento de gobernanza*  

---

## 1. Identidad y Misión del Proyecto
Boutique Digital es el brazo formativo y de desarrollo de automatizaciones prácticas para "Empresas Livianas" (*Lightweight Enterprises*). Operamos con estándares de **Crema Editorial / Lujo Industrial**, alta densidad de señal, sobriedad conceptual y privacidad estricta de Cero Rastreo.

## 2. Separación de Responsabilidades: Matriz vs. Distribución
- **Políticas Globales Heredadas (Upstream):** Proceden de *Thinking-as-a-Service*. Incluyen: Anti-Slop Design Policy, directrices de Zero-Tracking, fronteras de superficie pública y protocolos de evaluación agéntica.
- **Configuración Local Específica (Downstream):** Pertenece exclusivamente a *Boutique Digital*. Incluye: Syllabus formativo (M1 a M5), Proyectos de automatización (P1 a P5), precios transparentes en COP, embudo de conversión vía WhatsApp y landing page HTML estática.

## 3. Modelo Operativo de Agentes
1. Todo cambio en código o documentación debe respetar el principio SSOT establecido en `PROJECT.md`.
2. Las afirmaciones comerciales (`CLAIM`) deben estar respaldadas por pruebas verificables (`PROOF`) o tipadas como `[pendiente_de_validacion]`.
3. Ningún agente puede insertar librerías externas de telemetría o analítica sin justificación formal.
4. Toda interfaz web debe superar las suites de verificación antes de ser promovida o publicada.

---

## 9. ANTI-SLOP DESIGN POLICY

### 9.1 Objective
Prevent generic, statistically average visual output from AI-generated websites. Preserve product identity, visual distinction, functional clarity, accessibility, and credibility.

### 9.2 Mandatory Constraints
1. **No Default SaaS Aesthetics:** Do not apply default SaaS aesthetics without an explicit design rationale.
2. **No AI Cliché Combos:** Do not combine multiple recognizable AI-design clichés in the same page.
3. **No Neon / Purple Gradients / Bento Slop:** Do not default to purple gradients, glassmorphism, radial orbs, neon accents, generic bento grids, or three identical feature cards.
4. **Purpose-Driven Typography:** Do not select Inter, Geist, Space Grotesk, or any typeface merely because it is common in AI-generated interfaces. Select typography based on brand, audience, language, readability, and hierarchy.
5. **No Icon Filler:** Do not use Lucide, emojis, checkmarks, or decorative icons as automatic substitutes for meaningful visual communication.
6. **Zero Fabrication:** Do not fabricate testimonials, customer logos, metrics, product interfaces, or demonstrations.
7. **Authentic Copywriting:** Do not invent pricing tiers or use generic marketing copy, repetitive em dashes, or the formula "It's not X, it's Y" as a default writing pattern.
8. **Functional Motion & Styling:** Do not add decorative animations, hover effects, shadows, colored stripes, or rounded corners without a functional or art-direction rationale.
9. **Complete State Coverage:** Do not omit loading, skeleton, empty, error, success, validation, focus, or responsive states when required by the product.
10. **Legal & Compliance Integrity:** Do not omit applicable privacy policies, terms of service, consent mechanisms, or other required disclosures.
11. **Reality Testing Beyond Screenshots:** Do not optimize for screenshots alone. Verify actual interactions, responsive layouts, accessibility, and real product content.

### 9.3 Design Requirements
- Establish a product-specific visual direction before implementation.
- Define typography, palette, spacing, radii, borders, elevation, iconography, and motion rules.
- Use real product assets and evidence wherever available.
- Vary layout according to information hierarchy, not decorative novelty.
- Preserve recognizable brand characteristics across all routes and states.
- Use semantic HTML, keyboard-accessible controls, sufficient contrast, and reduced-motion support.

### 9.4 Exception Protocol
A prohibited pattern may be retained only when:
(a) the design brief or product behavior justifies it;
(b) its use is consistent with the established design system; and
(c) it does not introduce usability, accessibility, credibility, or performance regressions.

### 9.5 Final Review Gate
Before delivery:
- Identify every remaining anti-pattern.
- Explain its purpose or replace it.
- Verify that no evidence, product behavior, or customer claim was fabricated.
- Test primary interactions and relevant responsive states.
- Compare the result against the actual product brief and visual references.

*Passing the checklist is necessary but not sufficient. The final interface must communicate a specific product identity rather than merely avoid familiar AI aesthetics.*

---

## 10. PROTOCOLO DE SINCRONIZACIÓN Y GOBERNANZA EN CASCADA

1. **Herencia Selectiva:** Los cambios a políticas generales de la Casa Matriz se importan mediante `python scripts/sync_upstream_policies.py`.
2. **Validación de Contrato:** Tras cada sincronización, se ejecuta obligatoriamente `python scripts/verify_policy_contract.py` para asegurar que el repositorio downstream cumple con los contratos globales.
3. **Inviolabilidad de Configuración Local:** El script de cascada nunca sobreescribe el syllabus local, los precios en COP, los números de contacto ni las rutas específicas de GitHub Pages.
4. **Verificación de Superficie:** Todo incremento web público debe satisfacer `python scripts/verify_surface_security.py`.

---
*Documento de gobernanza activo sincronizado con Thinking-as-a-Service (4e5662d).*
