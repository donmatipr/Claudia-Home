/**
 * Casa de Reposo Claudia Lastra — main.js
 * Todos los datos del negocio están en data/site.js
 * Este archivo importa los datos y construye la página.
 */

import { SITE } from './data/site.js';

// ─── Analítica ────────────────────────────────────────────────
function trackEvent(name, params = {}) {
  try {
    if (typeof gtag === 'function') {
      gtag('event', name, params);
    }
  } catch (_) { /* silencioso si no está configurado */ }
}

// ─── WhatsApp helpers ──────────────────────────────────────────
function waLink(mensaje) {
  return `https://wa.me/${SITE.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

const WA_MSG_GENERAL =
  'Hola, me comunico desde el sitio web de Casa de Reposo Claudia Lastra. Me gustaría recibir información y coordinar una visita.';

const WA_MSG_VISITA =
  'Hola, vengo desde el sitio web de Casa de Reposo Claudia Lastra. Me gustaría *agendar una visita* para conocer la residencia. ¿Cuándo sería posible?';

// ─── SVG Icons ────────────────────────────────────────────────
const ICONS = {
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" focusable="false"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.6c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.3l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" focusable="false"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6.1 6.1l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true" focusable="false"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>`,
};

// ─── Iconografía (Phosphor, trazos incrustados) ───────────────
// Se usan SVG en vez de emoji: los emoji cambian de forma según el
// sistema operativo y no heredan el color de la marca.
const ICO = {
  actividades: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M217,34.8a15.94,15.94,0,0,0-14.82-1.71C188.15,38.55,159.82,47.71,128,47.71S67.84,38.55,53.79,33.09A16,16,0,0,0,32,48v55.77c0,35.84,9.65,69.65,27.18,95.18,18.16,26.46,42.6,41,68.82,41s50.66-14.57,68.82-41C214.35,173.44,224,139.63,224,103.79V48A16,16,0,0,0,217,34.8Zm-9,69c0,32.64-8.66,63.23-24.37,86.13C168.54,211.9,148.79,224,128,224s-40.54-12.1-55.63-34.08C56.66,167,48,136.43,48,103.79V48c15.11,5.87,45.58,15.71,80,15.71S192.9,53.87,208,48v55.81Zm-18,18.87A8,8,0,1,1,178,133.33c-2.68-3-8.85-5.33-14-5.33s-11.36,2.34-14,5.33A8,8,0,1,1,138,122.66c5.71-6.38,16.14-10.66,26-10.66S184.25,116.28,190,122.66ZM92,128c-5.19,0-11.36,2.34-14,5.33A8,8,0,1,1,66,122.66C71.75,116.28,82.18,112,92,112s20.25,4.28,26,10.66A8,8,0,1,1,106,133.33C103.36,130.34,97.19,128,92,128Zm76.45,45.19a52.9,52.9,0,0,1-80.9,0A8,8,0,1,1,99.72,162.8a36.89,36.89,0,0,0,56.56,0,8,8,0,0,1,12.17,10.39Z"/></svg>`,
  amanecer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M240,152H199.55a73.54,73.54,0,0,0,.45-8,72,72,0,0,0-144,0,73.54,73.54,0,0,0,.45,8H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM72,144a56,56,0,1,1,111.41,8H72.59A56.13,56.13,0,0,1,72,144Zm144,56a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H208A8,8,0,0,1,216,200ZM72.84,43.58a8,8,0,0,1,14.32-7.16l8,16a8,8,0,0,1-14.32,7.16Zm-56,48.84a8,8,0,0,1,10.74-3.57l16,8a8,8,0,0,1-7.16,14.31l-16-8A8,8,0,0,1,16.84,92.42Zm192,15.16a8,8,0,0,1,3.58-10.73l16-8a8,8,0,1,1,7.16,14.31l-16,8a8,8,0,0,1-10.74-3.58Zm-48-55.16,8-16a8,8,0,0,1,14.32,7.16l-8,16a8,8,0,1,1-14.32-7.16Z"/></svg>`,
  arte: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"/></svg>`,
  botiquin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z"/></svg>`,
  calendario: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"/></svg>`,
  camara: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"/></svg>`,
  candado: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M208,80H96V56a32,32,0,0,1,32-32c15.37,0,29.2,11,32.16,25.59a8,8,0,0,0,15.68-3.18C171.32,24.15,151.2,8,128,8A48.05,48.05,0,0,0,80,56V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm0,128H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"/></svg>`,
  casa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/></svg>`,
  comida: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M72,88V40a8,8,0,0,1,16,0V88a8,8,0,0,1-16,0ZM216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40ZM200,53.9c-32.17,24.57-38.47,84.42-39.7,106.1H200ZM119.89,38.69a8,8,0,1,0-15.78,2.63L112,88.63a32,32,0,0,1-64,0l7.88-47.31a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z"/></svg>`,
  conversacion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"/></svg>`,
  descanso: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"/></svg>`,
  enfermeria: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M220,160a12,12,0,1,1-12-12A12,12,0,0,1,220,160Zm-4.55,39.29A48.08,48.08,0,0,1,168,240H144a48.05,48.05,0,0,1-48-48V151.49A64,64,0,0,1,40,88V40a8,8,0,0,1,8-8H72a8,8,0,0,1,0,16H56V88a48,48,0,0,0,48.64,48c26.11-.34,47.36-22.25,47.36-48.83V48H136a8,8,0,0,1,0-16h24a8,8,0,0,1,8,8V87.17c0,32.84-24.53,60.29-56,64.31V192a32,32,0,0,0,32,32h24a32.06,32.06,0,0,0,31.22-25,40,40,0,1,1,16.23.27ZM232,160a24,24,0,1,0-24,24A24,24,0,0,0,232,160Z"/></svg>`,
  familia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"/></svg>`,
  ficha: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"/></svg>`,
  hoja: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z"/></svg>`,
  hospital: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M248,208h-8V128a16,16,0,0,0-16-16H168V48a16,16,0,0,0-16-16H56A16,16,0,0,0,40,48V208H32a8,8,0,0,0,0,16H248a8,8,0,0,0,0-16Zm-24-80v80H168V128ZM56,48h96V208H136V160a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8v48H56Zm64,160H88V168h32ZM72,96a8,8,0,0,1,8-8H96V72a8,8,0,0,1,16,0V88h16a8,8,0,0,1,0,16H112v16a8,8,0,0,1-16,0V104H80A8,8,0,0,1,72,96Z"/></svg>`,
  movimiento: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M152,88a32,32,0,1,0-32-32A32,32,0,0,0,152,88Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,152,40Zm67.31,100.68c-.61.28-7.49,3.28-19.67,3.28-13.85,0-34.55-3.88-60.69-20a169.31,169.31,0,0,1-15.41,32.34,104.29,104.29,0,0,1,31.31,15.81C173.92,186.65,184,207.35,184,232a8,8,0,0,1-16,0c0-41.7-34.69-56.71-54.14-61.85-.55.7-1.12,1.41-1.69,2.1-19.64,23.8-44.25,36.18-71.63,36.18A92.29,92.29,0,0,1,31.2,208,8,8,0,0,1,32.8,192c25.92,2.58,48.47-7.49,67-30,12.49-15.14,21-33.61,25.25-47C86.13,92.35,61.27,111.63,61,111.84A8,8,0,1,1,51,99.36c1.5-1.2,37.22-29,89.51,6.57,45.47,30.91,71.93,20.31,72.18,20.19a8,8,0,1,1,6.63,14.56Z"/></svg>`,
  nutricion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M232,64H203.31l26.35-26.34a8,8,0,0,0-11.32-11.32L192,52.69V24a8,8,0,0,0-16,0V56.57a64,64,0,0,0-77.2,10.12l0,0,0,0,0,0c-40.1,39.39-70.25,133.08-73.19,142.45a16,16,0,0,0,21.26,21.26c9.37-2.94,103.18-33.13,142.47-73.21A64,64,0,0,0,199.43,80H232a8,8,0,0,0,0-16Zm-54.12,82c-8.94,9.12-21.25,17.8-34.85,25.73l-25.38-25.39a8,8,0,0,0-11.32,11.32l22.09,22.09c-40.87,21.19-86.32,35.42-87,35.63A7.93,7.93,0,0,0,40,216a7.93,7.93,0,0,0,.59-1.41c.29-.93,28-89.58,64-130.67l33.77,33.77a8,8,0,0,0,11.32-11.32L116.18,72.88A48,48,0,0,1,177.88,146Z"/></svg>`,
  reloj: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/></svg>`,
  ubicacion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"/></svg>`,
};

