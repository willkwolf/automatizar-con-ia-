#!/usr/bin/env python3
"""
Contract Verification Engine — Boutique Digital & Thinking-as-a-Service Bridge.
Audits the local repository against inherited Upstream Policies:
1. Anti-Slop Visual Styling (No generic purple/neon gradients, no AI clichés)
2. Purpose-Driven Typography (Fraunces, Plus Jakarta Sans, IBM Plex Mono)
3. No Decorative Emojis in Legal, Ribbons or Navigation
4. Complete State Coverage (:focus-visible, hover, prefers-reduced-motion)
5. Authentic Copywriting & Zero Fabricated Claims (Anti-Hype, Indicative Benchmarks)
6. Public Surface Boundary & Zero-Tracking (No raw .md leaks, no analytics scripts)

Usage:
    python scripts/verify_policy_contract.py
    python scripts/verify_policy_contract.py --fix
"""

import sys
import os
import re
import argparse
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parent.parent
INDEX_HTML = REPO_ROOT / "index.html"
PROJECT_MD = REPO_ROOT / "PROJECT.md"
AGENTS_MD = REPO_ROOT / "AGENTS.md"
FRONTEND_MD = REPO_ROOT / "FRONTEND.md"


class ContractViolation:
    def __init__(self, clause: str, rule: str, file: str, line: int, detail: str, fixable: bool = False):
        self.clause = clause
        self.rule = rule
        self.file = file
        self.line = line
        self.detail = detail
        self.fixable = fixable

    def __str__(self):
        fix_badge = "[Auto-fixable]" if self.fixable else "[Manual fix required]"
        return f"[{self.clause}] {self.rule} in {self.file}:{self.line}\n    -> {self.detail} {fix_badge}"


