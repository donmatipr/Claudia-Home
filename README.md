# Casa de Reposo Claudia Lastra — Sitio Web

Sitio web profesional para **Casa de Reposo Claudia Lastra**, con sedes en Macul y Ñuñoa, Santiago.

---

## 🚀 Ejecutar el sitio en tu computador

### Requisitos previos

- **Node.js** instalado (versión 18 o superior). Descárgalo en [nodejs.org](https://nodejs.org).

### Primera vez (instalar dependencias)

1. Abre una terminal en la carpeta del proyecto (en VS Code: Terminal → New Terminal).
2. Ejecuta:

```bash
npm install
```

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

El sitio abrirá en **http://localhost:3000**

### Alternativa: sin instalar nada (Python)

Si tienes Python instalado:

```bash
python -m http.server 8000
```

Luego abre **http://localhost:8000** en tu navegador.

### Alternativa: Live Server en VS Code

1. Instala la extensión **"Live Server"** en VS Code.
2. Haz clic derecho en `index.html` → **"Open with Live Server"**.
3. El sitio abrirá en `http://localhost:5500`.

---

## 📁 Estructura de archivos

```
casa-de-reposo/
├── index.html               ← Página principal (metadatos y SEO)
├── privacidad.html          ← Política de privacidad
├── 404.html                 ← Página de error
├── main.js                  ← Código que arma la página  ⭐ algunos textos
├── bundle.js                ← Compilado de main.js (NO editar a mano)
├── data/
│   └── site.js              ← ⭐ La mayoría de los textos y datos
├── styles/
│   ├── globals.css          ← Colores, tipografía, botones
│   └── components.css       ← Estilos de cada sección
├── images/                  ← Fotografías del sitio
├── scripts/
│   └── build-dist.mjs       ← Arma dist/ para publicar
├── _headers                 ← Cabeceras de seguridad y caché
├── wrangler.jsonc           ← Configuración de Cloudflare
├── robots.txt / sitemap.xml ← Para buscadores
├── manifest.webmanifest     ← Instalación como app en móvil
├── README.md                ← Esta guía
├── FOTOS-A-REEMPLAZAR.md    ← Instrucciones para las fotos
└── REVISION-ANTES-DE-PUBLICAR.md ← Lista de verificación interna
```

---

## ✏️ Cómo editar los textos

### El flujo, siempre el mismo

```bash
# 1. Edita el archivo que corresponda (ver el mapa de abajo)
# 2. Mira el resultado en tu computador:
npm run dev          # abre http://localhost:3000

# 3. Cuando esté bien, publica:
npm run deploy
```

> ⚠️ Los cambios en **`data/site.js` y `main.js` no se ven hasta compilar**.
> `npm run dev` no compila solo. Si editaste alguno de esos dos, corre
> `npm run build` y recarga el navegador.
> Los cambios en **CSS sí se ven al instante** con solo recargar.

---

### 🗺️ Mapa: dónde está cada texto

Hay **dos** archivos con texto. Esta es la división:

#### `data/site.js` — datos que se repiten en varios lugares

| Qué quieres cambiar | Busca este bloque |
|---|---|
| Teléfono y WhatsApp | `telefono`, `telefonoHref`, `whatsappNumero` |
| Instagram y Facebook | `instagramUrl`, `facebookUrl` |
| Direcciones de las sedes | `sedes` |
| Servicios incluidos | `serviciosIncluidos` |
| Servicios coordinados | `serviciosCoordinados` |
| Lista de "vida diaria" | `vidaDiaria` |
| **Sección de visitas 24/7** | `visitas` |
| Los 3 pasos del proceso | `pasos` |
| Preguntas frecuentes | `faq` |
| Pies de foto de la galería | `galeria` |
| Testimonios | `testimonios` |

#### `main.js` — textos que aparecen una sola vez

Estos están escritos directamente en el código, dentro de la función que
arma cada sección. Búscalos con `Ctrl+F` por el texto actual.

| Qué quieres cambiar | Función en `main.js` |
|---|---|
| Titular grande del inicio | `buildHero()` |
| Texto bajo el titular y botones | `buildHero()` |
| Los 4 datos de la franja verde | `buildTrustBelt()` |
| "Sabemos que elegir una residencia…" | `buildForFamilies()` |
| Títulos de la sección de cuidados | `buildServices()` |
| Títulos de "vida en la residencia" | `buildDailyLife()` |
| Frase grande "Aquí nadie pasa el día solo" | `buildTagline()` |
| Títulos de la galería | `buildGallery()` |
| Títulos de sedes y proceso | `buildLocations()`, `buildProcess()` |
| Formulario de contacto | `buildContact()` |
| Bloque final "Conocer el lugar…" | `buildFinalCTA()` |
| Pie de página y descargo legal | `buildFooter()` |

#### `index.html` — lo que ve Google y WhatsApp

El texto que aparece en los resultados de búsqueda y al compartir el enlace:
`<title>`, `<meta name="description">` y las etiquetas `og:`.

---

### Ejemplos concretos

**Cambiar el teléfono** → `data/site.js`, arriba del todo. Ojo, son tres campos:

```javascript
telefono: '+56 9 9901 0921',        // el que se muestra
telefonoHref: 'tel:+56999010921',   // el que se marca al tocar
whatsappNumero: '56999010921',      // sin + ni espacios
```

**Cambiar la sección de visitas 24/7** → `data/site.js`, bloque `visitas`:

```javascript
visitas: {
  etiqueta: 'Puertas abiertas',
  destacado: '24/7',                 // el número grande
  titulo: 'Puedes visitar a tu familiar a cualquier hora…',
  descripcion: 'No trabajamos con horarios…',
  cierre: 'Lo hacemos por una razón simple…',
  puntos: [
    { icono: '🌅', texto: 'Mañana, tarde o noche' },
    // agrega o quita puntos libremente
  ],
  ctaTexto: 'Consultar por una visita',
},
```

**Cambiar el titular del inicio** → `main.js`, función `buildHero()`.
Los `<br>` fuerzan los saltos de línea en computador; en celular se ignoran:

```html
<h1 id="hero-title" class="hero__title">
  Cuidado las 24 horas<br>
  para tu madre o tu padre,<br>
  <em>donde se sienta en casa</em>
</h1>
```

**Agregar una pregunta frecuente** → `data/site.js`, bloque `faq`:

```javascript
{
  pregunta: '¿Tu nueva pregunta?',
  respuesta: 'La respuesta que quieres dar.',
},
```

**Cambiar colores** → `styles/globals.css`, al inicio:

```css
:root {
  --color-green-forest: #254A36;  /* Botones y fondos oscuros */
  --color-green-pastel: #A9C5AD;  /* Verde claro decorativo */
  --color-ivory:        #FAF8F1;  /* Fondo principal */
  --color-terracotta:   #C9896B;  /* Acentos */
}
```

---

### Reglas para no romper nada

1. **No edites `bundle.js`.** Se regenera solo y perderías los cambios.
2. **Respeta comillas y comas.** En `data/site.js` cada línea termina en coma.
   Si borras una comilla, la página queda en blanco.
3. **Si la página queda en blanco**, abre la consola del navegador con `F12`,
   pestaña *Console*. El error te dice la línea exacta.
4. **Los acentos y la ñ funcionan** sin problema. Guarda siempre en UTF-8.
5. **Prueba antes de publicar.** `npm run dev` primero, `npm run deploy` después.

---

## 💬 Cómo agregar testimonios

Los testimonios están **ocultos por defecto**. Para publicar un testimonio real y autorizado:

1. Abre `data/site.js`.
2. Encuentra la sección `testimonios`.
3. Descomenta y completa el ejemplo:

```javascript
testimonios: [
  {
    nombre: 'María P.',
    relacion: 'Hija de residente, Sede Macul',
    texto: 'El equipo nos dio la tranquilidad que necesitábamos.',
  },
],
```

4. Ejecuta `npm run build`.

> **Importante:** Solo publica testimonios con autorización expresa y escrita.

---

## 📷 Cómo reemplazar imágenes

Lee el archivo **`FOTOS-A-REEMPLAZAR.md`** para instrucciones detalladas.

**Resumen rápido:**

1. Convierte tu foto a formato `.webp` en [Squoosh](https://squoosh.app/).
2. Nómbrala igual al archivo que quieres reemplazar (ej: `sede-macul.webp`).
3. Cópiala en la carpeta `images/`.
4. Las imágenes se muestran directamente sin necesidad de build.

---

## 🏗️ Los comandos del proyecto

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el sitio en http://localhost:3000 para verlo |
| `npm run build` | Convierte `main.js` + `data/site.js` en `bundle.js` |
| `npm run build:site` | Hace el build y arma `dist/` con lo que se publica |
| `npm run deploy` | Build + dist + sube a Cloudflare. **Este es el que publica.** |

En el día a día solo necesitas dos:

```bash
npm run dev      # mientras editas
npm run deploy   # cuando quieras publicar
```

---

## 🐙 Subir cambios a GitHub

### Con GitHub Desktop (recomendado)

1. Abre **GitHub Desktop**.
2. Verás los archivos modificados en la lista.
3. Escribe un mensaje en "Summary" (ej: `Actualizar teléfono de contacto`).
4. Haz clic en **"Commit to main"**.
5. Haz clic en **"Push origin"**.

### Con la terminal

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

---

## 🌐 Publicar en Cloudflare

El sitio está desplegado como **Worker con Static Assets** de Cloudflare.

**URL en vivo:** https://casa-de-reposo.victormatiaspoblete.workers.dev

### Publicar cambios (redeploy)

Un solo comando. Compila `main.js`, arma `dist/` y sube a Cloudflare:

```bash
npm run deploy
```

Eso equivale a:

```bash
npm run build && node scripts/build-dist.mjs && npx wrangler@4.129.0 deploy
```

Requiere estar autenticado una sola vez con `npx wrangler login`.

### Qué se publica y qué no

`scripts/build-dist.mjs` arma la carpeta `dist/` con una **lista de permitidos**:
solo llega a producción lo que está nombrado en ese archivo.

Se publica: `index.html`, `privacidad.html`, `404.html`, `bundle.js`,
`robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `_headers`, `images/`, `styles/`.

**No** se publica el código fuente (`main.js`, `data/`), el sourcemap, ni la
documentación interna — en particular `REVISION-ANTES-DE-PUBLICAR.md`, que es de
uso interno. Si agregas un archivo público nuevo, súmalo a la lista `PUBLICAR`
del script o no se subirá.

### Configuración

`wrangler.jsonc` define el nombre del Worker, la carpeta de assets y el manejo
de 404. `_headers` define cabeceras de seguridad y de caché. Ninguno de los dos
contiene tokens ni secretos.

### Conectar un dominio propio

1. En el panel de Cloudflare: **Workers & Pages → casa-de-reposo → Settings → Domains & Routes**.
2. Agrega el dominio (ej: `casadereposo.cl`). Requiere que el dominio esté en la cuenta.
3. Actualiza `canonicalUrl` en `data/site.js` y las URL de `sitemap.xml`:

```javascript
seo: {
  canonicalUrl: 'https://casadereposo.cl',
}
```

---

## 📊 Activar analítica (opcional)

### Google Analytics 4

1. Crea una cuenta en [analytics.google.com](https://analytics.google.com).
2. Copia tu ID (comienza con `G-`).
3. Descomenta el bloque de GA4 al final de `index.html`.
4. Reemplaza `G-XXXXXXXXXX` con tu ID.

---

## 🆘 Solución de problemas comunes

| Problema | Solución |
|---------|----------|
| El sitio no carga estilos | Usa `npm run dev` o Live Server en VS Code, no abras `index.html` directamente |
| Una imagen no aparece | Verifica que el nombre en `images/` sea exactamente igual al de `data/site.js` |
| El formulario no abre WhatsApp | Verifica que `whatsappNumero` en `data/site.js` no tenga espacios ni `+` |
| Los cambios de JS no aparecen | Ejecuta `npm run build` después de modificar `main.js` o `data/site.js` |
| Los cambios no aparecen | Recarga con Ctrl+Shift+R (limpia caché) |
| `npm` no se reconoce | Instala Node.js desde [nodejs.org](https://nodejs.org) y reinicia la terminal |

---

## 📬 Datos de contacto del sitio

- **Teléfono:** +56 9 9901 0921
- **WhatsApp:** https://wa.me/56999010921
- **Sede Macul:** Manuel Sánchez 3234, Macul, Santiago
- **Sede Ñuñoa:** Montenegro 688, Ñuñoa, Santiago
- **Instagram:** @casadereposo.cl
