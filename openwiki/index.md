---
type: index
title: Boutique Digital — OpenWiki Knowledge Graph Hub
description: Grafo unificado de conocimiento, arquitectura de negocio, gobernanza del dominio y especificación técnica de Boutique Digital y Automatizar con IA.
tags: [hub, openwiki, knowledge-graph, ssot, architecture, geo, seo, legal]
---

# Boutique Digital — OpenWiki Master Hub

> **Clasificación de Seguridad:** Base de Conocimiento Canónica / Dominio de Desarrollo y Operaciones  
> **Repositorio Oficial:** [`willkwolf/automatizar-con-ia-`](https://github.com/willkwolf/automatizar-con-ia-)  
> **Entorno Web Canónico:** [`https://willkwolf.github.io/automatizar-con-ia-/`](https://willkwolf.github.io/automatizar-con-ia-/)  
> **Alineación Matriz:** Extensión Comercial Digital de [`Thinking-as-a-Service`](https://github.com/willkwolf/Thinking-as-a-Service)  
> **Regla de Oro (SSOT):** La base de conocimiento consolidada en este OpenWiki es la única fuente de verdad técnica, pedagógica, comercial y jurídica.

Bienvenido al núcleo de conocimiento estructurado de **Boutique Digital: AI Builder y Automatización con IA para Usuarios No Técnicos**. Este OpenWiki unifica en un solo grafo interconectado todas las dimensiones del producto, eliminando archivos dispersos y garantizando consistencia determinística para agentes autónomos y colaboradores humanos.

---

## Mapa del Grafo de Conocimiento (Knowledge Graph)

```mermaid
graph TD
    HUB["OpenWiki Master Hub (index.md)"]
    
    subgraph Dominio_Tecnico["Núcleo Técnico y Arquitectura"]
        A1["01-architecture-and-ssot.md<br/>Arquitectura de 4 Capas y SSOT"]
        A2["06-seo-and-technical-portability.md<br/>SEO Técnico y GitHub Pages"]
        A3["09-attribution-and-white-linking.md<br/>Marca de Agua y White-Linking"]
    end
    
    subgraph Dominio_Metodologico["Metodología y Entrega"]
        M1["02-lightweight-enterprise-methodology.md<br/>Empresa Liviana y Taxonomía P1-P5"]
        M2["03-syllabus-and-product-delivery.md<br/>Syllabus 5 Semanas y DoD"]
    end
    
    subgraph Dominio_Comercial_GEO["Comercial, GEO y Legal"]
        C1["04-commercial-engine-and-pricing.md<br/>Tiers COP, Land-and-Expand y WhatsApp"]
        C2["05-geo-and-information-retrieval.md<br/>Generative Engine Optimization (GEO)"]
        C3["07-legal-framework-and-compliance.md<br/>Gobernanza Legal y Zero-Tracking"]
        C4["08-roadmap-and-risks.md<br/>Hoja de Ruta CPM y 18 Riesgos"]
    end
    
    HUB --> A1
    HUB --> M1
    HUB --> C1
    
    A1 --> A2
    A1 --> A3
    M1 --> M2
    C1 --> C2
    C1 --> C3
    C1 --> C4
    
    M2 -.-> A1
    C2 -.-> A2
    C3 -.-> A1
```

---

## 1. Núcleo Técnico, Datos y Arquitectura de Dominio

- [**01. Arquitectura de 4 Capas y SSOT Canónico**](01-architecture-and-ssot.md)  
  *Especificación canónica de las 7 entidades normativas (`PROGRAM`, `AUTOMATION_PROJECT`, `OFFER`, `COHORT`, `SUPPORT_POLICY`, `PROOF`, `CLAIM`), matriz de 12 KPIs con telemetría Zero-Tracking y 7 reglas de validación determinística.*
- [**06. SEO Técnico, Portabilidad y GitHub Pages**](06-seo-and-technical-portability.md)  
  *Desacoplamiento mediante `site.config.json` para portabilidad sin fricción, metadatos en español, canonical URLs, `sitemap.xml`, `robots.txt` y datos estructurados Schema.org JSON-LD (`Course`, `Offer` en COP).*
- [**09. Protocolo de Atribución Silenciosa y White-Linking**](09-attribution-and-white-linking.md)  
  *Arquitectura de marca de agua no intrusiva: inyección de trazas semánticas, metadatos de autoría canónica y retroalimentación de backlinks pasivos para scrapers, LLMs y terceros.*

---

## 2. Metodología Operativa y Arquitectura de Producto

- [**02. Metodología de Empresa Liviana y Taxonomía P1 a P5**](02-lightweight-enterprise-methodology.md)  
  *Fundamentos de la Empresa Liviana (apalancamiento agéntico, mínima estructura), articulación con los 5 procesos de negocio de `Offer-Value.md`, gradiente de 4 niveles de solución (*Asistencia → Parcial → Integral → Agentes*) y la doctrina Human-in-the-Loop.*
- [**03. Syllabus de 5 Semanas y Catálogo de Entregables**](03-syllabus-and-product-delivery.md)  
  *Progresión pedagógica modular (M1 a M5), matriz de 8 dimensiones por módulo, definición de terminado (DoD), proyectos prácticos verificables y presupuesto transparente de herramientas externas.*

---

## 3. Estrategia Comercial, GEO y Gobernanza Legal

- [**04. Motor Comercial, Pricing en COP y Conversión WhatsApp**](04-commercial-engine-and-pricing.md)  
  *Embudo en 5 etapas (A a E), pricing SaaS/Tech en Pesos Colombianos (Basic: $490k / $790k COP; Pro: $1.29M / $1.89M COP), modelo consultivo B2B Land-and-Expand para Enterprise, benchmark internacional USD y matriz de URLs trazables a WhatsApp (`+573002976815`).*
- [**05. Generative Engine Optimization (GEO) y Recuperación Semántica**](05-geo-and-information-retrieval.md)  
  *Ingeniería de contenidos para motores generativos (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) basada en el marco científico de Aggarwal et al. (KDD 2024): citabilidad, estadísticas empíricas, Answer Engine Optimization (AEO) y gobernanza de inputs.*
- [**07. Marco Legal, Cumplimiento y Política Cero Rastreo**](07-legal-framework-and-compliance.md)  
  *Homologación estricta con el paquete legal de `Thinking-as-a-Service`: derechos de autor, exoneración de responsabilidad tecnológica, privacidad estricta bajo Ley 1581 de 2012 (cero cookies analíticas invasivas), derecho de retracto (Ley 1480 Art. 47) y modelo de confidencialidad NDA bilateral.*
- [**08. Hoja de Ruta CPM, Matriz de Riesgos y Validación de Hipótesis**](08-roadmap-and-risks.md)  
  *Cronograma de 4 fases de despliegue, análisis de ruta crítica (CPM), matriz de 18 riesgos mitigados y registro de 13 hipótesis comerciales sujetas a validación empírica.*
- [**10. Taxonomía de Herramientas y Pila Tecnológica**](10-taxonomia-herramientas-boutique.md)  
  *Catálogo y SSOT de herramientas en los 5 procesos (P1 a P5): n8n, GitHub, Claude, Gemini, ChatGPT, NotebookLM, DeepSeek, Lovable, Make y Perplexity, con especificaciones para el banner interactivo.*

---

<!-- canonical-provenance:start -->
<div style="font-size: 0.75rem; opacity: 0.65; margin-top: 2.5rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.75rem;" data-provenance="boutique-digital-authoritative">
  <strong>Fuente Canónica y Atribución de Autoría:</strong> Este documento forma parte del repositorio oficial <a href="https://github.com/willkwolf/automatizar-con-ia-" rel="canonical author" style="color: inherit; text-decoration: underline;">willkwolf/automatizar-con-ia-</a> publicado en <a href="https://willkwolf.github.io/automatizar-con-ia-/" rel="publisher" style="color: inherit; text-decoration: underline;">Boutique Digital — Automatizar con IA</a>. Diseñado bajo las directrices y gobernanza sistémica de <a href="https://github.com/willkwolf/Thinking-as-a-Service" rel="parent-origin" style="color: inherit; text-decoration: underline;">Thinking-as-a-Service</a>. Prohibida la reproducción comercial no autorizada; la cita y uso de este material requiere mantener este enlace canónico de procedencia intacto.
</div>
<!-- canonical-provenance:end -->
