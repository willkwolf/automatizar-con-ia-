#!/usr/bin/env python3
"""
Surface Security & Information Leakage Verifier - Boutique Digital
Valida determinísticamente que ninguna interfaz pública (.html) exponga:
1. Enlaces relativos a archivos Markdown crudos (.md).
2. Enlaces directos a bases de conocimiento de ingeniería interna (openwiki/, .agents/, scripts/).
3. Enlaces legales sin renderizado seguro en GitHub (blob/main/...).
4. Enlaces a WhatsApp que no cumplan el estándar RFC 3986.
"""

import sys
import os
import re
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent

# Patrones prohibidos en href de HTML público
FORBIDDEN_HREF_PATTERNS = [
    (re.compile(r'href=["\'](?!https?://)[^"\']*\.md["\']', re.IGNORECASE), "Enlace relativo a archivo Markdown crudo (.md) prohibido en producción"),
    (re.compile(r'href=["\'][^"\']*openwiki/[^"\']*["\']', re.IGNORECASE), "Exposición de ruta interna openwiki/ en HTML público"),
    (re.compile(r'href=["\'][^"\']*\.agents/[^"\']*["\']', re.IGNORECASE), "Exposición de ruta interna .agents/ en HTML público"),
    (re.compile(r'href=["\'][^"\']*scripts/[^"\']*["\']', re.IGNORECASE), "Exposición de scripts internos en HTML público"),
]

def verify_html_file(file_path: Path):
    errors = []
    content = file_path.read_text(encoding="utf-8")
    
    # 1. Verificar patrones prohibidos
    for pattern, description in FORBIDDEN_HREF_PATTERNS:
        matches = pattern.findall(content)
        if matches:
            for match in matches:
                errors.append(f"[{file_path.name}] {description}: {match}")
                
    # 2. Verificar que los enlaces externos a GitHub para documentos legales tengan target='_blank' y rel='noopener'
    legal_matches = re.finditer(r'<a\s+[^>]*href=["\'](https://github.com/[^"\']+/legal/[^"\']+)["\'][^>]*>', content)
    for m in legal_matches:
        tag = m.group(0)
        if 'target="_blank"' not in tag or 'rel="noopener"' not in tag:
            errors.append(f"[{file_path.name}] Enlace legal a GitHub carece de target='_blank' o rel='noopener': {tag}")
            
    # 3. Verificar que los enlaces a WhatsApp contengan parámetros RFC 3986 válidos
    wa_matches = re.finditer(r'href=["\'](https://wa\.me/[^"\']+)["\']', content)
    for m in wa_matches:
        url = m.group(1)
        if 'text=' in url and ' ' in url:
            errors.append(f"[{file_path.name}] Enlace WhatsApp contiene espacios sin codificar RFC 3986: {url}")
            
    return errors

def main():
    print(f"[SECURITY LINTER] Analizando superficie pública en {WORKSPACE_ROOT}...")
    html_files = list(WORKSPACE_ROOT.glob("*.html"))
    
    if not html_files:
        print("No se encontraron archivos HTML para auditar.")
        sys.exit(0)
        
    total_errors = []
    for html_file in html_files:
        errs = verify_html_file(html_file)
        if errs:
            total_errors.extend(errs)
        else:
            print(f"[OK] {html_file.name}: Superficie publica limpia y segura (0 fugas detectadas).")
            
    if total_errors:
        print("\n[FAIL] ERRORES DE GOBERNANZA Y SEGURIDAD DETECTADOS:")
        for err in total_errors:
            print(f"  - {err}")
        sys.exit(1)
        
    print("\n[PASS] TODAS LAS REGLAS DE SUPERFICIE PUBLICA Y ANTI-FUGA PASARON SATISFACTORIAMENTE.")
    sys.exit(0)

if __name__ == "__main__":
    main()