// ─── Imagen con fallback ──────────────────────────────────────
function imgOrPlaceholder(src, alt, caption = '') {
  return `
    <img 
      src="${src}" 
      alt="${alt}" 
      loading="lazy"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
      class="gallery__img"
    >
    <div class="gallery__placeholder" style="display:none" aria-hidden="true">
      <span class="gallery__placeholder-icon">${ICO.casa}</span>
      <span>${caption || alt}</span>
    </div>`;
}

// ─── Construir HTML de la página ──────────────────────────────
function buildPage() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${buildHeader()}
    <main id="main-content">
      ${buildHero()}
      ${buildTrustBelt()}
      ${buildForFamilies()}
      ${buildServices()}
      ${buildDailyLife()}
      ${buildTagline()}
      ${buildGallery()}
      ${buildVisitas()}
      ${buildLocations()}
      ${buildProcess()}
      ${buildTestimonials()}
      ${buildFAQ()}
      ${buildContact()}
      ${buildFinalCTA()}
    </main>
    ${buildFooter()}
    ${buildWAFloat()}
    ${buildMobileBar()}
  `;
}

// ─── HEADER ───────────────────────────────────────────────────
function buildHeader() {
  const navItems = [
    ['#inicio', 'Inicio'],
    ['#cuidados', 'Cuidados'],
    ['#vida-diaria', 'Vida diaria'],
    ['#sedes', 'Sedes'],
    ['#preguntas', 'Preguntas'],
    ['#contacto', 'Contacto'],
  ];
  return `
<header class="header" id="header" role="banner">
  <div class="container">
    <div class="header__inner">
      <a href="#inicio" class="header__logo" aria-label="Casa de Reposo Claudia Lastra — Inicio">
        <span class="header__logo-main">Casa de Reposo</span>
        <span class="header__logo-sub">Claudia Lastra</span>
      </a>
      <nav class="header__nav" id="main-nav" aria-label="Navegación principal">
        <ul class="nav__list" role="list">
          ${navItems.map(([href, label]) => `
            <li>
              <a href="${href}" class="nav__link">${label}</a>
            </li>`).join('')}
        </ul>
      </nav>
      <div class="header__actions">
        <a
          href="${SITE.instagramUrl}"
          class="header__social"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram ${SITE.instagram}"
          data-track="instagram_click"
        >${ICONS.instagram}</a>
        <a
          href="${SITE.facebookUrl}"
          class="header__social"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook de Casa de Reposo Claudia Lastra"
          data-track="facebook_click"
        >${ICONS.facebook}</a>
        <a
          href="${waLink(WA_MSG_GENERAL)}"
          class="header__wa-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar por WhatsApp"
          data-track="whatsapp_click"
        >${ICONS.whatsapp}</a>
        <a 
          href="#contacto"
          class="btn btn-primary btn-sm"
          data-track="schedule_visit_click"
        >${ICONS.calendar} Agendar visita</a>
      </div>
      <button 
        class="hamburger"
        id="hamburger"
        aria-label="Abrir menú de navegación"
        aria-expanded="false"
        aria-controls="main-nav"
      >
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
      </button>
    </div>
  </div>