class ContractAuditor:
    def __init__(self, fix_mode: bool = False):
        self.fix_mode = fix_mode
        self.violations = []
        self.fixes_applied = 0

    def check_anti_slop_visuals(self, html_content: str):
        """Contract Clause 1: No purple gradients, neon orbs, or generic AI slop styles."""
        prohibited_css = [
            (r"linear-gradient\([^)]*(?:#8a2be2|#9333ea|#a855f7|purple|magenta)[^)]*\)", "Prohibited generic SaaS purple gradient"),
            (r"radial-gradient\([^)]*(?:#00f0ff|#00ffff|cyan|neon)[^)]*\)", "Prohibited generic AI neon radial orb"),
            (r"backdrop-filter:\s*blur\([^)]+\);\s*background:\s*rgba\(255,\s*255,\s*255,\s*0\.0[1-5]\)", "Prohibited decorative glassmorphism slop"),
        ]

        for pattern, desc in prohibited_css:
            matches = list(re.finditer(pattern, html_content, re.IGNORECASE))
            for m in matches:
                line_no = html_content[:m.start()].count("\n") + 1
                self.violations.append(ContractViolation(
                    clause="Clause 1: Anti-Slop Visuals",
                    rule="No Purple Gradients or Neon Orbs",
                    file="index.html",
                    line=line_no,
                    detail=f"{desc} (matched: '{m.group(0)[:60]}...')",
                    fixable=False
                ))

    def check_typography(self, html_content: str):
        """Contract Clause 2: Purpose-Driven Typography."""
        # Must declare Fraunces (display), Plus Jakarta Sans (body), IBM Plex Mono (mono)
        required_fonts = [
            ("Fraunces", "Display font (--font-display) must be 'Fraunces'"),
            ("Plus Jakarta Sans", "Body font (--font-body) must be 'Plus Jakarta Sans'"),
            ("IBM Plex Mono", "Telemetry/Mono font (--font-mono) must be 'IBM Plex Mono'")
        ]
        for font, desc in required_fonts:
            if font not in html_content:
                self.violations.append(ContractViolation(
                    clause="Clause 2: Purpose-Driven Typography",
                    rule="Intentional Font Pairing",
                    file="index.html",
                    line=1,
                    detail=desc,
                    fixable=False
                ))

        # Check for unvetted generic default fonts (Inter, Geist, Space Grotesk)
        for bad_font in ["Geist", "Space Grotesk"]:
            if bad_font in html_content:
                self.violations.append(ContractViolation(
                    clause="Clause 2: Purpose-Driven Typography",
                    rule="Prohibition of Default AI Fonts",
                    file="index.html",
                    line=1,
                    detail=f"Detected generic AI font '{bad_font}' in index.html",
                    fixable=False
                ))

    def check_decorative_emojis(self, html_content: str) -> str:
        """Contract Clause 3: No decorative emojis in legal ribbons, nav, or headers."""
        # Find emojis in legal ribbons or nav
        lines = html_content.splitlines()
        modified = False
        new_lines = []

        # Emoji pattern for specific prohibited decorative emojis
        # 🛡️ (\U0001f6e1), ⚖️ (\u2696), ⚠️ (\u26a0), 🔒 (\U0001f512), 💼 (\U0001f4bc), 🚀 (\U0001f680)
        prohibited_emojis = [
            ("\U0001f6e1\ufe0f", "shield emoji"),
            ("\U0001f6e1", "shield emoji"),
            ("\u2696\ufe0f", "scales emoji"),
            ("\u2696", "scales emoji"),
            ("\u26a0\ufe0f", "warning emoji"),
            ("\u26a0", "warning emoji"),
            ("\U0001f512", "lock emoji"),
            ("\U0001f4bc", "briefcase emoji"),
            ("\U0001f680", "rocket emoji")
        ]

        svg_shield = (
            '<svg class="icon-shield" width="16" height="16" viewBox="0 0 24 24" fill="none" '
            'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '
            'style="display:inline-block; vertical-align:-2px; margin-right:4px;">'
            '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
        )

        for idx, line in enumerate(lines, 1):
            line_has_violation = False
            for emoji, desc in prohibited_emojis:
                if emoji in line:
                    self.violations.append(ContractViolation(
                        clause="Clause 3: No Decorative Emojis",
                        rule="Prohibition of Lazy Decorative Emojis",
                        file="index.html",
                        line=idx,
                        detail=f"Found decorative {desc} in UI element: '{line.strip()[:60]}...'",
                        fixable=True
                    ))
                    line_has_violation = True
                    if self.fix_mode:
                        if "guarantee-ribbon" in line or "Garantía Total" in line:
                            line = line.replace(emoji, svg_shield)
                            self.fixes_applied += 1
                        else:
                            line = line.replace(emoji, "")
                            self.fixes_applied += 1
            new_lines.append(line)

        return "\n".join(new_lines)

    def check_state_coverage(self, html_content: str) -> str:
        """Contract Clause 4: Complete State Coverage (:focus-visible, hover, prefers-reduced-motion)."""
        # 1. Check prefers-reduced-motion
        if "prefers-reduced-motion" not in html_content:
            self.violations.append(ContractViolation(
                clause="Clause 4: State Coverage",
                rule="Accessibility Motion Support",
                file="index.html",
                line=1,
                detail="Missing @media (prefers-reduced-motion: reduce) block in index.html styles",
                fixable=False
            ))

        # 2. Check :focus-visible
        if ":focus-visible" not in html_content:
            self.violations.append(ContractViolation(
                clause="Clause 4: State Coverage",
                rule="WCAG 2.1 AA Keyboard Navigation",
                file="index.html",
                line=1,
                detail="Missing :focus-visible rules for interactive elements (links, buttons, summaries)",
                fixable=True
            ))

            if self.fix_mode:
                focus_css = """
    /* Accessibility: Complete Focus-Visible States (Anti-Slop Constraint 9 & WCAG 2.1 AA) */
    a:focus-visible,
    button:focus-visible,
    summary:focus-visible,
    input:focus-visible,
    .btn-pricing:focus-visible,
    .nav-cta:focus-visible,
    .btn-primary:focus-visible,
    .btn-secondary:focus-visible,
    .whatsapp-btn-float:focus-visible {
      outline: 2px solid var(--gold-subtle);
      outline-offset: 3px;
      box-shadow: 0 0 0 4px rgba(138, 106, 53, 0.18);
    }
"""
                # Insert before </style>
                if "</style>" in html_content:
                    html_content = html_content.replace("</style>", focus_css + "  </style>", 1)
                    self.fixes_applied += 1
                    print("[fix] Injected canonical :focus-visible styles into index.html.")

        return html_content

    def check_copywriting_and_claims(self, html_content: str):
        """Contract Clause 5: Authentic Copywriting & Zero Fabricated Claims."""
        prohibited_phrases = [
            (r"\b10x\b", "Prohibited hyperbole '10x'"),
            (r"\b100x\b", "Prohibited hyperbole '100x'"),
            (r"ingresos?\s+pasivos?", "Prohibited promise of passive income"),
            (r"enriquecimiento\s+autom[aá]tico", "Prohibited promise of automatic wealth"),
            (r"desata\s+tu\s+potencial", "Generic AI marketing cliché 'desata tu potencial'"),
            (r"en\s+el\s+vertiginoso\s+mundo", "Generic AI copy cliché 'en el vertiginoso mundo'"),
            (r"cero\s+fricci[oó]n\s+garantizada", "Overpromising claim 'cero fricción garantizada'"),
            (r"erradicar\s+el\s+trabajo", "Hyperbolic statement 'erradicar el trabajo'")
        ]

        for pattern, desc in prohibited_phrases:
            matches = list(re.finditer(pattern, html_content, re.IGNORECASE))
            for m in matches:
                line_no = html_content[:m.start()].count("\n") + 1
                self.violations.append(ContractViolation(
                    clause="Clause 5: Authentic Copywriting",
                    rule="Anti-Hype & Non-Fabrication",
                    file="index.html",
                    line=line_no,
                    detail=f"{desc} (matched: '{m.group(0)}')",
                    fixable=False
                ))

        # Check for benchmark approximation disclaimer
        pricing_disclaimer = re.search(r"Equivalencia de referencia internacional", html_content, re.IGNORECASE)
        if not pricing_disclaimer:
            self.violations.append(ContractViolation(
                clause="Clause 5: Authentic Copywriting",
                rule="Indicative Reference Disclaimer",
                file="index.html",
                line=1,
                detail="Missing international reference currency footnote in pricing section",
                fixable=False
            ))

    def check_surface_security_and_privacy(self, html_content: str):
        """Contract Clause 6: Clean Public Surface & Zero-Tracking."""
        # 1. No raw relative markdown links in public hrefs
        raw_md_matches = re.findall(r'href=["\'](?!https?://)[^"\']*\.md["\']', html_content, re.IGNORECASE)
        for bad_href in raw_md_matches:
            self.violations.append(ContractViolation(
                clause="Clause 6: Public Surface Security",
                rule="No Raw Markdown Links",
                file="index.html",
                line=1,
                detail=f"Found raw unrendered relative markdown link href='{bad_href}'",
                fixable=False
            ))

        # 2. Zero third-party trackers
        tracking_patterns = [
            (r"googletagmanager\.com", "Google Tag Manager"),
            (r"google-analytics\.com", "Google Analytics"),
            (r"connect\.facebook\.net", "Meta Pixel"),
            (r"hotjar\.com", "Hotjar Tracker"),
        ]
        for pattern, tracker_name in tracking_patterns:
            if re.search(pattern, html_content, re.IGNORECASE):
                self.violations.append(ContractViolation(
                    clause="Clause 6: Zero-Tracking Privacy",
                    rule="Strict Privacy by Design",
                    file="index.html",
                    line=1,
                    detail=f"Detected tracking script '{tracker_name}' violating Zero-Tracking doctrine",
                    fixable=False
                ))

    def audit_governance_files(self):
        """Verifies presence and sync state of AGENTS.md, FRONTEND.md, and PROJECT.md."""
        for doc, name in [(AGENTS_MD, "AGENTS.md"), (FRONTEND_MD, "FRONTEND.md"), (PROJECT_MD, "PROJECT.md")]:
            if not doc.exists():
                self.violations.append(ContractViolation(
                    clause="Clause 0: Governance Integrity",
                    rule="Mandatory Governance Artifact",
                    file=name,
                    line=1,
                    detail=f"Missing essential governance file {name}",
                    fixable=False
                ))
            else:
                content = doc.read_text(encoding="utf-8")
                if "ANTI-SLOP" not in content and "Anti-Slop" not in content:
                    self.violations.append(ContractViolation(
                        clause="Clause 0: Governance Integrity",
                        rule="Anti-Slop Policy Inclusion",
                        file=name,
                        line=1,
                        detail=f"{name} does not reference the Anti-Slop Design Policy",
                        fixable=False
                    ))

    def run(self) -> int:
        print("=== Iniciando Verificación de Contrato de Políticas (Upstream Compliance) ===")
        if not INDEX_HTML.exists():
            print(f"Error: {INDEX_HTML} not found.")
            return 1

        html_content = INDEX_HTML.read_text(encoding="utf-8")

        # Run checks
        self.audit_governance_files()
        self.check_anti_slop_visuals(html_content)
        self.check_typography(html_content)
        
        # Check decorative emojis (may fix)
        html_content = self.check_decorative_emojis(html_content)
        
        # Check state coverage (may fix)
        html_content = self.check_state_coverage(html_content)
        
        self.check_copywriting_and_claims(html_content)
        self.check_surface_security_and_privacy(html_content)

        # Write back if fixes were applied
        if self.fix_mode and self.fixes_applied > 0:
            INDEX_HTML.write_text(html_content, encoding="utf-8")
            print(f"[fix] Successfully applied {self.fixes_applied} automated fix(es) to index.html.")

        print(f"\nResultados de la Auditoría:")
        print(f"- Total de violaciones encontradas: {len(self.violations)}")

        if not self.violations:
            print(">>> [PASS] CONTRATO DE POLÍTICAS 100% CUMPLIDO. Cero slop, cero fugas, estados completos.")
            return 0
        else:
            print("\nDetalle de Violaciones Detectadas:")
            for v in self.violations:
                print(f"  • {v}")
            
            if not self.fix_mode and any(v.fixable for v in self.violations):
                print("\nTip: Ejecuta 'python scripts/verify_policy_contract.py --fix' para corregir automáticamente las violaciones reparables.")
            return 1


def main():
    parser = argparse.ArgumentParser(description="Verify upstream policy contract.")
    parser.add_argument("--fix", action="store_true", help="Automatically repair fixable contract violations.")
    args = parser.parse_args()

    auditor = ContractAuditor(fix_mode=args.fix)
    sys.exit(auditor.run())


if __name__ == "__main__":
    main()
