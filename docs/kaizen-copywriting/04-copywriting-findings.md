# 04. Hallazgos Detallados de Copywriting y Experiencia de Usuario

> **Auditoría:** Diagnóstico de Deficiencias y Oportunidades de Optimización  
> **Alcance:** `index.html` (Español) y `en/index.html` (Inglés)  
> **Criterios de Priorización:** Impacto en Conversión (Alto/Medio/Bajo) y Complejidad Técnica (Baja/Media)  

---

## 1. Matriz Resumen de Hallazgos

| ID | Hallazgo | Severidad | Impacto en Conversión | Estado Previo | Estado Posterior |
|---|---|---|---|---|---|
| **H-01** | Carga cognitiva excesiva y saturación de términos en el subtítulo del Hero. | **Alta** | Pérdida de usuarios en los primeros 3 segundos móviles. | 32 palabras (260 car.) | **Resuelto:** 23 palabras (177 car.), foco en márgenes operativos. |
| **H-02** | Redacción extensa con efecto de "cuarta pared" y preámbulos en las narrativas de los 3 modelos de entrega. | **Alta** | Fatiga de lectura y rebote antes de conocer los mecanismos de gobernanza. | > 105 palabras por bloque narrativo (> 820 car.) | **Resuelto:** ~52 palabras por bloque (~390 car.), 51% de reducción. |
| **H-03** | Lead de capacitación corporativa B2B prolijo y redundante. | **Media** | Fricción en la comprensión de la oferta formativa in-company. | 56 palabras (405 car.) | **Resuelto:** 36 palabras (274 car.), conciso y directo a directores/PMs. |
| **H-04** | Violación de Accesibilidad WCAG 2.5.3 (*Label in Name Mismatch*) en botones de WhatsApp. | **Crítica** | Fallo en lectores de pantalla y herramientas de accesibilidad asistida. | Texto visible y `aria-label` divergían en sintaxis. | **Resuelto:** `aria-label` inicia exactamente con la cadena visible. |
| **H-05** | Desbordamiento horizontal residual de 11px en pantallas de 320px (`narrow-320`). | **Media** | Experiencia rota y scroll horizontal molesto en móviles compactos. | Contenedores rígidos a 24px de padding. | **Resuelto:** Padding fluido a 16px en `< 520px` y `overflow-x: hidden`. |
| **H-06** | Preservación de la Política Anti-Slop y Cero Rastreo. | **Gobernanza** | Riesgo de regresión hacia clichés sintéticos o scripts invasivos. | 0 fugas de privacidad, estética editorial cream. | **Garantizado:** Verificado determinísticamente por linters y tests. |

---

## 2. Detalle de los Hallazgos

### Hallazgo H-01: Saturación Conceptual en el Subtítulo del Hero
- **Evidencia en Línea Base:**
  > *"Ayudamos a agencias digitales y firmas de servicios profesionales a optimizar su productividad resolviendo cuellos de botella reales con software a medida, pipelines de datos robustos y agentes supervisados con gobernanza Human-in-the-Loop."* (32 palabras).
- **Diagnóstico:**
  La frase acumulaba cinco conceptos técnicos de alta densidad en una sola oración corrida: "optimizar productividad", "resolviendo cuellos de botella reales", "software a medida", "pipelines de datos robustos", "agentes supervisados", "gobernanza Human-in-the-Loop". En una pantalla móvil de 360px o 390px, este bloque generaba una muralla de texto que competía con el titular en lugar de clarificarlo.
- **Solución Kaizen:**
  Sintetizar la propuesta en una relación directa de causa y efecto:
  > *"Diseñamos software a medida, pipelines de datos e IA supervisada para agencias digitales que resuelven cuellos de botella y protegen sus márgenes operativos."* (23 palabras).
  Se preserva la propuesta técnica pero se enfoca en el desenlace de negocio que le interesa al decisor: **proteger sus márgenes operativos**.

---

### Hallazgo H-02: Prolijidad Narrativa en los Tres Modelos de Entrega
- **Evidencia en Línea Base:**
  - Showcase 01 (El Viaje del Héroe): 110 palabras, 822 caracteres.
  - Showcase 02 (Sondas Digitales): 112 palabras, 880 caracteres.
  - Showcase 03 (Integración Híbrida): 105 palabras, 813 caracteres.
