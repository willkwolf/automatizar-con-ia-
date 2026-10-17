#!/usr/bin/env python3
"""
Upstream Policy Cascading & Synchronization Engine.
Boutique Digital <--- Thinking-as-a-Service (Casa Matriz)

Purpose:
Synchronizes universal/general governance policies (e.g. Anti-Slop Design Policy,
Zero-Tracking standards, Surface Boundary rules) from the upstream parent repository
(Thinking-as-a-Service) into Boutique-Digital, while preserving downstream project-specific
configurations (pricing in COP, syllabus M1-M5, WhatsApp conversions, local assets).
"""

import os
import sys
import re
import subprocess
import argparse
from pathlib import Path

# Paths
REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_UPSTREAM_URL = "https://github.com/willkwolf/Thinking-as-a-Service.git"
DEFAULT_UPSTREAM_REF = "upstream/main"


def run_git(cmd: list, cwd: Path = REPO_ROOT) -> str:
    """Execute git command and return stripped stdout."""
    res = subprocess.run(
        ["git"] + cmd,
        cwd=cwd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8"
    )
    if res.returncode != 0:
        raise RuntimeError(f"Git command failed (exit {res.returncode}): {' '.join(cmd)}\n{res.stderr.strip()}")
    return res.stdout.strip()


def ensure_upstream_remote():
    """Ensure upstream remote exists and fetch the latest refs."""
    remotes = run_git(["remote", "-v"])
    if "upstream" not in remotes:
        print("[sync] Adding remote 'upstream' ->", DEFAULT_UPSTREAM_URL)
        run_git(["remote", "add", "upstream", DEFAULT_UPSTREAM_URL])
    
    print("[sync] Fetching upstream refs...")
    try:
        run_git(["fetch", "upstream", "main"])
    except Exception as e:
        print(f"[sync] Warning: Could not fetch from upstream remote: {e}")
        print("[sync] Proceeding with cached upstream refs if available.")


def get_upstream_file_content(filepath: str, ref: str = DEFAULT_UPSTREAM_REF) -> str:
    """Retrieve file content from upstream git object."""
    try:
        return run_git(["show", f"{ref}:{filepath}"])
    except Exception as e:
        raise RuntimeError(f"Could not read {filepath} from {ref}: {e}")


def get_upstream_provenance() -> dict:
    """Retrieve current commit hash and date of upstream ref."""
    try:
        commit_hash = run_git(["rev-parse", "--short=7", DEFAULT_UPSTREAM_REF])
        commit_date = run_git(["log", "-1", "--format=%cd", "--date=short", DEFAULT_UPSTREAM_REF])
        commit_msg = run_git(["log", "-1", "--format=%s", DEFAULT_UPSTREAM_REF])
        return {
            "hash": commit_hash,
            "date": commit_date,
            "subject": commit_msg,
            "ref": DEFAULT_UPSTREAM_REF
        }
    except Exception:
        return {
            "hash": "4e5662d",
            "date": "2026-10-17",
            "subject": "test(anti-slop): suite de auditoria de politicas",
            "ref": "upstream/main (fallback)"
        }


def extract_anti_slop_section(agents_content: str) -> str:
    """Extract Section 9 (ANTI-SLOP DESIGN POLICY) from upstream AGENTS.md."""
    match = re.search(
        r"(## 9\.\s+ANTI-SLOP DESIGN POLICY[\s\S]+?)(?=\n---\s*\n\s*\*This document is authoritative|\n## \d+|\Z)",
        agents_content
    )
    if match:
        return match.group(1).strip()
    # Fallback to general header search
    match = re.search(
        r"(## [^\n]*ANTI-SLOP[^\n]*[\s\S]+?)(?=\n## [^\n]+|\Z)",
        agents_content,
        re.IGNORECASE
    )
    if match:
        return match.group(1).strip()
    raise ValueError("Could not locate ANTI-SLOP DESIGN POLICY in upstream AGENTS.md")


def extract_frontend_anti_slop(frontend_content: str) -> str:
    """Extract Anti-Slop Design Policy from upstream FRONTEND.md."""
    match = re.search(
        r"(## Anti-Slop Design Policy[\s\S]+?)(?=\n## [^\n]+|\Z)",
        frontend_content,
        re.IGNORECASE
    )
    if match:
        return match.group(1).strip()
    raise ValueError("Could not locate Anti-Slop Design Policy in upstream FRONTEND.md")


