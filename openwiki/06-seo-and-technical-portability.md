---
type: technical
title: SEO Técnico, Portabilidad y Arquitectura para GitHub Pages
description: Configuración técnica de metadatos, sitemap, robots, datos estructurados Schema.org JSON-LD y desacoplamiento para despliegue estático.
tags: [seo, technical-seo, github-pages, schema-org, json-ld, sitemap, robots, portability]
---

# 06. SEO Técnico, Portabilidad y Arquitectura para GitHub Pages

> **Módulo:** Infraestructura y Portabilidad  
> **Estado:** Certificado Canónico  
> **Referencia de Implementación:** `06-especificacion-seo-portabilidad.md`

Este documento codifica la arquitectura técnica de publicación web para **Boutique Digital**, garantizando que el sitio se publique de forma nativa e inmediata en **GitHub Pages** ([`willkwolf/automatizar-con-ia-`](https://github.com/willkwolf/automatizar-con-ia-)), manteniendo al mismo tiempo un desacoplamiento absoluto de la infraestructura para permitir migraciones futuras hacia dominios propios o servidores privados.

---

## 1. El Patrón de Desacoplamiento: `site.config.json`

Para evitar que las URLs canónicas, el subdirectorio de GitHub Pages (`/automatizar-con-ia-/`) o las rutas de activos queden cableadas de forma estática en múltiples archivos, se utiliza un único archivo de configuración canónico:

```json
{
  "site_name": "Boutique Digital — Automatizar con IA",
  "base_path": "/automatizar-con-ia-/",
  "production_domain": "https://willkwolf.github.io",
  "canonical_origin": "https://willkwolf.github.io/automatizar-con-ia-/",
  "repository": "https://github.com/willkwolf/automatizar-con-ia-",
  "parent_brand": "https://willkwolf.github.io/Thinking-as-a-Service/",
  "contact": {
    "whatsapp_e164": "+573002976815",
    "whatsapp_display": "+57 300 297 6815"
  },
  "default_currency": "COP",
  "benchmark_currency": "USD",
  "trm_rate": 3950
}
```

> **Beneficio de Portabilidad:** Cuando el proyecto adquiera un dominio propio (ej. `automatizarconia.co`), únicamente se modifica `production_domain` y `base_path` a `/` en este archivo. Ninguna plantilla ni documento requiere reescritura.

---

## 2. Metadatos SEO en Español y OpenGraph

Cada página incluye de forma determinística en su cabecera HTML:

```html
<!-- Metadatos Primarios -->
<title>Aprende a Automatizar con IA: De Asistentes a Flujos de Trabajo | Boutique Digital</title>
<meta name="description" content="Programa práctico de 5 semanas para profesionales y negocios sin experiencia técnica. Aprende a construir automatizaciones y miniaplicaciones con IA.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="https://willkwolf.github.io/automatizar-con-ia-/">

<!-- OpenGraph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="Boutique Digital">
<meta property="og:title" content="Aprende a Automatizar con IA: De Asistentes a Flujos Útiles">
<meta property="og:description" content="Pasa de usar ChatGPT básico a construir soluciones reales para tu negocio en 5 semanas sin programar.">
<meta property="og:url" content="https://willkwolf.github.io/automatizar-con-ia-/">
<meta property="og:image" content="https://willkwolf.github.io/automatizar-con-ia-/assets/og-image.jpg">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Aprende a Automatizar con IA | Boutique Digital">
<meta name="twitter:description" content="Formación práctica guiada: construye 5 proyectos funcionales con IA y automatización.">
```

---

## 3. Datos Estructurados Schema.org (JSON-LD)

Se inyecta un grafo de entidades Schema.org semánticamente validado para que Google y los buscadores generativos reconozcan el programa como una oferta educativa oficial con precios transparentes en moneda local:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOccupationalProgram",
      "@id": "https://willkwolf.github.io/automatizar-con-ia-/#program",
      "name": "AI Builder y Automatización con IA para Usuarios No Técnicos",
      "description": "Programa de 5 semanas para aprender a construir automatizaciones, miniaplicaciones y asistentes con IA.",
      "provider": {
        "@type": "Organization",
        "name": "Boutique Digital",
        "url": "https://willkwolf.github.io/automatizar-con-ia-/",
        "sameAs": [
          "https://github.com/willkwolf/automatizar-con-ia-",
          "https://willkwolf.github.io/Thinking-as-a-Service/"
        ]
      },
      "timeToComplete": "P5W",
      "educationalCredentialAwarded": "Certificado de Finalización de Portafolio Funcional",
      "hasCourse": {
        "@type": "Course",
        "name": "Automatización con IA para Principiantes",
        "courseCode": "AUTO-IA-2026",
        "inLanguage": "es"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Tier Basic — Preventa",
          "price": "490000",
          "priceCurrency": "COP",
          "availability": "https://schema.org/PreOrder",
          "url": "https://willkwolf.github.io/automatizar-con-ia-/#pricing"
        },
        {
          "@type": "Offer",
          "name": "Tier Pro — Preventa",
          "price": "1290000",
          "priceCurrency": "COP",
          "availability": "https://schema.org/PreOrder",
          "url": "https://willkwolf.github.io/automatizar-con-ia-/#pricing"
        }
      ]
    }
  ]
}
</script>
```

---

## 4. Configuración de `sitemap.xml` y `robots.txt`

### `robots.txt` Canónico:
```text
User-agent: *
Allow: /

# Autorización explícita para motores de búsqueda generativa (GEO)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://willkwolf.github.io/automatizar-con-ia-/sitemap.xml
```

---

<!-- canonical-provenance:start -->
<div style="font-size: 0.75rem; opacity: 0.65; margin-top: 2.5rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.75rem;" data-provenance="boutique-digital-authoritative">
  <strong>Fuente Canónica y Atribución de Autoría:</strong> Este documento forma parte del repositorio oficial <a href="https://github.com/willkwolf/automatizar-con-ia-" rel="canonical author" style="color: inherit; text-decoration: underline;">willkwolf/automatizar-con-ia-</a> publicado en <a href="https://willkwolf.github.io/automatizar-con-ia-/" rel="publisher" style="color: inherit; text-decoration: underline;">Boutique Digital — Automatizar con IA</a>. Diseñado bajo las directrices y gobernanza sistémica de <a href="https://willkwolf.github.io/Thinking-as-a-Service/" rel="parent-origin" style="color: inherit; text-decoration: underline;">Thinking-as-a-Service</a>. Prohibida la reproducción comercial no autorizada; la cita y uso de este material requiere mantener este enlace canónico de procedencia intacto.
</div>
<!-- canonical-provenance:end -->
