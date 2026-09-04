/**
 * FUENTE ÚNICA DE VERDAD — Casa de Reposo Claudia Lastra
 * =========================================================
 * Edita este archivo para actualizar datos en toda la página:
 * textos, teléfonos, direcciones, servicios, FAQ, testimonios.
 */

export const SITE = {
  nombre: 'Casa de Reposo Claudia Lastra',
  slogan: 'Un hogar cercano, cuidado y acompañado todos los días',
  descripcionBreve:
    'Acompañamos a cada residente con cuidado permanente, alimentación diaria, actividades terapéuticas y un ambiente familiar en nuestras sedes de Macul y Ñuñoa.',

  // ─── Contacto ────────────────────────────────────────────
  telefono: '+56 9 9901 0921',
  telefonoHref: 'tel:+56999010921',
  whatsappNumero: '56999010921',
  instagram: '@casadereposo.cl',
  instagramUrl: 'https://www.instagram.com/casadereposo.cl/',
  facebook: 'Casa de Reposo Claudia Lastra',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61578537031370',

  // ─── Sedes ───────────────────────────────────────────────
  sedes: [
    {
      id: 'macul',
      nombre: 'Sede Macul',
      direccion: 'Manuel Sánchez 3234, Macul',
      region: 'Región Metropolitana, Santiago',
      imagen: 'images/sede-macul.webp',
      mapsUrl:
        'https://maps.google.com/maps?q=Manuel+S%C3%A1nchez+3234+Macul+Santiago+Chile',
      whatsappMensaje:
        'Hola, me comunico desde el sitio web de Casa de Reposo Claudia Lastra. Me gustaría consultar información sobre la *Sede Macul*. ¿Podrían orientarme?',
    },
    {
      id: 'nunoa',
      nombre: 'Sede Ñuñoa',
      direccion: 'Montenegro 688, Ñuñoa',
      region: 'Región Metropolitana, Santiago',
      imagen: 'images/sede-nunoa.webp',
      mapsUrl:
        'https://maps.google.com/maps?q=Montenegro+688+%C3%91u%C3%B1oa+Santiago+Chile',
      whatsappMensaje:
        'Hola, me comunico desde el sitio web de Casa de Reposo Claudia Lastra. Me gustaría consultar información sobre la *Sede Ñuñoa*. ¿Podrían orientarme?',
    },
  ],

  // ─── Servicios incluidos regularmente ────────────────────
  serviciosIncluidos: [
    {
      icono: '🏠',
      titulo: 'Cuidado permanente',
      descripcion:
        'Cuidadoras presentes las 24 horas del día, todos los días del año, para acompañar y apoyar a cada residente en su rutina diaria.',
    },
    {
      icono: '🍽️',
      titulo: 'Alimentación diaria',
      descripcion:
        'Cuatro comidas al día preparadas con cariño: desayuno, almuerzo, once y cena, con orientación de nutricionista una vez al mes.',
    },
    {
      icono: '🤸',
      titulo: 'Kinesiología grupal',
      descripcion:
        'Cuatro horas semanales de kinesiología en grupo para mantener el movimiento, la movilidad y el bienestar físico de los residentes.',
    },
    {
      icono: '🎨',
      titulo: 'Terapia ocupacional',
      descripcion:
        'Cuatro horas semanales de actividades terapéuticas grupales que estimulan la creatividad, la concentración y la participación activa.',
    },
    {
      icono: '🥗',
      titulo: 'Orientación nutricional',
      descripcion:
        'Nutricionista que visita la residencia una vez al mes para orientar la alimentación y apoyar el bienestar de los residentes.',
    },
  ],

  // ─── Apoyos según necesidad o coordinación ───────────────
  serviciosCoordinados: [
    {
      icono: '🩺',
      titulo: 'Apoyo clínico coordinado',
      descripcion:
        'Enfermera disponible ante situaciones clínicas que requieran apoyo. El equipo coordina la atención de manera oportuna.',
    },
    {
      icono: '⚕️',
      titulo: 'TENS cuando corresponda',
      descripcion:
        'Apoyo de TENS disponible según requerimiento del residente y coordinación correspondiente.',
    },
    {
      icono: '🏥',
      titulo: 'Tratamientos ambulatorios',
      descripcion:
        'Los tratamientos especiales de carácter ambulatorio pueden coordinarse y tienen costo adicional para la familia.',
    },
    {
      icono: '📋',
      titulo: 'Consultorio o CESFAM',
      descripcion:
        'Se sugiere mantener o realizar la inscripción en el consultorio o CESFAM que corresponda al domicilio de la residencia.',
    },
  ],

  // ─── Vida diaria ─────────────────────────────────────────
  vidaDiaria: [
    { icono: '🍽️', texto: 'Alimentación nutritiva y preparada con cariño' },
    { icono: '💬', texto: 'Conversación y compañía cada día' },
    { icono: '🤸', texto: 'Movimiento y actividad física adaptada' },
    { icono: '🎭', texto: 'Actividades grupales y estimulación' },
    { icono: '😴', texto: 'Descanso tranquilo y acompañado' },
    { icono: '👨‍👩‍👧', texto: 'Visitas familiares bienvenidas' },
  ],

  // ─── Proceso de consulta ─────────────────────────────────
  pasos: [
    {
      numero: '1',
      titulo: 'Escríbenos o solicita una visita',
      descripcion:
        'Contáctanos por WhatsApp o completa el formulario de contacto. Nos pondremos en contacto contigo a la brevedad.',
    },
    {
      numero: '2',
      titulo: 'Conversemos sobre tu familiar',
      descripcion:
        'Evaluamos juntos las necesidades de apoyo, la sede de interés y cualquier pregunta que tengas sobre la vida en la residencia.',
    },
    {
      numero: '3',
      titulo: 'Conoce la sede y revisemos disponibilidad',
      descripcion:
        'Te invitamos a visitar el lugar para que puedas ver, sentir y preguntar todo lo que necesites antes de tomar una decisión.',
    },
  ],

  // ─── Testimonios ─────────────────────────────────────────
  // Para agregar testimonios reales, descomenta y completa cada objeto.
  // Solo incluir testimonios autorizados por escrito por las familias.
  testimonios: [
    // {
    //   nombre: 'María P.',
    //   relacion: 'Hija de residente, Sede Macul',
    //   texto:
    //     'El equipo nos dio la tranquilidad que necesitábamos. Mamá está muy contenta.',
    // },
  ],

  // ─── Preguntas frecuentes ────────────────────────────────
  faq: [
    {
      pregunta: '¿Cómo puedo agendar una visita?',
      respuesta:
        'Puedes agendar una visita escribiéndonos por WhatsApp al +56 9 9901 0921 o completando el formulario de contacto en esta página. Te responderemos a la brevedad para coordinar el día y la hora que mejor te acomode.',
    },
    {
      pregunta: '¿En qué comunas están ubicados?',
      respuesta:
        'Contamos con dos sedes en Santiago: una en Macul (Manuel Sánchez 3234) y otra en Ñuñoa (Montenegro 688). Puedes elegir la que sea más conveniente para tu familia.',
    },
    {
      pregunta: '¿Qué servicios están incluidos regularmente?',
      respuesta:
        'Los servicios incluidos regularmente son: cuidadoras presentes las 24 horas, cuatro comidas diarias, kinesiología grupal cuatro horas a la semana, terapia ocupacional cuatro horas a la semana, y visita de nutricionista una vez al mes. Los apoyos y requerimientos particulares se revisan con cada familia antes del ingreso.',
    },
    {
      pregunta: '¿Cómo se consulta la disponibilidad?',
      respuesta:
        'Los cupos pueden variar según la sede y las necesidades de apoyo de cada persona. Escríbenos por WhatsApp o completa el formulario para recibir información actualizada y personalizada.',
    },
    {
      pregunta: '¿Los tratamientos clínicos especiales están incluidos?',
      respuesta:
        'Los tratamientos especiales de carácter ambulatorio pueden coordinarse, pero tienen costo adicional para la familia. La enfermera y el TENS están disponibles según necesidad y coordinación. Te explicaremos en detalle al momento de la consulta.',
    },
    {
      pregunta: '¿Se puede elegir entre Macul y Ñuñoa?',
      respuesta:
        'Sí, puedes elegir la sede que mejor se adapte a tu ubicación o preferencias. Ambas sedes comparten los mismos estándares de cuidado y acompañamiento. Consúltanos si tienes dudas sobre cuál podría ser la mejor opción.',
    },
    {
      pregunta: '¿Se recomienda la inscripción en un consultorio o CESFAM?',
      respuesta:
        'Sí, se sugiere mantener o realizar la inscripción en el consultorio o CESFAM que corresponda al domicilio de la residencia. El equipo puede orientarte en este proceso.',
    },
    {
      pregunta: '¿Cómo puedo solicitar información sobre valores?',
      respuesta:
        'Los valores y cupos pueden variar según la sede y las necesidades de apoyo de cada persona. Escríbenos por WhatsApp al +56 9 9901 0921 para recibir información actualizada.',
    },
  ],

  // ─── Galería ─────────────────────────────────────────────
  galeria: [
    { src: 'images/hero-residencia.webp', alt: 'Interior de Casa de Reposo Claudia Lastra', caption: 'Un ambiente cálido y hogareño' },
    { src: 'images/sede-macul.webp', alt: 'Fachada Sede Macul', caption: 'Sede Macul — Manuel Sánchez 3234' },
    { src: 'images/sede-nunoa.webp', alt: 'Fachada Sede Ñuñoa', caption: 'Sede Ñuñoa — Montenegro 688' },
    { src: 'images/espacio-comun.webp', alt: 'Espacios comunes de la residencia', caption: 'Espacios comunes acogedores' },
    { src: 'images/habitacion.webp', alt: 'Habitación de la residencia', caption: 'Habitaciones confortables' },
    { src: 'images/alimentacion.webp', alt: 'Alimentación en la residencia', caption: 'Cuatro comidas diarias con cariño' },
    { src: 'images/actividad-grupal.webp', alt: 'Actividad grupal con residentes', caption: 'Terapia ocupacional y actividades' },
    { src: 'images/equipo-cuidados.webp', alt: 'Equipo de cuidadoras', caption: 'Nuestro equipo de cuidados' },
  ],

  // ─── SEO ─────────────────────────────────────────────────
  seo: {
    titleTag: 'Casa de Reposo Claudia Lastra — Residencia para personas mayores en Macul y Ñuñoa',
    metaDescription:
      'Residencia para personas mayores en Macul y Ñuñoa, Santiago. Cuidadoras las 24 horas, 4 comidas diarias y 8 horas semanales de kinesiología y terapia ocupacional. Agenda una visita sin costo.',
    canonicalUrl: 'https://casadereposo.cl', // Actualizar con dominio real
    ogImage: 'images/hero-residencia.webp',
  },

  // ─── Analítica (opcional) ─────────────────────────────────
  // Reemplaza con tu ID de Google Analytics o Plausible si lo configuras.
  analytics: {
    gaId: '', // Ejemplo: 'G-XXXXXXXXXX'
    plausibleDomain: '', // Ejemplo: 'casadereposo.cl'
  },
};
