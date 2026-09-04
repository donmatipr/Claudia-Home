/**
 * Arma la carpeta dist/ que se publica en Cloudflare.
 *
 * Es una lista de permitidos a propósito: solo llega a producción lo que
 * está nombrado aquí. Así ningún archivo interno (por ejemplo
 * REVISION-ANTES-DE-PUBLICAR.md) puede terminar publicado por descuido.
 *
 * Sin dependencias externas: solo módulos nativos de Node.
 */

import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'dist');

// Archivos y carpetas que sí se publican
const PUBLICAR = [
  'index.html',
  'privacidad.html',
  '404.html',
  'bundle.js',
  'robots.txt',
  'sitemap.xml',
  'manifest.webmanifest',
  '_headers',
  'images',
  'styles',
];

const existe = async ruta => {
  try {
    await stat(ruta);
    return true;
  } catch {
    return false;
  }
};

await rm(destino, { recursive: true, force: true });
await mkdir(destino, { recursive: true });

const faltantes = [];
for (const entrada of PUBLICAR) {
  const origen = join(raiz, entrada);
  if (!(await existe(origen))) {
    faltantes.push(entrada);
    continue;
  }
  await cp(origen, join(destino, entrada), { recursive: true });
}

if (faltantes.length) {
  console.error(`\n✖ Faltan archivos que deberían publicarse: ${faltantes.join(', ')}`);
  process.exit(1);
}

// ── Huella de contenido en los assets ──────────────────────
// bundle.js y los CSS se sirven con caché larga. Si el nombre no cambia,
// el navegador se queda con la versión vieja durante horas aunque el
// deploy haya subido una nueva. Se agrega a cada referencia un ?v=
// derivado del contenido: al cambiar el archivo cambia la URL, y el
// navegador la vuelve a pedir solo.
const HTML = ['index.html', '404.html', 'privacidad.html'];
const ASSETS = ['bundle.js', 'styles/globals.css', 'styles/components.css'];

const huellas = {};
for (const asset of ASSETS) {
  const contenido = await readFile(join(destino, asset));
  huellas[asset] = createHash('sha256').update(contenido).digest('hex').slice(0, 8);
}

for (const archivo of HTML) {
  const ruta = join(destino, archivo);
  let html = await readFile(ruta, 'utf8');
  // Sello de build: permite verificar qué versión está sirviéndose
  const sello = '<!-- build ' + new Date().toISOString() + ' -->';
  html = html.replace('</head>', sello + '</head>');
  for (const [asset, hash] of Object.entries(huellas)) {
    // Cubre las referencias con y sin barra inicial
    html = html
      .replaceAll('"/' + asset + '"', '"/' + asset + '?v=' + hash + '"')
      .replaceAll('"' + asset + '"', '"' + asset + '?v=' + hash + '"');
  }
  await writeFile(ruta, html);
}

console.log(`✔ dist/ armado con ${PUBLICAR.length} entradas`);
console.log('  huellas: ' + Object.entries(huellas).map(([a, h]) => a.split('/').pop() + '=' + h).join('  '));