</header>`;
}

// ─── HERO ─────────────────────────────────────────────────────
function buildHero() {
  return `
<section class="hero" id="inicio" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true">
    <img
      src="images/hero-residencia.webp"
      alt=""
      class="hero__bg-img"
      onerror="this.style.display='none'"
    >
    <div class="hero__bg-overlay"></div>
  </div>
  <div class="container">
    <div class="hero__content fade-in">
      <div class="hero__eyebrow" aria-hidden="true">
        ${ICO.hoja} Sedes en Macul y Ñuñoa, Santiago
      </div>
      <h1 id="hero-title" class="hero__title">
        Cuidado las 24 horas<br>
        para tu madre o tu padre,<br>
        <em>donde se sienta en casa</em>
      </h1>
      <p class="hero__subtitle">
        Residencia para personas mayores en Macul y Ñuñoa. Cuidadoras presentes de día y de noche, cuatro comidas diarias y ocho horas semanales de kinesiología y terapia ocupacional.
      </p>
      <div class="hero__actions">
        <a
          href="${waLink(WA_MSG_GENERAL)}"
          class="btn btn-whatsapp btn-lg"
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
        >${ICONS.whatsapp} Escribir por WhatsApp</a>
        <a
          href="#contacto"
          class="btn btn-outline-white btn-lg"
          data-track="schedule_visit_click"
        >${ICONS.calendar} Agendar una visita</a>
      </div>
      <p class="hero__reassurance">
        Conocer la residencia no tiene costo ni compromiso.
      </p>
      <div class="hero__trust" aria-label="Ubicaciones">
        <span class="hero__trust-dot"></span>
        Sede Macul — Manuel Sánchez 3234
        <span class="hero__trust-dot"></span>
        Sede Ñuñoa — Montenegro 688
      </div>
    </div>
  </div>
</section>`;
}

// ─── TRUST BELT ───────────────────────────────────────────────
function buildTrustBelt() {
  const items = [
    { icon: ICO.reloj, value: '24 horas', label: 'con cuidadoras presentes, todos los días del año' },
    { icon: ICO.comida, value: '4 comidas', label: 'diarias, con nutricionista una vez al mes' },
    { icon: ICO.movimiento, value: '8 horas', label: 'semanales de kinesiología y terapia ocupacional' },
    { icon: ICO.ubicacion, value: '2 sedes', label: 'en Macul y Ñuñoa, Santiago' },
  ];
  return `
