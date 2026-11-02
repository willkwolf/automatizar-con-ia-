"""
Script to apply Kaizen Copywriting and Mobile UX optimizations to index.html and en/index.html
"""
import re

def update_spanish():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add html overflow-x: hidden
    content = content.replace(
        'html {\n  scroll-behavior: smooth;\n}',
        'html {\n  scroll-behavior: smooth;\n  overflow-x: hidden;\n}'
    )
    content = content.replace(
        'html {\r\n  scroll-behavior: smooth;\r\n}',
        'html {\r\n  scroll-behavior: smooth;\r\n  overflow-x: hidden;\r\n}'
    )

    # 2. Add mobile responsive rules for 520px
    old_m520 = """    @media (max-width: 520px) {
      .nav-wrapper {"""
    new_m520 = """    @media (max-width: 520px) {
      .container {
        padding: 0 var(--space-4);
      }
      .triad-card,
      .delivery-showcase-item,
      .b2b-overview-card,
      .b2b-curriculum-card,
      .casa-matriz-card,
      .direct-contact-card {
        padding: var(--space-4) !important;
      }
      .stage-window-bar {
        padding: var(--space-2) var(--space-3);
      }
      .stage-window-title {
        font-size: 0.56rem;
        letter-spacing: 0.02em;
      }
      .stage-window-status {
        font-size: 0.52rem;
      }
      .stage-canvas-wrap {
        min-height: 250px;
      }
      .stage-pill-tab {
        font-size: 0.55rem;
        padding: 2px 6px;
      }
      .nav-wrapper {"""
    if old_m520 in content:
        content = content.replace(old_m520, new_m520)
    else:
        # try CRLF
        content = content.replace(old_m520.replace('\n', '\r\n'), new_m520.replace('\n', '\r\n'))

    # 3. Hero Subtitle Kaizen
    old_hero_sub = "Ayudamos a agencias digitales y firmas de servicios profesionales a optimizar su productividad resolviendo cuellos de botella reales con software a medida, pipelines de datos robustos y agentes supervisados con gobernanza Human-in-the-Loop."
    new_hero_sub = "Diseñamos software a medida, pipelines de datos e IA supervisada para agencias digitales que resuelven cuellos de botella y protegen sus márgenes operativos."
    content = content.replace(old_hero_sub, new_hero_sub)

    # 4. Showcase 1 Narrative Kaizen
    old_s1 = """              <div class="showcase-narrative">
                <p>
                  Toda organización que emprende una modernización tecnológica persigue una estrella objetivo: una arquitectura escalable, autonomía operativa o la consolidación de una plataforma digital propia. Sin embargo, en el terreno real, los planes rígidos chocan con la fricción cotidiana y la deuda técnica acumulada.
                </p>
                <p>
                  Bajo la analogía del <strong>Viaje del Héroe</strong>, nuestro equipo no actúa como un observador externo ni impone recetas prefabricadas; operamos como la cordada técnica que acompaña a tus líderes de producto e ingeniería durante la ascensión. Integramos una célula de software especializada dentro de tus flujos de trabajo actuales, adoptando tus ceremonias ágiles y asumiendo la responsabilidad compartida de avanzar hito a hito hacia el destino trazado.
                </p>
              </div>"""
    new_s1 = """              <div class="showcase-narrative">
                <p>
                  Acompañamos a tus líderes de ingeniería y producto desde la línea base operativa hasta la autonomía tecnológica. Bajo la analogía del <strong>Viaje del Héroe</strong>, integramos una célula técnica dedicada dentro de tus ceremonias ágiles, mitigando deuda técnica y asumiendo la responsabilidad compartida de avanzar hito a hito hacia tu estrella objetivo.
                </p>
              </div>"""
    content = content.replace(old_s1, new_s1)
    content = content.replace(old_s1.replace('\n', '\r\n'), new_s1.replace('\n', '\r\n'))

    # 5. Showcase 2 Narrative Kaizen
    old_s2 = """              <div class="showcase-narrative">
                <p>
                  Cuando el entorno cambia con rapidez, las mayores ventajas competitivas rara vez provienen de planes predecibles; nacen de explorar señales débiles en el mercado o validar capacidades emergentes de inteligencia artificial antes de que se vuelvan estándares de la industria. No obstante, comprometer grandes presupuestos en fases tempranas suele generar desperdicio de capital.
                </p>
                <p>
                  Inspirados en las <strong>Sondas Digitales</strong>, este modelo de entrega opera como una misión de reconocimiento autónoma. En lugar de desplegar grandes infraestructuras a ciegas, construimos artefactos de software ligeros y altamente especializados para sondear una hipótesis concreta. Lanzamos la sonda, medimos su desempeño en un entorno controlado y regresamos con evidencia empírica contundente para tomar decisiones con certeza matemática.
                </p>
              </div>"""
    new_s2 = """              <div class="showcase-narrative">
                <p>
                  Validamos hipótesis técnicas y comerciales antes de comprometer capital en infraestructura. Inspirados en las <strong>Sondas Digitales</strong>, desplegamos artefactos ligeros de software e IA de frontera en sprints de 1 a 2 semanas. Medimos el rendimiento en entornos controlados y entregamos evidencia empírica para decidir con rigor si escalar o descartar sin acumular deuda técnica.
                </p>
              </div>"""
    content = content.replace(old_s2, new_s2)
    content = content.replace(old_s2.replace('\n', '\r\n'), new_s2.replace('\n', '\r\n'))

    # 6. Showcase 3 Narrative Kaizen
    old_s3 = """              <div class="showcase-narrative">
                <p>
                  Las empresas tecnológicamente maduras entienden que no se debe sacrificar la certidumbre operativa por la innovación, ni congelar la innovación en nombre de la estabilidad. El verdadero liderazgo consiste en sincronizar ambas disciplinas dentro de un mismo sistema de entrega.
                </p>
                <p>
                  La <strong>Integración Híbrida</strong> combina la firmeza de un roadmap de desarrollo continuo (el Viaje del Héroe) con la flexibilidad de lanzar periódicamente sondas exploratorias ante nuevas oportunidades. Esta dinámica opera bajo un estricto principio de compuertas de gobernanza: las sondas experimentan en la periferia y únicamente aquellas innovaciones que demuestran rentabilidad y superan las auditorías de seguridad son promovidas e integradas a la arquitectura central.
                </p>
              </div>"""
    new_s3 = """              <div class="showcase-narrative">
                <p>
                  Sincronizamos la estabilidad de tus plataformas centrales con la exploración ágil de nuevas oportunidades. La <strong>Integración Híbrida</strong> combina un roadmap troncal de ingeniería continua con sondas periféricas bajo compuertas estrictas de gobernanza: solo los prototipos que demuestran tracción operativa y superan auditorías de seguridad se integran al código productivo mediante un retainer estratégico.
                </p>
              </div>"""
    content = content.replace(old_s3, new_s3)
    content = content.replace(old_s3.replace('\n', '\r\n'), new_s3.replace('\n', '\r\n'))

    # 7. Enablement B2B Lead Kaizen
    old_b2b = "Formamos a directores de tecnología, gerentes de operaciones, product managers y líderes técnicos para auditar, supervisar y gobernar agentes inteligentes y flujos automatizados en entornos empresariales reales. Nuestro enfoque enseña a pasar de experimentar con prompts a construir especificaciones verificables con control humano riguroso."
    new_b2b = "Formamos a directores de operaciones, product managers y líderes técnicos para auditar, gobernar y orquestar flujos de trabajo agénticos con control humano verificable y rigor de ingeniería."
    content = content.replace(old_b2b, new_b2b)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html updated successfully.")

