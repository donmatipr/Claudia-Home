#!/usr/bin/env python3
"""
Genera los iconos PNG del sitio a partir del isotipo de la marca.

Por qué: iOS no admite SVG en apple-touch-icon. Sin un PNG, quien agregue
el sitio a su pantalla de inicio ve una captura de la página en vez del
logo. Android y los instaladores de PWA también prefieren PNG.

Uso:
    pip install Pillow
    python scripts/generar-iconos.py

Genera en images/:
    apple-touch-icon.png   180x180  (iOS)
    icon-192.png           192x192  (Android / manifest)
    icon-512.png           512x512  (Android / manifest)

La figura se dibuja con la misma geometría que images/favicon.svg. Si
cambias ese SVG, ajusta las constantes de abajo para que coincidan.
"""

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("Falta Pillow. Ejecuta:  pip install Pillow")


RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "images"

# ── Geometría, tomada de images/favicon.svg ──────────────────────────
# El SVG mide 64x64 y dibuja el isotipo dentro de un grupo con
# transform="translate(32,32) scale(0.22) translate(-100,-100)",
# o sea: punto(x,y) -> (32 + 0.22*(x-100), 32 + 0.22*(y-100))
LIENZO = 64
RADIO_ESQUINA = 14
ESCALA = 0.22

FONDO = "#254A36"     # verde bosque
ARCO = "#F7F4EE"      # crema
DETALLE = "#C8A15A"   # dorado

# Antialiasing por supermuestreo: se dibuja grande y se reduce
FACTOR = 8


def t(x, y):
    """Aplica la transformación del grupo del SVG."""
    return (32 + ESCALA * (x - 100), 32 + ESCALA * (y - 100))


def dibujar(tam: int) -> Image.Image:
    """Dibuja el icono a `tam` px."""
    g = tam * FACTOR
    k = g / LIENZO  # de unidades del SVG a píxeles del lienzo grande

    img = Image.new("RGBA", (g, g), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Fondo redondeado
    d.rounded_rectangle([0, 0, g - 1, g - 1], radius=RADIO_ESQUINA * k, fill=FONDO)

    # ── El arco ──
    # SVG: M34 176 V100 A66 66 0 0 1 166 100 V176, trazo de 26 sin relleno
    grosor = 26 * ESCALA * k
    centro_x, centro_y = t(100, 100)
    radio = 66 * ESCALA * k

    # Pillow dibuja el trazo hacia adentro del recuadro, así que el
    # recuadro se agranda medio grosor para centrarlo sobre el radio.
    externo = radio + grosor / 2
    caja = [
        centro_x * k - externo, centro_y * k - externo,
        centro_x * k + externo, centro_y * k + externo,
    ]
    # 180 a 360 pasa por 270, que con el eje Y hacia abajo es arriba
    d.arc(caja, 180, 360, fill=ARCO, width=int(round(grosor)))

    # Las dos patas verticales, de y=100 a y=176
    _, y_arriba = t(0, 100)
    _, y_abajo = t(0, 176)
    for x_svg in (34, 166):
        cx, _ = t(x_svg, 0)
        d.rectangle(
            [(cx - 26 * ESCALA / 2) * k, y_arriba * k,
             (cx + 26 * ESCALA / 2) * k, y_abajo * k],
            fill=ARCO,
        )

    # ── El detalle dorado ──
    # SVG: M126 100 H74 V176 H96 V122 H126 Z
    puntos = [(126, 100), (74, 100), (74, 176), (96, 176), (96, 122), (126, 122)]
    d.polygon([tuple(v * k for v in t(x, y)) for x, y in puntos], fill=DETALLE)

    return img.resize((tam, tam), Image.LANCZOS)


def main():
    if not DESTINO.exists():
        sys.exit(f"No existe la carpeta {DESTINO}")

    salidas = {
        "apple-touch-icon.png": 180,
        "icon-192.png": 192,
        "icon-512.png": 512,
    }

    for nombre, tam in salidas.items():
        ruta = DESTINO / nombre
        capa = dibujar(tam)
        # Se entrega cuadrado y opaco a propósito: iOS y Android aplican su
        # propia máscara redondeada. Si ya viniera redondeado, se vería un
        # doble redondeo; y la transparencia iOS la rellena de negro.
        icono = Image.new("RGB", (tam, tam), FONDO)
        icono.paste(capa, (0, 0), capa)
        icono.save(ruta, "PNG", optimize=True)
        print(f"  {nombre}  {tam}x{tam}  {ruta.stat().st_size // 1024} KB")

    print("\nListo. Revisa los PNG antes de publicar.")


if __name__ == "__main__":
    main()