<section class="trust-belt" aria-label="Datos destacados de la residencia">
  <div class="container">
    <div class="trust-belt__grid" role="list">
      ${items.map(i => `
        <div class="trust-item" role="listitem">
          <span class="trust-item__icon" aria-hidden="true">${i.icon}</span>
          <span class="trust-item__value">${i.value}</span>
          <span class="trust-item__label">${i.label}</span>
        </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── PARA LAS FAMILIAS ────────────────────────────────────────
function buildForFamilies() {
  const features = [
    { icon: ICO.conversacion, text: 'Te escuchamos con atención, sin presionarte ni apresurarte.' },
    { icon: ICO.ficha, text: 'Te explicamos con transparencia los servicios y cómo funciona la vida diaria.' },
    { icon: ICO.familia, text: 'Te acompañamos durante todo el proceso de evaluación.' },
    { icon: ICO.casa, text: 'Te invitamos a conocer la sede personalmente antes de decidir.' },
  ];
  return `
<section class="section for-families section--white" id="para-familias" aria-labelledby="families-title">
  <div class="container">
    <div class="for-families__grid">
      <div class="for-families__img-wrap fade-in">
        <img 
          src="images/espacio-comun.webp" 
          alt="Espacio común cálido y acogedor de la residencia"
          class="for-families__img"
          loading="lazy"
          onerror="this.parentElement.innerHTML='&lt;div class=&quot;img-placeholder&quot;&gt;Espacio de la residencia&lt;/div&gt;'"
        >
      </div>
      <div class="for-families__text fade-in">
        <span class="section-label">Para las familias</span>
        <div class="divider"></div>
        <h2 id="families-title" class="section-title">
          Sabemos que elegir una residencia es una decisión importante
        </h2>
        <p class="section-subtitle">
          La familia busca seguridad y bienestar. La persona mayor necesita conservar su dignidad, sus vínculos, sus rutinas y sentir compañía. Nosotros entendemos ambas cosas.
        </p>
        <div class="for-families__features">
          ${features.map(f => `
            <div class="feature-item">
              <div class="feature-item__icon" aria-hidden="true">${f.icon}</div>
              <p class="feature-item__text">${f.text}</p>
            </div>`).join('')}
        </div>
        <a 
          href="${waLink('Hola, me comunico desde el sitio web de Casa de Reposo Claudia Lastra. Me gustaría conversar sobre las necesidades de mi familiar.')}"
          class="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
        >${ICONS.whatsapp} Conversemos sobre tu familiar</a>
      </div>
    </div>
  </div>
</section>`;
}

// ─── SERVICIOS ────────────────────────────────────────────────
function buildServices() {
  const tabsHTML = `
    <div class="services__tabs" role="tablist" aria-label="Tipo de servicios">
      <button class="services__tab is-active" role="tab" aria-selected="true" aria-controls="panel-incluidos" id="tab-incluidos">
        ${ICO.check} Incluidos regularmente
      </button>
      <button class="services__tab" role="tab" aria-selected="false" aria-controls="panel-coordinados" id="tab-coordinados">
        ${ICO.ficha} Según necesidad o coordinación
      </button>
    </div>`;

  const panelIncluidos = `
    <div id="panel-incluidos" class="services__panel is-active" role="tabpanel" aria-labelledby="tab-incluidos">
      <div class="services__grid">
        ${SITE.serviciosIncluidos.map(s => `
          <div class="service-card fade-in">
            <div class="service-card__icon" aria-hidden="true">${ICO[s.icono] || ''}</div>
            <h3 class="service-card__title">${s.titulo}</h3>
            <p class="service-card__text">${s.descripcion}</p>
          </div>`).join('')}
      </div>
    </div>`;

  const panelCoordinados = `
    <div id="panel-coordinados" class="services__panel" role="tabpanel" aria-labelledby="tab-coordinados" hidden>
      <div class="services__coord-grid">
        ${SITE.serviciosCoordinados.map(s => `
          <div class="service-card fade-in">
            <div class="service-card__icon" aria-hidden="true">${ICO[s.icono] || ''}</div>
            <h3 class="service-card__title">${s.titulo}</h3>
            <p class="service-card__text">${s.descripcion}</p>
          </div>`).join('')}
      </div>
      <p class="services__note">
        <strong>Nota:</strong> Los apoyos y requerimientos particulares se revisan con cada familia antes del ingreso. Escríbenos para conversar sobre las necesidades específicas de tu familiar.
      </p>
    </div>`;

  return `
<section class="section services section--ivory" id="cuidados" aria-labelledby="services-title">
  <div class="container">
    <div class="section-header section-header--center">
      <span class="section-label">Cuidado y acompañamiento</span>
      <div class="divider divider--center"></div>
      <h2 id="services-title" class="section-title">Lo que ofrecemos cada día</h2>
      <p class="section-subtitle">
        Un equipo dedicado que acompaña a cada residente con respeto, calidez y atención a los detalles que hacen sentir un hogar de verdad.
      </p>
    </div>
    ${tabsHTML}
    ${panelIncluidos}
    ${panelCoordinados}
  </div>
</section>`;
}

// ─── VIDA DIARIA ──────────────────────────────────────────────
function buildDailyLife() {
  return `
<section class="section daily-life section--white" id="vida-diaria" aria-labelledby="daily-title">
  <div class="container">
    <div class="section-header section-header--center">
      <span class="section-label">Vida en la residencia</span>
      <div class="divider divider--center"></div>
      <h2 id="daily-title" class="section-title">
        Una rutina con compañía, movimiento y momentos compartidos
      </h2>
      <p class="section-subtitle">
        Cada día en la residencia está pensado para que quienes viven aquí se sientan acompañados, activos y en un ambiente que se siente como hogar.
      </p>
    </div>
    <div class="daily-life__grid">
      ${SITE.vidaDiaria.map(item => `
        <div class="daily-card fade-in">
          <span class="daily-card__icon" aria-hidden="true">${ICO[item.icono] || ''}</span>
          <p class="daily-card__text">${item.texto}</p>
        </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── TAGLINE ──────────────────────────────────────────────────
// Cada palabra se enciende por separado al entrar en pantalla.
function buildTagline() {
  const lineas = [
    'Aquí nadie pasa el día solo.',
    'Alguien conversa, alguien acompaña,',
    'y de noche siempre hay alguien atento.',
  ];
  const html = lineas
    .map(linea => `<span class="tagline__line">${linea
      .split(' ')
      .map(palabra => `<span class="tagline__word">${palabra}</span>`)
      .join(' ')}</span>`)
    .join('');
  return `
<section class="tagline" id="tagline" aria-labelledby="tagline-text">
  <div class="container">
    <p class="tagline__text" id="tagline-text">${html}</p>
  </div>
</section>`;
}

// ─── GALERÍA ──────────────────────────────────────────────────
function buildGallery() {
  return `
<section class="section gallery section--beige" id="galeria" aria-labelledby="gallery-title">
  <div class="container">
    <div class="section-header section-header--center">
      <span class="section-label">Conoce la residencia</span>
      <div class="divider divider--center"></div>
      <h2 id="gallery-title" class="section-title">Un vistazo al hogar</h2>
      <p class="section-subtitle">
        Fotografías reales de nuestros espacios. Cuando puedas, te invitamos a visitarnos en persona.
      </p>
    </div>
    <div class="gallery__grid" role="list">
      ${SITE.galeria.map((item, i) => `
        <div class="gallery__item fade-in" role="listitem">
          <img 
            src="${item.src}"
            alt="${item.alt}"
            loading="${i === 0 ? 'eager' : 'lazy'}"
            class="gallery__img"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
          >
          <div class="gallery__placeholder" style="display:none" aria-hidden="true">
            <span class="gallery__placeholder-icon">${ICO.casa}</span>
            <span>${item.caption}</span>
          </div>
          <div class="gallery__caption" aria-hidden="true">${item.caption}</div>
        </div>`).join('')}
    </div>
    <p class="gallery__nota">
      ${ICO.camara} Las fotografías corresponden a los espacios reales de la residencia.
    </p>
  </div>
</section>`;
}

// ─── VISITAS 24/7 ─────────────────────────────────────────────
function buildVisitas() {
  const v = SITE.visitas;
  if (!v) return '';
  return `
<section class="visitas" id="visitas" aria-labelledby="visitas-title">
  <div class="container">
    <div class="visitas__grid">
      <div class="visitas__aside fade-in">
        <span class="visitas__badge" aria-hidden="true">${v.etiqueta}</span>
        <p class="visitas__destacado" aria-hidden="true">${v.destacado}</p>
        <ul class="visitas__puntos" role="list">
          ${v.puntos.map(p => `
            <li class="visitas__punto">
              <span class="visitas__punto-icono" aria-hidden="true">${ICO[p.icono] || ''}</span>
              ${p.texto}
            </li>`).join('')}
        </ul>
      </div>
      <div class="visitas__texto fade-in">
        <h2 id="visitas-title" class="visitas__title">${v.titulo}</h2>
        <p class="visitas__desc">${v.descripcion}</p>
        <p class="visitas__cierre">${v.cierre}</p>
        <a
          href="${waLink(v.whatsappMensaje)}"
          class="btn btn-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
        >${ICONS.whatsapp} ${v.ctaTexto}</a>
      </div>
    </div>
  </div>
</section>`;
}

// ─── SEDES ────────────────────────────────────────────────────
function buildLocations() {
  return `
<section class="section locations section--ivory" id="sedes" aria-labelledby="locations-title">
  <div class="container">
    <div class="section-header section-header--center">
      <span class="section-label">Nuestras sedes</span>
      <div class="divider divider--center"></div>
      <h2 id="locations-title" class="section-title">Dos hogares en Santiago</h2>
      <p class="section-subtitle">
        Elige la sede que sea más conveniente para tu familia. Ambas comparten el mismo estándar de cuidado y acompañamiento.
      </p>
    </div>
    <div class="locations__grid">
      ${SITE.sedes.map(sede => `
        <article class="location-card fade-in" aria-label="Sede ${sede.nombre}">
          <div class="location-card__img-wrap">
            <img 
              src="${sede.imagen}"
              alt="Fachada de ${sede.nombre}"
              class="location-card__img"
              loading="lazy"
              onerror="this.parentElement.innerHTML='&lt;div class=&quot;img-placeholder&quot; style=&quot;height:220px&quot;&gt;${sede.nombre}&lt;/div&gt;'"
            >
          </div>
          <div class="location-card__body">
            <div class="location-card__badge">${ICO.ubicacion} ${sede.id === 'macul' ? 'Macul' : 'Ñuñoa'}</div>
            <h3 class="location-card__name">${sede.nombre}</h3>
            <p class="location-card__address">${sede.direccion}</p>
            <p class="location-card__region">${sede.region}</p>
            <div class="location-card__actions">
              <a 
                href="${sede.mapsUrl}"
                class="btn btn-secondary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                aria-label="Cómo llegar a ${sede.nombre}"
              >${ICONS.map} Cómo llegar</a>
              <div class="location-card__actions-row">
                <a 
                  href="${waLink(sede.whatsappMensaje)}"
                  class="btn btn-whatsapp btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  aria-label="Consultar por ${sede.nombre} por WhatsApp"
                >${ICONS.whatsapp} Consultar por esta sede</a>
                <a 
                  href="${waLink(`Hola, me comunico desde el sitio web de Casa de Reposo Claudia Lastra. Me gustaría *agendar una visita* a la ${sede.nombre} (${sede.direccion}). ¿Cuándo sería posible?`)}"
                  class="btn btn-primary btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="schedule_visit_click"
                  aria-label="Agendar visita a ${sede.nombre}"
                >${ICONS.calendar} Agendar visita</a>
              </div>
            </div>
          </div>
        </article>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── PROCESO ──────────────────────────────────────────────────
function buildProcess() {
  return `
<section class="section process" id="proceso" aria-labelledby="process-title">
  <div class="container">
    <div class="section-header section-header--center">
      <span class="section-label" style="color:rgba(169,197,173,0.8)">Así comenzamos</span>
      <div class="divider divider--center"></div>
      <h2 id="process-title" class="section-title" style="color:white">Tres pasos para conocernos</h2>
      <p class="section-subtitle" style="color:rgba(255,255,255,0.7)">
        Sin compromisos, sin presiones. Conversamos, conoces el lugar y decides con tranquilidad.
      </p>
    </div>
    <div class="process__grid">
      ${SITE.pasos.map(paso => `
        <div class="process-step fade-in">
          <div class="process-step__num" aria-hidden="true">${paso.numero}</div>
          <h3 class="process-step__title">${paso.titulo}</h3>
          <p class="process-step__text">${paso.descripcion}</p>
        </div>`).join('')}
    </div>
    <div style="text-align:center;margin-top:48px;">
      <a 
        href="${waLink(WA_MSG_VISITA)}"
        class="btn btn-outline-white btn-lg"
        target="_blank"
        rel="noopener noreferrer"
        data-track="schedule_visit_click"
      >${ICONS.calendar} Comenzar ahora</a>
    </div>
  </div>
</section>`;
}

// ─── TESTIMONIOS ──────────────────────────────────────────────
function buildTestimonials() {
  if (!SITE.testimonios || SITE.testimonios.length === 0) return '';
  return `
<section class="section testimonials" id="testimonios" aria-labelledby="testimonials-title">
  <div class="container">
    <div class="section-header section-header--center">
      <span class="section-label">Lo que dicen las familias</span>
      <div class="divider divider--center"></div>
      <h2 id="testimonials-title" class="section-title">Experiencias reales</h2>
    </div>
    <div class="testimonials__grid">
      ${SITE.testimonios.map(t => `
        <div class="testimonial-card fade-in">
          <div class="testimonial-card__quote" aria-hidden="true">"</div>
          <p class="testimonial-card__text">${t.texto}</p>
          <div>
            <p class="testimonial-card__author">${t.nombre}</p>
            <p class="testimonial-card__role">${t.relacion}</p>
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── FAQ ──────────────────────────────────────────────────────
function buildFAQ() {
  return `
<section class="section faq section--white" id="preguntas" aria-labelledby="faq-title">
  <div class="container">
    <div class="section-header section-header--center">
      <span class="section-label">Preguntas frecuentes</span>
      <div class="divider divider--center"></div>
      <h2 id="faq-title" class="section-title">Resolvemos tus dudas</h2>
      <p class="section-subtitle">
        Si tienes alguna pregunta que no está aquí, escríbenos por WhatsApp con confianza.
      </p>
    </div>
    <div class="faq__list" role="list">
      ${SITE.faq.map((item, i) => `
        <div class="faq-item" role="listitem">
          <button 
            class="faq-item__btn"
            aria-expanded="false"
            aria-controls="faq-answer-${i}"
            id="faq-btn-${i}"
          >
            <span>${item.pregunta}</span>
            <span class="faq-item__icon" aria-hidden="true">+</span>
          </button>
          <div 
            id="faq-answer-${i}" 
            class="faq-item__answer"
            role="region"
            aria-labelledby="faq-btn-${i}"
          >
            <p>${item.respuesta}</p>
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─── FORMULARIO DE CONTACTO ───────────────────────────────────
function buildContact() {
  return `
<section class="section contact section--ivory" id="contacto" aria-labelledby="contact-title">
  <div class="container">
    <div class="contact__grid">
      <div class="contact__info fade-in">
        <span class="section-label">Ponernos en contacto</span>
        <div class="divider"></div>
        <h2 id="contact-title" class="section-title contact__info-title">
          Cuéntanos sobre tu familiar
        </h2>
        <p class="contact__info-text">
          Completa el formulario y te contactaremos a la brevedad. No necesitamos datos clínicos ni información sensible en esta etapa. Solo queremos conocerte y ayudarte.
        </p>
        <div class="contact__direct">
          <a 
            href="${waLink(WA_MSG_GENERAL)}"
            class="contact__direct-item"
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            aria-label="Escribir por WhatsApp al ${SITE.telefono}"
          >
            <span class="contact__direct-icon contact__direct-icon--wa" aria-hidden="true">${ICONS.whatsapp}</span>
            <div>
              <strong>WhatsApp</strong><br>
              <span class="contact__direct-dato">${SITE.telefono}</span>
            </div>
          </a>
          <a 
            href="${SITE.telefonoHref}"
            class="contact__direct-item"
            data-track="call_click"
            aria-label="Llamar al ${SITE.telefono}"
          >
            <span class="contact__direct-icon contact__direct-icon--phone" aria-hidden="true">${ICONS.phone}</span>
            <div>
              <strong>Llamar</strong><br>
              <span class="contact__direct-dato">${SITE.telefono}</span>
            </div>
          </a>
          <a
            href="${SITE.instagramUrl}"
            class="contact__direct-item"
            target="_blank"
            rel="noopener noreferrer"
            data-track="instagram_click"
            aria-label="Visitar Instagram ${SITE.instagram}"
          >
            <span class="contact__direct-icon contact__direct-icon--ig" aria-hidden="true">${ICONS.instagram}</span>
            <div>
              <strong>Instagram</strong><br>
              <span class="contact__direct-dato">${SITE.instagram}</span>
            </div>
          </a>
          <a
            href="${SITE.facebookUrl}"
            class="contact__direct-item"
            target="_blank"
            rel="noopener noreferrer"
            data-track="facebook_click"
            aria-label="Visitar la página de Facebook de Casa de Reposo Claudia Lastra"
          >
            <span class="contact__direct-icon contact__direct-icon--fb" aria-hidden="true">${ICONS.facebook}</span>
            <div>
              <strong>Facebook</strong><br>
              <span class="contact__direct-dato">${SITE.facebook}</span>
            </div>
          </a>
        </div>
      </div>

      <div class="contact-form fade-in" id="form-wrapper">
        <h3 class="contact-form__title">Solicitar información o visita</h3>
        <form id="contact-form" novalidate aria-label="Formulario de contacto">
          <div class="form-group">
            <label for="nombre">Tu nombre <span class="req" aria-label="requerido">*</span></label>
            <input type="text" id="nombre" name="nombre" class="form-control" placeholder="¿Cómo te llamas?" autocomplete="name" required>
            <span class="form-error" id="error-nombre" role="alert">Por favor ingresa tu nombre.</span>
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono de contacto <span class="req" aria-label="requerido">*</span></label>
            <input type="tel" id="telefono" name="telefono" class="form-control" placeholder="+56 9 XXXX XXXX" autocomplete="tel" required>
            <span class="form-error" id="error-telefono" role="alert">Por favor ingresa tu teléfono.</span>
          </div>
          <div class="form-group">
            <label for="relacion">Tu relación con la persona mayor <span class="req" aria-label="requerido">*</span></label>
            <select id="relacion" name="relacion" class="form-control form-select" required>
              <option value="">Selecciona una opción</option>
              <option value="Hijo/a">Hijo/a</option>
              <option value="Nieto/a">Nieto/a</option>
              <option value="Pareja">Pareja</option>
              <option value="Familiar">Otro familiar</option>
              <option value="Otro">Otra relación</option>
            </select>
            <span class="form-error" id="error-relacion" role="alert">Por favor selecciona tu relación.</span>
          </div>
          <div class="form-group">
            <label for="sede">Sede de interés</label>
            <select id="sede" name="sede" class="form-control form-select">
              <option value="Necesito orientación">Necesito orientación</option>
              <option value="Sede Macul (Manuel Sánchez 3234)">Sede Macul</option>
              <option value="Sede Ñuñoa (Montenegro 688)">Sede Ñuñoa</option>
            </select>
          </div>
          <div class="form-group">
            <label for="plazo">Plazo estimado de ingreso</label>
            <select id="plazo" name="plazo" class="form-control form-select">
              <option value="Inmediato">Inmediato (urgente)</option>
              <option value="Durante este mes">Durante este mes</option>
              <option value="Próximos meses" selected>Próximos meses</option>
              <option value="Solo estoy buscando información">Solo busco información</option>
            </select>
          </div>
          <div class="form-group">
            <label for="nivel">Nivel general de apoyo que necesita</label>
            <select id="nivel" name="nivel" class="form-control form-select">
              <option value="No lo sé aún" selected>No lo sé aún</option>
              <option value="Autovalente (independiente)">Autovalente (independiente)</option>
              <option value="Apoyo parcial">Apoyo parcial</option>
              <option value="Apoyo permanente">Apoyo permanente</option>
            </select>
          </div>
          <div class="form-group">
            <label for="mensaje">Comentario adicional (opcional)</label>
            <textarea id="mensaje" name="mensaje" class="form-control form-textarea" placeholder="Cuéntanos algo más si lo deseas..." rows="3"></textarea>
          </div>
          <div class="form-check">
            <input type="checkbox" id="acepto" name="acepto" required>
            <label for="acepto">Acepto ser contactado/a por el equipo de Casa de Reposo Claudia Lastra para recibir información y coordinar una visita. <span class="req" aria-label="requerido">*</span></label>
          </div>
          <span class="form-error" id="error-acepto" role="alert">Debes aceptar para continuar.</span>
          <button type="submit" class="btn btn-primary form-submit btn-lg" id="btn-submit" data-track="visit_form_submit">
            ${ICONS.whatsapp} Enviar consulta por WhatsApp
          </button>
        </form>
      </div>
    </div>
  </div>
</section>`;
}

// ─── CTA FINAL ────────────────────────────────────────────────
function buildFinalCTA() {
  return `
<section class="final-cta" id="cta-final" aria-labelledby="cta-title" style="position:relative;overflow:hidden">
  <div class="container">
    <div class="final-cta__content fade-in">
      <h2 id="cta-title" class="final-cta__title">
        Conocer el lugar es el primer paso<br>
        para <em>decidir con tranquilidad</em>
      </h2>
      <p class="final-cta__subtitle">
        Te invitamos a visitar la residencia sin compromiso. Podrás ver los espacios, conocer al equipo y resolver todas tus dudas.
      </p>
      <div class="final-cta__actions">
        <a 
          href="${waLink(WA_MSG_VISITA)}"
          class="btn btn-primary btn-lg"
          target="_blank"
          rel="noopener noreferrer"
          data-track="schedule_visit_click"
        >${ICONS.calendar} Agendar una visita</a>
        <a 
          href="${waLink(WA_MSG_GENERAL)}"
          class="btn btn-whatsapp btn-lg"
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
        >${ICONS.whatsapp} Hablar por WhatsApp</a>
      </div>
    </div>
  </div>
</section>`;
}

// ─── FOOTER ───────────────────────────────────────────────────
function buildFooter() {
  const year = new Date().getFullYear();
  const navLinks = [
    ['#inicio', 'Inicio'],
    ['#cuidados', 'Cuidados'],
    ['#vida-diaria', 'Vida diaria'],
    ['#sedes', 'Sedes'],
    ['#preguntas', 'Preguntas'],
    ['#contacto', 'Contacto'],
  ];
  return `
<footer class="footer" id="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">
      <!-- Marca -->
      <div>
        <div class="footer__logo">Casa de Reposo Claudia Lastra</div>
        <p class="footer__tagline">Un hogar cercano, cuidado y acompañado todos los días. Sedes en Macul y Ñuñoa, Santiago.</p>
        <div class="footer__social">
          <a
            href="${SITE.instagramUrl}"
            class="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram ${SITE.instagram}"
            data-track="instagram_click"
          >${ICONS.instagram}</a>
          <a
            href="${SITE.facebookUrl}"
            class="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de Casa de Reposo Claudia Lastra"
            data-track="facebook_click"
          >${ICONS.facebook}</a>
          <a
            href="${waLink(WA_MSG_GENERAL)}"
            class="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            data-track="whatsapp_click"
          >${ICONS.whatsapp}</a>
        </div>
      </div>
      <!-- Sede Macul -->
      <div>
        <p class="footer__col-title">Sede Macul</p>
        <ul class="footer__list">
          <li><span class="footer__address">Manuel Sánchez 3234<br>Macul, Santiago</span></li>
          <li>
            <a href="${SITE.sedes[0].mapsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions_click">
              Ver en Google Maps →
            </a>
          </li>
        </ul>
      </div>
      <!-- Sede Ñuñoa -->
      <div>
        <p class="footer__col-title">Sede Ñuñoa</p>
        <ul class="footer__list">
          <li><span class="footer__address">Montenegro 688<br>Ñuñoa, Santiago</span></li>
          <li>
            <a href="${SITE.sedes[1].mapsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions_click">
              Ver en Google Maps →
            </a>
          </li>
        </ul>
      </div>
      <!-- Navegación -->
      <div>
        <p class="footer__col-title">Navegación</p>
        <ul class="footer__list">
          ${navLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  <div class="container">
    <p class="footer__disclaimer">
      La disponibilidad de cupos, valores y servicios particulares debe confirmarse directamente con el equipo de Casa de Reposo Claudia Lastra. Los servicios coordinados según necesidad pueden tener costos adicionales.
    </p>
  </div>
  <div class="container">
    <div class="footer__bottom">
      <p class="footer__copy">
        © ${year} Casa de Reposo Claudia Lastra. Todos los derechos reservados.
      </p>
      <div class="footer__legal">
        <a href="privacidad.html">Política de privacidad</a>
      </div>
    </div>
  </div>
</footer>`;
}

// ─── WhatsApp flotante ────────────────────────────────────────
function buildWAFloat() {
  return `
<div class="wa-float" aria-label="Contacto rápido por WhatsApp">
  <span class="wa-float__tooltip" aria-hidden="true">Consultar ahora</span>
  <a 
    href="${waLink(WA_MSG_GENERAL)}"
    class="wa-float__btn"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Consultar por WhatsApp"
    data-track="whatsapp_click"
  >${ICONS.whatsapp}</a>
</div>`;
}

// ─── Barra móvil inferior ──────────────────────────────────────
function buildMobileBar() {
  return `
<div class="mobile-bar" id="mobile-bar" role="navigation" aria-label="Acciones rápidas">
  <div class="mobile-bar__grid">
    <a 
      href="${waLink(WA_MSG_GENERAL)}"
      class="btn btn-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      aria-label="Consultar por WhatsApp"
    >${ICONS.whatsapp} WhatsApp</a>
    <a 
      href="#contacto"
      class="btn btn-primary"
      data-track="schedule_visit_click"
    >${ICONS.calendar} Agendar visita</a>
  </div>
</div>`;
}

// ─── Inicializar interactividad ───────────────────────────────
function initInteractivity() {
  // Header scroll — con un centinela para no escuchar el scroll en cada frame
  const header = document.getElementById('header');
  if (header) {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:16px;height:1px;width:1px;pointer-events:none';
    document.body.prepend(sentinel);
    new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
      { threshold: 0 }
    ).observe(sentinel);
  }

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen.toString());
      hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú de navegación');
      // Gestión de foco
      if (isOpen) {
        const firstLink = mainNav.querySelector('.nav__link');
        if (firstLink) firstLink.focus();
      }
    });

    // Cerrar al hacer clic en enlace
    mainNav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // FAQ acordeón
  document.querySelectorAll('.faq-item__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen.toString());
      const answer = document.getElementById(btn.getAttribute('aria-controls'));
      if (answer) {
        answer.style.display = isOpen ? 'block' : 'none';
      }
    });
  });

  // Tabs servicios
  document.querySelectorAll('.services__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const panelId = tab.getAttribute('aria-controls');
      document.querySelectorAll('.services__tab').forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.services__panel').forEach(p => {
        p.classList.remove('is-active');
        p.hidden = true;
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add('is-active');
        panel.hidden = false;
      }
    });
  });

  // Formulario
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Animaciones fade-in
  initFadeIn();

  // Revelado palabra por palabra del tagline
  initTaglineReveal();

  // Tracking de eventos
  initTracking();
}

// ─── Formulario → WhatsApp ────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  // Validar campos requeridos
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const relacion = form.relacion.value;
  const acepto = form.acepto.checked;

  let valid = true;

  const setError = (id, errorId, show) => {
    const field = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (show) {
      field.classList.add('has-error');
      error.classList.add('is-visible');
      valid = false;
    } else {
      field.classList.remove('has-error');
      error.classList.remove('is-visible');
    }
  };

  setError('nombre', 'error-nombre', !nombre);
  setError('telefono', 'error-telefono', !telefono);
  setError('relacion', 'error-relacion', !relacion);

  const errorAcepto = document.getElementById('error-acepto');
  const checkAcepto = document.getElementById('acepto');
  if (!acepto) {
    errorAcepto.classList.add('is-visible');
    checkAcepto.focus();
    valid = false;
  } else {
    errorAcepto.classList.remove('is-visible');
  }

  if (!valid) {
    // Foco al primer error
    const firstError = form.querySelector('.has-error, input:invalid');
    if (firstError) firstError.focus();
    return;
  }

  // Construir mensaje
  const sede = form.sede.value;
  const plazo = form.plazo.value;
  const nivel = form.nivel.value;
  const mensaje = form.mensaje.value.trim();

  const waMsg = `Hola, vengo desde el sitio web de Casa de Reposo Claudia Lastra.

Mi nombre es *${nombre}*.
Soy *${relacion}* de la persona que necesita apoyo.
Mi teléfono de contacto es: ${telefono}.
Estoy consultando por la *${sede}*.
El ingreso sería *${plazo.toLowerCase()}*.
Nivel general de apoyo: ${nivel}.${mensaje ? `\nComentario: ${mensaje}.` : ''}

Me gustaría recibir información y coordinar una visita.`;

  trackEvent('visit_form_submit', { sede, plazo });
  window.open(`https://wa.me/${SITE.whatsappNumero}?text=${encodeURIComponent(waMsg)}`, '_blank', 'noopener');
}

// ─── Fade in con IntersectionObserver ────────────────────────
function initFadeIn() {
  const elementos = document.querySelectorAll('.fade-in');
  const mostrarTodo = () => elementos.forEach(el => el.classList.add('is-visible'));

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    mostrarTodo();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elementos.forEach(el => observer.observe(el));

  // Red de seguridad: el contenido arranca en opacity 0. Si el observador
  // no alcanzó a marcar nada, se muestra todo antes que la página quede vacía.
  setTimeout(() => {
    if (!document.querySelector('.fade-in.is-visible')) mostrarTodo();
  }, 1500);
}

// ─── Revelado del tagline ────────────────────────────────────
// Cada palabra cruza su propia línea de disparo y pasa del tono
// apagado al color pleno, en orden de lectura.
function initTaglineReveal() {
  const palabras = document.querySelectorAll('.tagline__word');
  if (!palabras.length) return;

  const encender = () => palabras.forEach(p => p.classList.add('is-lit'));

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    encender();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-lit');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -25% 0px' });

  palabras.forEach(p => observer.observe(p));

  // El texto apagado tiene contraste bajo a propósito. Si el observador
  // no responde, se enciende para que siga siendo legible.
  setTimeout(() => {
    if (!document.querySelector('.tagline__word.is-lit')) encender();
  }, 3000);
}

// ─── Tracking ────────────────────────────────────────────────
function initTracking() {
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      trackEvent(el.dataset.track, { element: el.tagName, text: el.textContent?.trim()?.slice(0, 40) });
    });
  });
}

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildPage();
  initInteractivity();
});