def update_english():
    with open('en/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add html overflow-x: hidden
    content = content.replace(
        'html {\n  scroll-behavior: smooth;\n}',
        'html {\n  scroll-behavior: smooth;\n  overflow-x: hidden;\n}'
    )
    content = content.replace(
        'html {\r\n  scroll-behavior: smooth;\r\n}',
        'html {\r\n  scroll-behavior: smooth;\r\n  overflow-x: hidden;\r\n}'
    )

    # 2. Add mobile responsive rules for 520px
    old_m520 = """    @media (max-width: 520px) {
      .nav-wrapper {"""
    new_m520 = """    @media (max-width: 520px) {
      .container {
        padding: 0 var(--space-4);
      }
      .triad-card,
      .delivery-showcase-item,
      .b2b-overview-card,
      .b2b-curriculum-card,
      .casa-matriz-card,
      .direct-contact-card {
        padding: var(--space-4) !important;
      }
      .stage-window-bar {
        padding: var(--space-2) var(--space-3);
      }
      .stage-window-title {
        font-size: 0.56rem;
        letter-spacing: 0.02em;
      }
      .stage-window-status {
        font-size: 0.52rem;
      }
      .stage-canvas-wrap {
        min-height: 250px;
      }
      .stage-pill-tab {
        font-size: 0.55rem;
        padding: 2px 6px;
      }
      .nav-wrapper {"""
    if old_m520 in content:
        content = content.replace(old_m520, new_m520)
    else:
        content = content.replace(old_m520.replace('\n', '\r\n'), new_m520.replace('\n', '\r\n'))

    # 3. Hero Subtitle Kaizen
    old_hero_sub = "We help digital agencies and professional services firms optimize productivity by resolving real bottlenecks through custom software, robust data pipelines, and supervised agents with Human-in-the-Loop governance."
    new_hero_sub = "We engineer custom software, data pipelines, and supervised AI for digital agencies solving operational bottlenecks while protecting profit margins."
    content = content.replace(old_hero_sub, new_hero_sub)

    # 4. Showcase 1 Narrative Kaizen
    old_s1 = """              <div class="showcase-narrative">
                <p>
                  Every organization undergoing modern technical transformation pursues a clear target star: scalable architecture, operational autonomy, or proprietary digital platforms. However, in day-to-day execution, rigid plans inevitably clash with ongoing operational friction and legacy technical debt.
                </p>
                <p>
                  Under the <strong>Hero's Journey</strong> analogy, our team does not operate as detached observers offering canned playbooks; we serve as your technical rope team accompanying product and engineering leaders throughout the ascent. We embed a dedicated software engineering squad directly into your agile ceremonies, sharing real-time ownership of milestone-by-milestone progression.
                </p>
              </div>"""
    new_s1 = """              <div class="showcase-narrative">
                <p>
                  We guide technical and product leaders from operational baseline to full engineering sovereignty. Under the <strong>Hero's Journey</strong> analogy, we embed a dedicated engineering squad within your agile ceremonies, eliminating technical debt and taking shared ownership to reach your target destination milestone by milestone.
                </p>
              </div>"""
    content = content.replace(old_s1, new_s1)
    content = content.replace(old_s1.replace('\n', '\r\n'), new_s1.replace('\n', '\r\n'))

    # 5. Showcase 2 Narrative Kaizen
    old_s2 = """              <div class="showcase-narrative">
                <p>
                  In fast-changing landscapes, breakthrough competitive advantages rarely stem from predictable roadmaps; they emerge from detecting faint market signals and validating frontier AI capabilities before they become industry standards. However, committing heavy capital prematurely introduces unacceptable financial waste.
                </p>
                <p>
                  Inspired by <strong>Digital Probes</strong>, this delivery model functions as an autonomous reconnaissance mission. Instead of deploying monolithic infrastructure blindly, we build lightweight, laser-focused software probes to test a singular hypothesis in a controlled harness, delivering empirical proof to make mathematical go/no-go decisions.
                </p>
              </div>"""
    new_s2 = """              <div class="showcase-narrative">
                <p>
                  We validate architectural and commercial hypotheses before allocating capital to heavy infrastructure. Inspired by <strong>Digital Probes</strong>, we deploy lightweight software and frontier AI spikes in 1–2 week sprints. We measure performance in controlled harnesses, returning empirical evidence to scale or discard with mathematical certainty.
                </p>
              </div>"""
    content = content.replace(old_s2, new_s2)
    content = content.replace(old_s2.replace('\n', '\r\n'), new_s2.replace('\n', '\r\n'))

    # 6. Showcase 3 Narrative Kaizen
    old_s3 = """              <div class="showcase-narrative">
                <p>
                  Mature enterprises recognize they must neither sacrifice operational stability for reckless innovation nor freeze technological progress in the name of safety. Authentic technical leadership synchronizes both disciplines within a singular operating system.
                </p>
                <p>
                  <strong>Hybrid Integration</strong> blends the steady cadence of a core engineering roadmap (the Hero's Journey) with the agility of regularly launching exploratory probes. Under strict governance gates, probes experiment along peripheral orbits, and only those demonstrating tangible ROI and passing security audits graduate into production code.
                </p>
              </div>"""
    new_s3 = """              <div class="showcase-narrative">
                <p>
                  We balance the stability of core production systems with agile frontier exploration. <strong>Hybrid Integration</strong> combines a mainline continuous engineering roadmap with peripheral probe orbits under strict governance gates: only prototypes demonstrating proven operational value and passing security audits graduate into production code via a strategic retainer.
                </p>
              </div>"""
    content = content.replace(old_s3, new_s3)
    content = content.replace(old_s3.replace('\n', '\r\n'), new_s3.replace('\n', '\r\n'))

    # 7. Enablement B2B Lead Kaizen
    old_b2b = "We train engineering directors, operations managers, product managers, and technical leads to audit, supervise, and govern intelligent agents and automated workflows in real enterprise environments. Our curriculum transitions teams from prompt tinkering to verifiable specifications with strict human oversight."
    new_b2b = "We equip operations leaders, product managers, and tech leads to audit, govern, and orchestrate agentic workflows with verifiable human oversight and engineering rigor."
    content = content.replace(old_b2b, new_b2b)

    with open('en/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("en/index.html updated successfully.")

if __name__ == '__main__':
    update_spanish()
    update_english()
