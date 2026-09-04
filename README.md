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
├── index.html               ← Página principal
├── privacidad.html          ← Política de privacidad
├── bundle.js                ← Script empaquetado para producción (NO editar)
├── main.js                  ← Código fuente de la lógica de la página
├── robots.txt               ← Para buscadores
├── sitemap.xml              ← Para buscadores
├── manifest.webmanifest     ← Para móviles (instalación como app)
├── package.json             ← Configuración npm (scripts de desarrollo)
├── data/
│   └── site.js              ← ⭐ EDITA AQUÍ textos, datos y configuración
├── styles/
│   ├── globals.css          ← Variables de color y tipografía
│   └── components.css       ← Estilos de cada sección
├── images/                  ← Fotografías del sitio
│   ├── hero-residencia.webp
│   ├── sede-macul.webp
│   ├── sede-nunoa.webp
│   └── ...
├── README.md                ← Esta guía
├── FOTOS-A-REEMPLAZAR.md    ← Instrucciones para las fotos
└── REVISION-ANTES-DE-PUBLICAR.md ← Lista de verificación
```

---

## ✏️ Cómo modificar textos

### Cambiar textos, teléfono o direcciones

Abre el archivo **`data/site.js`** con cualquier editor de texto (Bloc de notas, VS Code, etc.).

Ahí encontrarás todas las variables organizadas:

```javascript
// Cambiar el teléfono:
telefono: '+56 9 9901 0921',
telefonoHref: 'tel:+56999010921',
whatsappNumero: '56999010921',

// Cambiar la dirección de Macul:
sedes: [
  { direccion: 'Manuel Sánchez 3234, Macul', ... },
  { direccion: 'Montenegro 688, Ñuñoa', ... },
]
```

Después de editar `data/site.js`, ejecuta el build para aplicar los cambios:

```bash
npm run build
```

> ⚠️ **Importante:** El archivo `bundle.js` es el que usa `index.html`. Siempre ejecuta `npm run build` después de modificar `main.js` o `data/site.js`.

### Cambiar colores

Abre **`styles/globals.css`** y modifica las variables al inicio del archivo:

```css
:root {
  --color-green-forest: #254A36;  /* Color principal de botones */
  --color-green-pastel: #A9C5AD;  /* Verde pastel decorativo */
  --color-ivory: #FAF8F1;         /* Fondo principal */
  --color-terracotta: #C9896B;    /* Acentos y dividers */
}
```

Los cambios de CSS se aplican de inmediato sin necesidad de build.

### Agregar o cambiar servicios

En `data/site.js` encontrarás `serviciosIncluidos` y `serviciosCoordinados`. Agrega o modifica los objetos:

```javascript
{
  icono: '🏠',
  titulo: 'Nombre del servicio',
  descripcion: 'Descripción del servicio.'
}
```

### Agregar preguntas frecuentes

En `data/site.js`, en la sección `faq`, agrega:

```javascript
{
  pregunta: '¿Tu nueva pregunta?',
  respuesta: 'La respuesta que quieres dar.'
}
```

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

## 🔧 Cambiar el número de teléfono y las direcciones

Todo está en **`data/site.js`**:

```javascript
// Teléfono (mantener el mismo formato en ambos lugares):
telefono: '+56 9 9901 0921',        // Texto visible en la página
telefonoHref: 'tel:+56999010921',   // Enlace para llamadas
whatsappNumero: '56999010921',      // Número para WhatsApp (sin +)

// Direcciones:
sedes: [
  {
    direccion: 'Manuel Sánchez 3234, Macul',
    mapsUrl: 'https://maps.google.com/maps?q=...',  // URL de Google Maps
  },
  {
    direccion: 'Montenegro 688, Ñuñoa',
    mapsUrl: 'https://maps.google.com/maps?q=...',
  },
],
```

Después de cambiar, ejecuta `npm run build`.

---

## 🏗️ Compilar el proyecto (build)

El build convierte `main.js` + `data/site.js` en el archivo `bundle.js` que usa la página:

```bash
npm run build
```

Resultado exitoso:
```
  bundle.js  XX.X kb
```

> El build es necesario cada vez que modifiques `main.js` o `data/site.js`.

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