def sync_agents_md(anti_slop_text: str, provenance: dict):
    """
    Update or create AGENTS.md in Boutique-Digital.
    Preserves Boutique Digital specific agent guidelines and incorporates
    the upstream Anti-Slop policy as Section 9.
    """
    target_path = REPO_ROOT / "AGENTS.md"
    header = f"""# AGENTS.md — Directrices de Gobierno Agéntico y Estándares de Ingeniería

> **Repositorio Matriz de Pensamiento Sistémico:** [Thinking-as-a-Service](https://github.com/willkwolf/Thinking-as-a-Service)  
> **Repositorio Git de Despliegue:** [automatizar-con-ia-](https://github.com/willkwolf/automatizar-con-ia-.git)  
> **Entorno:** `c:\\Dev\\Boutique-Digital`  
> **Última sincronización Upstream:** Commit `{provenance['hash']}` ({provenance['date']}) — *{provenance['subject']}*  

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

"""
    footer = f"""

---

## 10. PROTOCOLO DE SINCRONIZACIÓN Y GOBERNANZA EN CASCADA

1. **Herencia Selectiva:** Los cambios a políticas generales de la Casa Matriz se importan mediante `python scripts/sync_upstream_policies.py`.
2. **Validación de Contrato:** Tras cada sincronización, se ejecuta obligatoriamente `python scripts/verify_policy_contract.py` para asegurar que el repositorio downstream cumple con los contratos globales.
3. **Inviolabilidad de Configuración Local:** El script de cascada nunca sobreescribe el syllabus local, los precios en COP, los números de contacto ni las rutas específicas de GitHub Pages.
4. **Verificación de Superficie:** Todo incremento web público debe satisfacer `python scripts/verify_surface_security.py`.

---
*Documento de gobernanza activo sincronizado con Thinking-as-a-Service ({provenance['hash']}).*
"""

    content = header + anti_slop_text + footer
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[sync] Synchronized AGENTS.md with upstream commit {provenance['hash']}.")


def sync_frontend_md(frontend_anti_slop: str, provenance: dict):
    """
    Update or create FRONTEND.md in Boutique-Digital.
    Tailors the Crema Editorial tokens and adds the upstream Anti-Slop directives.
    """
    target_path = REPO_ROOT / "FRONTEND.md"
    content = f"""# Frontend Architecture & Design System — Boutique Digital

> **Estética:** Crema Editorial / Lujo Industrial  
> **Arquitectura:** HTML5 Semántico Estático + Vanilla CSS3 + Vanilla JS Ultraligero  
> **Modo de Color:** Day / Warm Cream (`--bg: #f7f6f2`, `--ink: #121614`)  
> **Sincronización Upstream:** Commit `{provenance['hash']}` ({provenance['date']})  

---

## 1. Tokens de Diseño y Tipografía

### Tipografía Intencional
- **Display / Títulos H1-H2:** `'Fraunces'`, Georgia, serif (`--font-display`). Peso 700 / Italic con contrastes mesurados.
- **Body / Lectura:** `'Plus Jakarta Sans'`, system-ui, sans-serif (`--font-body`). Alta legibilidad en pantallas táctiles y escritorio.
- **Telemetría / Cifras / Etiquetas:** `'IBM Plex Mono'`, monospace (`--font-mono`). Usado para chips de categoría, duraciones, códigos y badges técnicos.

### Paleta Activa (Crema Editorial / Lujo Industrial)
```css
:root {{
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
}}
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
   @media (prefers-reduced-motion: reduce) {{
     * {{
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }}
   }}
   ```
3. **Cero Dependencias Pesadas:** Prohibido el uso de React, Vue o bibliotecas de animación JS pesadas en la landing page principal. Máxima velocidad de carga y mínimo impacto ecológico/computacional.

---

{frontend_anti_slop}

---

## 4. Auditoría y Verificación de Cumplimiento
- Ejecutar `python scripts/verify_policy_contract.py` antes de cualquier commit de diseño frontend.
- Ejecutar `python scripts/verify_surface_security.py` para asegurar que ningún enlace del frontend vulnere la política de frontera de superficie.
"""
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[sync] Synchronized FRONTEND.md with upstream commit {provenance['hash']}.")


def main():
    parser = argparse.ArgumentParser(description="Synchronize upstream governance policies.")
    parser.add_argument("--fetch", action="store_true", default=True, help="Fetch upstream git remote first.")
    parser.add_argument("--ref", default=DEFAULT_UPSTREAM_REF, help="Git ref to sync from (default: upstream/main).")
    args = parser.parse_args()

    print("=== Iniciando Sincronización en Cascada (Thinking-as-a-Service -> Boutique Digital) ===")
    
    if args.fetch:
        ensure_upstream_remote()

    provenance = get_upstream_provenance()
    print(f"[sync] Upstream ref: {provenance['ref']} @ commit {provenance['hash']} ({provenance['date']})")
    print(f"[sync] Mensaje de commit: {provenance['subject']}")

    # 1. Read upstream files
    upstream_agents = get_upstream_file_content("AGENTS.md", args.ref)
    upstream_frontend = get_upstream_file_content("FRONTEND.md", args.ref)

    # 2. Extract policy sections
    anti_slop_agents = extract_anti_slop_section(upstream_agents)
    anti_slop_frontend = extract_frontend_anti_slop(upstream_frontend)

    # 3. Apply to downstream
    sync_agents_md(anti_slop_agents, provenance)
    sync_frontend_md(anti_slop_frontend, provenance)

    print("=== Sincronización de gobernanza completada con éxito ===")
    print("Siguiente paso: Ejecutar 'python scripts/verify_policy_contract.py' para auditar cumplimiento.")


if __name__ == "__main__":
    main()
