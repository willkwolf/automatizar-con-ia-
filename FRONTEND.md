# Frontend Architecture & Design System — Boutique Digital

> **Estética:** Crema Editorial / Lujo Industrial  
> **Arquitectura:** HTML5 Semántico Estático + Vanilla CSS3 + Vanilla JS Ultraligero  
> **Modo de Color:** Day / Warm Cream (`--bg: #f7f6f2`, `--ink: #121614`)  
> **Sincronización Upstream:** Commit `4e5662d` (2026-10-17)  

---

## 1. Tokens de Diseño y Tipografía

### Tipografía Intencional
- **Display / Títulos H1-H2:** `'Fraunces'`, Georgia, serif (`--font-display`). Peso 700 / Italic con contrastes mesurados.
- **Body / Lectura:** `'Plus Jakarta Sans'`, system-ui, sans-serif (`--font-body`). Alta legibilidad en pantallas táctiles y escritorio.
- **Telemetría / Cifras / Etiquetas:** `'IBM Plex Mono'`, monospace (`--font-mono`). Usado para chips de categoría, duraciones, códigos y badges técnicos.

### Paleta Activa (Crema Editorial / Lujo Industrial)
```css
:root {
  --bg: #f7f6f2;            /* Crema base suave */
  --ink: #121614;           /* Tinta profunda de alto contraste */
  --card-bg: #ffffff;       /* Fondo de tarjetas puras */
  --border: #e4e1d8;        /* Borde sutil cálido */
  --border-dark: #c5c0b2;   /* Borde enfatizado */
  --muted: #5e6661;         /* Texto secundario de alta legibilidad */
  --accent: #1e293b;        /* Acento industrial */
  --accent-soft: #edeae2;   /* Contenedor de chips */
  --gold-subtle: #8a6a35;   /* Dorado viejo sobrio para énfasis */
  --green-status: #1e5e3a;  /* Indicador en línea activo */
}
```

---

## 2. Principios de Interacción y Accesibilidad (WCAG 2.1 AA)

1. **Cobertura Completa de Estados:** Todo botón, enlace y elemento interactivo debe contar con estados definidos para:
   - Default
   - Hover (`transform: translateY(-1px)`, sombra sutil)
   - Active (`transform: translateY(0)`)
   - Focus visible (`:focus-visible` con `outline: 2px solid var(--gold-subtle); outline-offset: 2px;`)
   - Disabled (si aplica)
2. **Soporte de Movimiento Reducido:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
3. **Cero Dependencias Pesadas:** Prohibido el uso de React, Vue o bibliotecas de animación JS pesadas en la landing page principal. Máxima velocidad de carga y mínimo impacto ecológico/computacional.

---

## Anti-Slop Design Policy

### Objetivo
Prevenir la producción de interfaces genéricas y estadísticamente homogéneas generadas por IA. Preservar la identidad de marca, distinción visual, claridad funcional, accesibilidad y credibilidad en el posicionamiento de consultoría estratégica C-Suite.

### Restricciones Obligatorias
1. **Sin estética SaaS por defecto:** No aplicar estilos predeterminados de software sin justificación explícita de diseño.
2. **Cero combinaciones de clichés de IA:** No agrupar múltiples clichés de diseño sintético en la misma página.
3. **Prohibición de degradados púrpuras, neones y bento grids genéricos:** Prohibido el uso de degradados púrpura, glassmorphism decorativo, orbes radiales, acentos de neón, bento grids sin jerarquía o 3 tarjetas idénticas de características.
4. **Tipografía intencional y con criterio:** Prohibido elegir Inter, Geist o Space Grotesk simplemente por ser comunes en interfaces de IA. Seleccionar la tipografía por marca, audiencia, legibilidad y jerarquía (Display: `'Fraunces'`, Body: `'Sora'`, Alt: `'Plus Jakarta Sans'`, Mono: `'IBM Plex Mono'`).
5. **Cero íconos de relleno:** Prohibido usar Lucide, emojis o checkmarks genéricos como sustituto automático de comunicación visual real (usar SVG inline de propósito específico).
6. **Cero fabricación:** Prohibido inventar testimonios falsos, logos corporativos apócrifos, métricas ficticias o interfaces simuladas.
7. **Copywriting auténtico:** Prohibido inventar tiers de precio o usar copy genérico de marketing, em-dashes repetitivos o la fórmula repetitiva *"No es X, es Y"* como muletilla predeterminada.
8. **Movimiento y estilo funcional:** No incorporar animaciones decorativas, efectos hover excesivos, sombras pesadas o bordes redondeados sin justificación funcional o de dirección de arte.
9. **Cobertura completa de estados:** No omitir estados de carga, vacío, error, éxito, validación, foco (`:focus-visible`) o adaptabilidad responsive.
10. **Transparencia legal y cumplimiento:** Preservar marcos de confidencialidad, términos, NDA y gobernanza.
11. **Pruebas de realidad sobre interacciones vivas:** No optimizar únicamente para capturas estáticas; verificar interacciones reales, comportamiento responsive, accesibilidad WCAG y datos empíricos.

---

## 4. Auditoría y Verificación de Cumplimiento
- Ejecutar `python scripts/verify_policy_contract.py` antes de cualquier commit de diseño frontend.
- Ejecutar `python scripts/verify_surface_security.py` para asegurar que ningún enlace del frontend vulnere la política de frontera de superficie.