- **Diagnóstico:**
  Los textos incluían preámbulos explicativos que rompían el ritmo ("Toda organización que emprende una modernización tecnológica persigue una estrella objetivo...", "Cuando el entorno cambia con rapidez, las mayores ventajas competitivas rara vez provienen de planes predecibles...", "Bajo la analogía de... nuestro equipo no actúa como..."). Esto obligaba al usuario móvil a desplazarse extensamente antes de ver los puntos clave del esquema operativo.
- **Solución Kaizen:**
  Reescribir cada bloque narrativo a un único párrafo de ~50 palabras con alta densidad de señal:
  - **Showcase 1 (51 palabras):** Acompañamiento desde la línea base hasta la autonomía, célula dedicada embebida y responsabilidad compartida hito a hito.
  - **Showcase 2 (54 palabras):** Validación ágil de hipótesis antes de comprometer capital, artefactos ligeros en sprints de 1 a 2 semanas y evidencia empírica.
  - **Showcase 3 (53 palabras):** Sincronización de estabilidad troncal con exploración periférica, gobernanza estricta y retainer estratégico.

---

### Hallazgo H-03: Exceso de Rodeos en el Lead de Capacitación B2B
- **Evidencia en Línea Base:**
  > *"Como extensión de nuestro hub de conocimiento y pensamiento sistémico, este programa no busca enseñar programación tradicional a tu equipo, sino dotar a managers, directores de área y líderes de producto de las herramientas conceptuales y prácticas para supervisar la adopción de agentes de IA con rigor, eliminando alucinaciones y evitando la acumulación de deuda técnica."* (56 palabras).
- **Diagnóstico:**
  Uso de la fórmula retórica "no busca X, sino Y", catalogada explícitamente como cliché de escritura en la política anti-slop (*"Do not use the formula 'It's not X, it's Y' as a default writing pattern"*).
- **Solución Kaizen:**
  Eliminación de la negación retórica y afirmación directa de la propuesta:
  > *"Como extensión de nuestro hub de pensamiento sistémico, este programa capacita a directores de área, managers y líderes de producto en la supervisión rigurosa de agentes de IA con gobernanza, eliminando alucinaciones y evitando deuda técnica."* (36 palabras).

---

### Hallazgo H-04: Violación de Criterio de Éxito WCAG 2.5.3 (Label in Name)
- **Evidencia Técnica:**
  - Texto visible del botón: `Contactar Equipo por WhatsApp`
  - Atributo previo: `aria-label="Contactar al equipo por WhatsApp (abre en nueva pestaña)"`
- **Diagnóstico de Accesibilidad:**
  El estándar WCAG 2.5.3 exige que para cualquier elemento interactivo con etiqueta visible, el nombre accesible programático (`aria-label` o `accName`) debe contener textualmente las palabras visibles en el mismo orden. Al incluir "al equipo" en minúsculas en lugar de "Equipo", las herramientas de navegación por voz no podían asociar el comando oral con el elemento de interfaz.
- **Solución Kaizen:**
  Alinear exactamente el `aria-label` con el texto visible:
  `aria-label="Contactar Equipo por WhatsApp (abre en nueva pestaña)"` en español y `aria-label="Contact Team via WhatsApp (opens in new tab)"` en inglés.

---

### Hallazgo H-05: Desbordamiento Horizontal en 320px
- **Evidencia Técnica:**
  En pantallas de 320px de ancho (`narrow-320`), el cálculo de `document.documentElement.scrollWidth` arrojaba **331px**, generando un desbordamiento de 11px a la derecha.
- **Causa Raíz:**
  El padding fijo de 24px (`var(--space-6)`) en `.container` más 24px en `.triad-card` y las barras de títulos de las tarjetas de código consumían 96px de los 320px totales, forzando a los elementos internos a exceder el viewport.
- **Solución Kaizen:**
  1. Adición de `overflow-x: hidden;` en el elemento raíz `html`.
  2. Implementación de una regla `@media (max-width: 520px)` que ajusta el padding de contenedor a 16px (`var(--space-4)`), escala la tipografía de las ventanas de código a `0.56rem` y garantiza fluidez geométrica sin desbordamiento.
