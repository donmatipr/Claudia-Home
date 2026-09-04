/**
 * Arma la carpeta dist/ que se publica en Cloudflare.
 *
 * Es una lista de permitidos a propósito: solo llega a producción lo que
 * está nombrado aquí. Así ningún archivo interno (por ejemplo
 * REVISION-ANTES-DE-PUBLICAR.md) puede terminar publicado por descuido.
 *
 * Sin dependencias externas: solo módulos nativos de Node.
 */

import { cp, mkdir, rm, stat } from 'node:fs/promises';
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

console.log(`✔ dist/ armado con ${PUBLICAR.length} entradas`);
