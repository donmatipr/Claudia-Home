#!/usr/bin/env python3
"""
Convierte el texto de un logo SVG en trazos (paths).

Por qué: los logos exportados traen el nombre como elementos <text> que
dependen de las fuentes Lora y Karla. Un SVG así solo se ve bien si esas
fuentes están cargadas; con <img> ni siquiera puede alcanzarlas y el texto
sale en Georgia y Arial. Al convertirlo a trazos el logo se ve idéntico
siempre, sin depender de nada externo.

Uso:
    pip install fonttools uharfbuzz
    python scripts/logo-a-trazos.py

Lee los SVG de ENTRADAS y escribe una copia con sufijo "-trazos".
No modifica los archivos originales.

Las fuentes se descargan de Google Fonts en el peso exacto que pide cada
<text>, así que el resultado calza con lo que hoy muestra el navegador.
HarfBuzz se encarga del kerning, igual que lo hace el navegador.
"""

import re
import sys
import urllib.request
from pathlib import Path
from xml.sax.saxutils import unescape

try:
    import uharfbuzz as hb
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit("Faltan dependencias. Ejecuta:  pip install fonttools uharfbuzz")


RAIZ = Path(__file__).resolve().parent.parent
CARPETA_LOGOS = RAIZ / "images" / "logo-v2"

# Archivos a convertir. Agrega o quita según necesites.
ENTRADAS = ["logo-horizontal.svg", "logo-monocromo.svg", "logo-vertical.svg"]

# Primera familia de cada font-family -> nombre en Google Fonts.
# Si tu logo usa otra tipografía, agrégala aquí.
FAMILIAS = {
    "Lora": "Lora",
    "Karla": "Karla",
    "Manrope": "Manrope",
}

_cache_fuentes = {}


def descargar_fuente(familia: str, peso: int) -> bytes:
    """Trae de Google Fonts el TTF estático de esa familia y peso."""
    clave = (familia, peso)
    if clave in _cache_fuentes:
        return _cache_fuentes[clave]

    css_url = f"https://fonts.googleapis.com/css2?family={familia}:wght@{peso}"
    # Un User-Agent antiguo hace que Google devuelva TTF en vez de woff2,
    # que fontTools lee sin necesitar brotli.
    pedido = urllib.request.Request(css_url, headers={"User-Agent": "Mozilla/4.0"})
    css = urllib.request.urlopen(pedido, timeout=30).read().decode("utf-8")

    urls = re.findall(r"url\((https://[^)]+\.ttf)\)", css)
    if not urls:
        raise RuntimeError(f"Google Fonts no devolvió TTF para {familia} {peso}")

    datos = urllib.request.urlopen(urls[0], timeout=30).read()
    _cache_fuentes[clave] = datos
    print(f"    fuente descargada: {familia} {peso} ({len(datos) // 1024} KB)")
    return datos


def familia_de(font_family: str) -> str:
    """Saca la primera familia de un font-family y la busca en el mapa."""
    primera = font_family.split(",")[0].strip().strip("'\"")
    if primera not in FAMILIAS:
        raise RuntimeError(
            f"No sé de dónde bajar la fuente '{primera}'. "
            f"Agrégala al diccionario FAMILIAS del script."
        )
    return FAMILIAS[primera]


