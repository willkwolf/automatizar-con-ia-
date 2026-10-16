#!/usr/bin/env python3
"""
Monitor TRM (Tasa Representativa del Mercado) - Boutique Digital
Evalúa la desviación de la TRM frente a la base (3.100 COP/USD).
Si la variación supera el ±30% (< 2.170 o > 4.030 COP), emite alerta para recalcular tarifas.
"""

import sys
import json
import urllib.request
from datetime import datetime

BASE_TRM = 3100.0
THRESHOLD_PERCENT = 30.0

def fetch_current_trm():
    # Consulta API pública ligera y abierta de tipo de cambio
    url = "https://open.er-api.com/v6/latest/USD"
    req = urllib.request.Request(url, headers={"User-Agent": "BoutiqueDigital-TRM/1.0"})
    with urllib.request.urlopen(req, timeout=10) as response:
        if response.status == 200:
            data = json.loads(response.read().decode())
            rates = data.get("rates", {})
            return float(rates.get("COP", 0.0))
    return None

def main():
    print(f"[{datetime.now().isoformat()}] Verificando TRM de referencia...")
    try:
        current_trm = fetch_current_trm()
    except Exception as e:
        print(f"Advertencia: No se pudo consultar la API de TRM: {e}")
        # En caso de fallo de red en CI, salir limpio sin romper el build
        sys.exit(0)

    if not current_trm or current_trm <= 0:
        print("No se obtuvo un valor válido de TRM.")
        sys.exit(0)

    deviation = ((current_trm - BASE_TRM) / BASE_TRM) * 100.0
    print(f"TRM Base: {BASE_TRM} COP | TRM Actual: {current_trm:.2f} COP | Variación: {deviation:+.2f}%")

    if abs(deviation) > THRESHOLD_PERCENT:
        print(f"ALERTA: Desviación de TRM ({abs(deviation):.2f}%) supera el umbral del {THRESHOLD_PERCENT}%.")
        print("Se requiere actualizar tarifas en pesos colombianos y regenerar el sitio.")
        # Retorna código 1 si se desea notificar en workflow
    else:
        print(f"TRM estable dentro del rango de tolerancia (±{THRESHOLD_PERCENT}%).")

if __name__ == "__main__":
    main()
