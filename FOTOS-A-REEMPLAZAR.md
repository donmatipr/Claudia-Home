# 📷 Guía de reemplazo de fotografías

Esta guía explica **qué fotografía debe colocarse en cada nombre de archivo**, qué tamaño se recomienda y cómo reemplazarla.

---

## Ubicación de las imágenes

Todas las imágenes del sitio se guardan en la carpeta:

```
casa-de-reposo/
└── images/
    ├── hero-residencia.webp
    ├── sede-macul.webp
    ├── sede-nunoa.webp
    ├── espacio-comun.webp
    ├── habitacion.webp
    ├── alimentacion.webp
    ├── actividad-grupal.webp
    └── equipo-cuidados.webp
```

---

## Descripción de cada imagen

### `hero-residencia.webp`
**Qué mostrar:** Imagen principal que aparece como fondo en la sección de inicio. Debe transmitir calidez y confianza. Lo ideal es mostrar un espacio interior luminoso y acogedor, o una interacción respetuosa entre cuidadoras y residentes.

- **Orientación:** Horizontal (apaisada)
- **Tamaño recomendado:** 1920 × 1080 px mínimo
- **Peso máximo:** 400 KB (en formato WebP)
- **Evitar:** Imágenes hospitalarias, tristeza, dependencia extrema, personas en cama

---

### `sede-macul.webp`
**Qué mostrar:** Fachada o entrada principal de la Sede Macul (Manuel Sánchez 3234). Si no hay fachada fotogénica, puede mostrarse un espacio interior representativo.

- **Orientación:** Horizontal o cuadrada
- **Tamaño recomendado:** 800 × 600 px mínimo
- **Peso máximo:** 200 KB
- **Evitar:** Fotos nocturnas o con mala iluminación

---

### `sede-nunoa.webp`
**Qué mostrar:** Fachada o entrada principal de la Sede Ñuñoa (Montenegro 688). Mismas recomendaciones que Sede Macul.

- **Orientación:** Horizontal o cuadrada
- **Tamaño recomendado:** 800 × 600 px mínimo
- **Peso máximo:** 200 KB

---

### `espacio-comun.webp`
**Qué mostrar:** Sala de estar, comedor o área común de la residencia. Que se vea ordenado, luminoso y acogedor. Puede haber residentes usando el espacio naturalmente.

- **Orientación:** Horizontal
- **Tamaño recomendado:** 1200 × 800 px
- **Peso máximo:** 250 KB

---

### `habitacion.webp`
**Qué mostrar:** Habitación típica de la residencia. Cama ordenada, buena iluminación, ambiente cálido y limpio. Puede incluir elementos personales si se autoriza.

- **Orientación:** Horizontal
- **Tamaño recomendado:** 1000 × 750 px
- **Peso máximo:** 200 KB

---

### `alimentacion.webp`
**Qué mostrar:** Momento de alimentación: comedor servido, alimentos preparados, o residentes disfrutando una comida. Que transmita cuidado y nutrición.

- **Orientación:** Horizontal
- **Tamaño recomendado:** 1000 × 750 px
- **Peso máximo:** 200 KB
- **Evitar:** Alimentos poco apetecibles o desordenados

---

### `actividad-grupal.webp`
**Qué mostrar:** Sesión de kinesiología grupal, terapia ocupacional u otra actividad grupal. Residentes participando activamente, expresión positiva.

- **Orientación:** Horizontal
- **Tamaño recomendado:** 1000 × 750 px
- **Peso máximo:** 200 KB
- **Requiere:** Autorización escrita de las personas que aparecen en la foto

---

### `equipo-cuidados.webp`
**Qué mostrar:** Una o más cuidadoras del equipo, con actitud amable y profesional. No necesariamente en uniforme clínico — ropa de trabajo cotidiana y cálida es perfecta.

- **Orientación:** Horizontal
- **Tamaño recomendado:** 800 × 600 px
- **Peso máximo:** 200 KB
- **Requiere:** Autorización escrita de las personas que aparecen

---

## Cómo reemplazar una imagen

### Opción 1: Reemplazar manualmente
1. Convierte tu foto al formato **WebP** (puedes usar [Squoosh](https://squoosh.app/) gratuitamente).
2. Nómbrala **exactamente igual** al archivo que quieres reemplazar (por ejemplo: `sede-macul.webp`).
3. Copia el archivo nuevo en la carpeta `images/`.
4. Confirma en el sitio que la imagen nueva aparece correctamente.

### Opción 2: Mantener formato JPG o PNG
Si no puedes convertir a WebP, simplemente:
1. Cambia la extensión en el nombre del archivo por `.jpg` o `.png`.
2. Edita el archivo `data/site.js` y actualiza la ruta correspondiente en la sección `galeria`.

---

## Formatos aceptados

| Formato | Recomendado | Notas |
|---------|-------------|-------|
| `.webp` | ✅ Sí | Mejor rendimiento y calidad |
| `.jpg` | ✅ Sí | Alternativa válida |
| `.png` | ⚠️ Solo si necesita transparencia | Más pesado |

---

## Herramientas gratuitas para convertir y comprimir

- **[Squoosh](https://squoosh.app/)** — Convierte y comprime en el navegador, sin instalar nada.
- **[TinyPNG](https://tinypng.com/)** — Reduce el peso de PNG y JPG.
- **[CloudConvert](https://cloudconvert.com/)** — Conversión entre formatos en línea.

---

> **Importante:** Antes de publicar cualquier fotografía, asegúrate de contar con la **autorización escrita** de las personas que aparecen en ella. Consulta el archivo `REVISION-ANTES-DE-PUBLICAR.md` para más detalles.