def texto_a_path(texto, x, y, familia, peso, tam, espaciado):
    """Devuelve el atributo d de un path con el texto ya trazado."""
    datos = descargar_fuente(familia, peso)

    # HarfBuzz posiciona los glifos aplicando kerning, igual que el navegador
    cara = hb.Face(datos)
    fuente_hb = hb.Font(cara)
    buf = hb.Buffer()
    buf.add_str(texto)
    buf.guess_segment_properties()
    hb.shape(fuente_hb, buf)

    # fontTools entrega el contorno de cada glifo
    tt = TTFont(hb.Blob(datos).__class__ and __import__("io").BytesIO(datos))
    glifos = tt.getGlyphSet()
    orden = tt.getGlyphOrder()
    upem = tt["head"].unitsPerEm
    escala = tam / upem

    partes = []
    cursor_x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        nombre = orden[info.codepoint]

        pluma = SVGPathPen(glifos)
        glifos[nombre].draw(pluma)
        d = pluma.getCommands()

        if d:  # el espacio no dibuja nada
            # El eje Y de las fuentes va hacia arriba y el del SVG hacia abajo
            gx = x + (cursor_x + pos.x_offset) * escala
            gy = y - pos.y_offset * escala
            partes.append(
                f'<path transform="translate({gx:.3f},{gy:.3f}) '
                f'scale({escala:.6f},{-escala:.6f})" d="{d}"/>'
            )

        cursor_x += pos.x_advance
        # letter-spacing va en unidades del SVG: se pasa a unidades de fuente
        cursor_x += espaciado / escala

    tt.close()
    return "".join(partes)


PATRON_TEXT = re.compile(r"<text\b([^>]*)>(.*?)</text>", re.S)


def atributo(attrs: str, nombre: str, defecto=None):
    m = re.search(rf'{nombre}\s*=\s*"([^"]*)"', attrs)
    return m.group(1) if m else defecto


def convertir(ruta: Path) -> Path:
    svg = ruta.read_text(encoding="utf-8")
    bloques = PATRON_TEXT.findall(svg)
    if not bloques:
        print(f"  {ruta.name}: no tiene <text>, se copia igual")
        salida = ruta.with_name(ruta.stem + "-trazos.svg")
        salida.write_text(svg, encoding="utf-8")
        return salida

    print(f"  {ruta.name}: {len(bloques)} bloque(s) de texto")

    def reemplazo(m):
        attrs, contenido = m.group(1), m.group(2)
        texto = unescape(re.sub(r"<[^>]*>", "", contenido)).strip()

        familia = familia_de(atributo(attrs, "font-family", "Manrope"))
        peso = int(float(atributo(attrs, "font-weight", "400")))
        tam = float(atributo(attrs, "font-size", "16"))
        x = float(atributo(attrs, "x", "0"))
        y = float(atributo(attrs, "y", "0"))
        espaciado = float(atributo(attrs, "letter-spacing", "0"))
        opacidad = atributo(attrs, "opacity")
        relleno = atributo(attrs, "fill")

        print(f'    "{texto}" -> {familia} {peso} {tam}px')
        d = texto_a_path(texto, x, y, familia, peso, tam, espaciado)

        # Se conservan opacity y fill que traía el <text>
        envoltura = []
        if opacidad:
            envoltura.append(f'opacity="{opacidad}"')
        if relleno:
            envoltura.append(f'fill="{relleno}"')
        if envoltura:
            return f'<g {" ".join(envoltura)}>{d}</g>'
        return d

    nuevo = PATRON_TEXT.sub(reemplazo, svg)
    salida = ruta.with_name(ruta.stem + "-trazos.svg")
    salida.write_text(nuevo, encoding="utf-8")
    return salida


def main():
    print(f"Carpeta: {CARPETA_LOGOS}\n")
    hechos = []
    for nombre in ENTRADAS:
        ruta = CARPETA_LOGOS / nombre
        if not ruta.exists():
            print(f"  {nombre}: no existe, se omite")
            continue
        hechos.append(convertir(ruta))

    if not hechos:
        sys.exit("\nNo se convirtió ningún archivo.")

    print("\nListo. Archivos generados:")
    for f in hechos:
        antes = (CARPETA_LOGOS / f.name.replace("-trazos", "")).stat().st_size
        print(f"  {f.name}  ({antes // 1024} KB -> {f.stat().st_size // 1024} KB)")
    print("\nRevísalos en el navegador antes de reemplazar los originales.")


if __name__ == "__main__":
    main()
