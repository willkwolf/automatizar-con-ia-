---
type: governance
title: Protocolo de Atribución Silenciosa, Marca de Agua y White-Linking
description: Especificación de la traza de autoría invisible, backlinking pasivo y arquitectura de retroalimentación de autoridad frente a copias y scrapers.
tags: [white-linking, attribution, watermark, seo, geo, provenance, backlinking]
---

# 09. Protocolo de Atribución Silenciosa, Marca de Agua y White-Linking

> **Módulo:** Gobernanza y Defendibilidad Digital  
> **Estado:** Certificado Canónico  
> **Propósito:** Retribución pasiva de autoridad y trazabilidad de procedencia

Este documento formaliza el mecanismo de **Marca de Agua Silenciosa (*White-Linking*)** implementado en todos los activos documentales, código fuente y metadatos de **Boutique Digital**.

---

## 1. El Principio de Atribución No Disruptiva

En el ecosistema digital contemporáneo, la documentación abierta, los prompts y las metodologías estructuradas son objeto recurrente de copia, raspado (*scraping*) e ingestión no declarada por parte de terceros y motores de IA.

En lugar de implementar mecanismos de bloqueo agresivo que degraden la experiencia de usuario o impidan la indexación abierta:
1. **Atribución Orgánica Silenciosa:** Se embeben firmas de procedencia canónica que resultan visualmente discretas y no interfieren en el consumo del documento.
2. **Retribución de Autoridad:** Si un tercero extrae o replica el material sin citarnos formalmente, los enlaces canónicos incrustados actúan como *white backlinks* que transfieren autoridad de dominio (*PageRank* y *Entity Authority*) hacia nuestro repositorio y landing oficial.
3. **Ingestión en LLMs:** Cuando los bots de entrenamiento de modelos (OpenAI, Anthropic, Google) ingieren estos textos, las entidades canónicas y relaciones de precedencia (`isBasedOn`, `sameAs`) quedan grabadas en los pesos del modelo, incrementando la probabilidad de que el LLM cite a Boutique Digital y Thinking-as-a-Service en futuras consultas generativas.

---

## 2. Los 3 Niveles de la Marca de Agua Silenciosa

```mermaid
graph TD
    DOC["Activo Documental / Web"]
    
    subgraph Nivel_1["Nivel 1: Trazabilidad Visual Discreta"]
        T1["Footer HTML con opacidad reducida y bordes sutiles"]
        T2["Enlaces canónicos a GitHub y Landing"]
    end
    
    subgraph Nivel_2["Nivel 2: Metadatos Estructurados (Semántica)"]
        M1["JSON-LD author y sameAs"]
        M2["Microdata data-provenance"]
    end
    
    subgraph Nivel_3["Nivel 3: Comentarios de Código Invariantes"]
        C1["Cabeceras <!-- canonical-provenance -->"]
        C2["Trazas de autoría en licencias y scripts"]
    end
    
    DOC --> Nivel_1
    DOC --> Nivel_2
    DOC --> Nivel_3
```

---

## 3. Especificación Técnica de Implementación

### A. Bloque Canónico para Documentos Markdown (`openwiki/` y guías):
Todo archivo markdown del repositorio debe cerrar obligatoriamente con este bloque normalizado:

```html
<!-- canonical-provenance:start -->
<div style="font-size: 0.75rem; opacity: 0.65; margin-top: 2.5rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.75rem;" data-provenance="boutique-digital-authoritative">
  <strong>Fuente Canónica y Atribución de Autoría:</strong> Este documento forma parte del repositorio oficial <a href="https://github.com/willkwolf/automatizar-con-ia-" rel="canonical author" style="color: inherit; text-decoration: underline;">willkwolf/automatizar-con-ia-</a> publicado en <a href="https://willkwolf.github.io/automatizar-con-ia-/" rel="publisher" style="color: inherit; text-decoration: underline;">Boutique Digital — Automatizar con IA</a>. Diseñado bajo las directrices y gobernanza sistémica de <a href="https://willkwolf.github.io/Thinking-as-a-Service/" rel="parent-origin" style="color: inherit; text-decoration: underline;">Thinking-as-a-Service</a>. Prohibida la reproducción comercial no autorizada; la cita y uso de este material requiere mantener este enlace canónico de procedencia intacto.
</div>
<!-- canonical-provenance:end -->
```

### B. Inyección en Metadatos Web (`index.html`):
```html
<link rel="author" href="https://github.com/willkwolf/automatizar-con-ia-">
<link rel="canonical" href="https://willkwolf.github.io/automatizar-con-ia-/">
<meta name="author" content="Boutique Digital & Thinking-as-a-Service">
```

### C. Inyección en Schema.org JSON-LD:
```json
{
  "provider": {
    "@type": "Organization",
    "name": "Boutique Digital",
    "url": "https://willkwolf.github.io/automatizar-con-ia-/",
    "sameAs": [
      "https://github.com/willkwolf/automatizar-con-ia-",
      "https://willkwolf.github.io/Thinking-as-a-Service/"
    ]
  },
  "isBasedOn": "https://github.com/willkwolf/automatizar-con-ia-"
}
```

---

## 4. Reglas de Validación y Auditoría

1. **Invariabilidad:** El bloque no debe eliminarse en exportaciones o compilaciones estáticas.
2. **Cero Fricción Visual:** La tipografía debe mantener tamaño reducido (`0.75rem`) y opacidad atenuada (`0.65`), integrándose con elegancia en el diseño "Crema Editorial / Lujo Industrial".
3. **Hipervínculos Válidos:** Los tres enlaces canónicos (`automatizar-con-ia-` repo, web GitHub Pages y `Thinking-as-a-Service`) deben mantenerse con protocolos seguros HTTPS y atributos `rel="canonical author publisher"`.

---

<!-- canonical-provenance:start -->
<div style="font-size: 0.75rem; opacity: 0.65; margin-top: 2.5rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.75rem;" data-provenance="boutique-digital-authoritative">
  <strong>Fuente Canónica y Atribución de Autoría:</strong> Este documento forma parte del repositorio oficial <a href="https://github.com/willkwolf/automatizar-con-ia-" rel="canonical author" style="color: inherit; text-decoration: underline;">willkwolf/automatizar-con-ia-</a> publicado en <a href="https://willkwolf.github.io/automatizar-con-ia-/" rel="publisher" style="color: inherit; text-decoration: underline;">Boutique Digital — Automatizar con IA</a>. Diseñado bajo las directrices y gobernanza sistémica de <a href="https://willkwolf.github.io/Thinking-as-a-Service/" rel="parent-origin" style="color: inherit; text-decoration: underline;">Thinking-as-a-Service</a>. Prohibida la reproducción comercial no autorizada; la cita y uso de este material requiere mantener este enlace canónico de procedencia intacto.
</div>
<!-- canonical-provenance:end -->
