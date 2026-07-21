// src/prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log(" Iniciando la carga de datos ...");
  // ─── 1. MÓDULOS ─────────────────────────────────────────────
  const palabras = await prisma.modulo.upsert({
    where: { id: 1 },
    update: {},
    create: { nombre: "Palabras", descripcion: "Módulo de palabras en LSA" },
  });

  const frases = await prisma.modulo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nombre: "Frases Armadas",
      descripcion: "Módulo de frases en LSA",
    },
  });

  // ─── 2. LECCIONES ───────────────────────────────────────────
  const alfabeto = await prisma.leccion.upsert({
    where: { id: 1 },
    update: {},
    create: {
      titulo: "Alfabeto",
      contenido: "Categoría Alfabeto",
      moduloId: palabras.id,
    },
  });

  const dias = await prisma.leccion.upsert({
    where: { id: 2 },
    update: {},
    create: {
      titulo: "Días",
      contenido: "Categoría Días de la semana",
      moduloId: palabras.id,
    },
  });

  const numeros = await prisma.leccion.upsert({
    where: { id: 3 },
    update: {},
    create: {
      titulo: "Números",
      contenido: "Categoría Números",
      moduloId: palabras.id,
    },
  });

  const sentimientos = await prisma.leccion.upsert({
    where: { id: 4 },
    update: {},
    create: {
      titulo: "Sentimientos",
      contenido: "Categoría Sentimientos",
      moduloId: palabras.id,
    },
  });

  const saludos = await prisma.leccion.upsert({
    where: { id: 5 },
    update: {},
    create: {
      titulo: "Saludos",
      contenido: "Categoría Saludos",
      moduloId: frases.id,
    },
  });

  const presentaciones = await prisma.leccion.upsert({
    where: { id: 6 },
    update: {},
    create: {
      titulo: "Presentaciones",
      contenido: "Categoría Presentaciones",
      moduloId: frases.id,
    },
  });

  const entorno = await prisma.leccion.upsert({
    where: { id: 7 },
    update: {},
    create: {
      titulo: "Frases de Entorno",
      contenido: "Frases de Salud / Escuela",
      moduloId: frases.id,
    },
  });

  const conectores = await prisma.leccion.upsert({
    where: { id: 8 },
    update: {},
    create: {
      titulo: "Conectores de Emergencia",
      contenido: "Frases de emergencia",
      moduloId: frases.id,
    },
  });

  // ─── 3. TEORÍA ──────────────────────────────────────────────
  // Definimos la lista de teorías asociadas dinámicamente a los IDs reales de las lecciones
  const listaTeorias = [
    // Lección 1: Alfabeto
    {
      lessonId: alfabeto.id,
      titulo: "Letra A",
      contenidoMultimedia: "Letra_A",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra B",
      contenidoMultimedia: "Letra_B",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra C",
      contenidoMultimedia: "Letra_C",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra D",
      contenidoMultimedia: "Letra_D",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra E",
      contenidoMultimedia: "Letra_E",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra F",
      contenidoMultimedia: "Letra_F",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra G",
      contenidoMultimedia: "Letra_G",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra H",
      contenidoMultimedia: "Letra_H",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra I",
      contenidoMultimedia: "Letra_I",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra J",
      contenidoMultimedia: "Letra_J",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra K",
      contenidoMultimedia: "Letra_K",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra L",
      contenidoMultimedia: "Letra_L",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra M",
      contenidoMultimedia: "Letra_M",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra N",
      contenidoMultimedia: "Letra_N",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra Ñ",
      contenidoMultimedia: "Letra_N",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra O",
      contenidoMultimedia: "Letra_O",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra P",
      contenidoMultimedia: "Letra_P",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra Q",
      contenidoMultimedia: "Letra_Q",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra R",
      contenidoMultimedia: "Letra_R",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra S",
      contenidoMultimedia: "Letra_S",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra T",
      contenidoMultimedia: "Letra_T",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra U",
      contenidoMultimedia: "Letra_U",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra V",
      contenidoMultimedia: "Letra_V",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra W",
      contenidoMultimedia: "Letra_W",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra X",
      contenidoMultimedia: "Letra_X",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra Y",
      contenidoMultimedia: "Letra_Y",
    },
    {
      lessonId: alfabeto.id,
      titulo: "Letra Z",
      contenidoMultimedia: "Letra_Z",
    },

    // Lección 2: Días
    { lessonId: dias.id, titulo: "Lunes", contenidoMultimedia: "Lunes" },
    { lessonId: dias.id, titulo: "Martes", contenidoMultimedia: "Martes" },
    {
      lessonId: dias.id,
      titulo: "Miércoles",
      contenidoMultimedia: "Miercoles",
    },
    { lessonId: dias.id, titulo: "Jueves", contenidoMultimedia: "Jueves" },
    { lessonId: dias.id, titulo: "Viernes", contenidoMultimedia: "Viernes" },
    { lessonId: dias.id, titulo: "Sábado", contenidoMultimedia: "Sabado" },
    { lessonId: dias.id, titulo: "Domingo", contenidoMultimedia: "Domingo" },

    // Lección 3: Números
    {
      lessonId: numeros.id,
      titulo: "Número 0",
      contenidoMultimedia: "Numero_0",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 1",
      contenidoMultimedia: "Numero_1",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 2",
      contenidoMultimedia: "Numero_2",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 3",
      contenidoMultimedia: "Numero_3",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 4",
      contenidoMultimedia: "Numero_4",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 5",
      contenidoMultimedia: "Numero_5",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 6",
      contenidoMultimedia: "Numero_6",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 7",
      contenidoMultimedia: "Numero_7",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 8",
      contenidoMultimedia: "Numero_8",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 9",
      contenidoMultimedia: "Numero_9",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 10",
      contenidoMultimedia: "Numero_10",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 20",
      contenidoMultimedia: "Numero_20",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 30",
      contenidoMultimedia: "Numero_30",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 40",
      contenidoMultimedia: "Numero_40",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 50",
      contenidoMultimedia: "Numero_50",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 60",
      contenidoMultimedia: "Numero_60",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 70",
      contenidoMultimedia: "Numero_70",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 80",
      contenidoMultimedia: "Numero_80",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 90",
      contenidoMultimedia: "Numero_90",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 100",
      contenidoMultimedia: "Numero_100",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 200",
      contenidoMultimedia: "Numero_200",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 300",
      contenidoMultimedia: "Numero_300",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 400",
      contenidoMultimedia: "Numero_400",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 500",
      contenidoMultimedia: "Numero_500",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 600",
      contenidoMultimedia: "Numero_600",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 700",
      contenidoMultimedia: "Numero_700",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 800",
      contenidoMultimedia: "Numero_800",
    },
    {
      lessonId: numeros.id,
      titulo: "Número 900",
      contenidoMultimedia: "Numero_900",
    },

    // Lección 4: Sentimientos
    {
      lessonId: sentimientos.id,
      titulo: "Feliz",
      contenidoMultimedia: "Feliz",
    },
    {
      lessonId: sentimientos.id,
      titulo: "Triste",
      contenidoMultimedia: "Triste",
    },
    {
      lessonId: sentimientos.id,
      titulo: "Enojado",
      contenidoMultimedia: "Enojado",
    },
    {
      lessonId: sentimientos.id,
      titulo: "Asustado",
      contenidoMultimedia: "Asustado",
    },
    {
      lessonId: sentimientos.id,
      titulo: "Cansado",
      contenidoMultimedia: "Cansado",
    },
    {
      lessonId: sentimientos.id,
      titulo: "Enfermo",
      contenidoMultimedia: "Enfermo",
    },

    // Lección 5: Saludos
    {
      lessonId: saludos.id,
      titulo: "Hola, buen día",
      contenidoMultimedia: "Hola_buen_dia",
    },
    {
      lessonId: saludos.id,
      titulo: "Buenas tardes",
      contenidoMultimedia: "Buenas_tardes",
    },
    {
      lessonId: saludos.id,
      titulo: "Buenas noches",
      contenidoMultimedia: "Buenas_noches",
    },
    { lessonId: saludos.id, titulo: "Chau", contenidoMultimedia: "Chau" },

    // Lección 6: Presentaciones
    {
      lessonId: presentaciones.id,
      titulo: "Me llamo",
      contenidoMultimedia: "Me_llamo",
    },
    {
      lessonId: presentaciones.id,
      titulo: "Mucho gusto",
      contenidoMultimedia: "Mucho_gusto",
    },
    {
      lessonId: presentaciones.id,
      titulo: "¿Cómo estás?",
      contenidoMultimedia: "Como_estas",
    },
    {
      lessonId: presentaciones.id,
      titulo: "Estoy a cargo",
      contenidoMultimedia: "Estoy_a_cargo",
    },

    // Lección 7: Frases de Entorno
    {
      lessonId: entorno.id,
      titulo: "Pasá por acá",
      contenidoMultimedia: "Pasa_por_aca",
    },
    {
      lessonId: entorno.id,
      titulo: "¿Dónde duele?",
      contenidoMultimedia: "Donde_duele",
    },
    {
      lessonId: entorno.id,
      titulo: "Espacio seguro",
      contenidoMultimedia: "Espacio_seguro",
    },
    {
      lessonId: entorno.id,
      titulo: "Tenemos reunión",
      contenidoMultimedia: "Tenemos_reunion",
    },

    // Lección 8: Conectores de Emergencia
    { lessonId: conectores.id, titulo: "Sí", contenidoMultimedia: "Si" },
    { lessonId: conectores.id, titulo: "No", contenidoMultimedia: "No" },
    {
      lessonId: conectores.id,
      titulo: "Necesito ayuda",
      contenidoMultimedia: "Necesito_ayuda",
    },
    {
      lessonId: conectores.id,
      titulo: "Esperá un momento",
      contenidoMultimedia: "Espera_un_momento",
    },
  ];

  for (let i = 0; i < listaTeorias.length; i++) {
    const t = listaTeorias[i];
    await prisma.teoria.upsert({
      where: { id: i + 1 }, // ID estable para evitar duplicación
      update: {
        lessonId: t.lessonId,
        titulo: t.titulo,
        tipo: "teoria",
        contenidoMultimedia: t.contenidoMultimedia,
      },
      create: {
        id: i + 1,
        lessonId: t.lessonId,
        titulo: t.titulo,
        tipo: "teoria",
        contenidoMultimedia: t.contenidoMultimedia,
      },
    });
  }

  // ─── 4. LOGROS ──────────────────────────────────────────────
  const logros = [
    // Módulo Palabras
    {
      nombre: "Deletrear",
      descripcion: "Completaste la categoría Alfabeto",
      icono: "Aa",
      leccionId: alfabeto.id,
    },
    {
      nombre: "En agenda",
      descripcion: "Completaste la categoría Días",
      icono: "📅",
      leccionId: dias.id,
    },
    {
      nombre: "En orden",
      descripcion: "Completaste la categoría Números",
      icono: "123",
      leccionId: numeros.id,
    },
    {
      nombre: "Espacio seguro",
      descripcion: "Completaste la categoría Sentimientos",
      icono: "🛡️",
      leccionId: sentimientos.id,
    },
    // Módulo Frases Armadas
    {
      nombre: "Primer diálogo",
      descripcion: "Completaste Saludos",
      icono: "💬",
      leccionId: saludos.id,
    },
    {
      nombre: "Con vos",
      descripcion: "Completaste Presentaciones",
      icono: "🔗",
      leccionId: presentaciones.id,
    },
    {
      nombre: "Orientados",
      descripcion: "Completaste Frases de Entorno",
      icono: "📋",
      leccionId: entorno.id,
    },
    {
      nombre: "Lenguaje compartido",
      descripcion: "Completaste Conectores de Emergencia",
      icono: "🗣️",
      leccionId: conectores.id,
    },
    // Globales
    {
      nombre: "Sin errores",
      descripcion: "Completaste una lección sin errores",
      icono: "⭐",
      leccionId: null,
    },
    {
      nombre: "Aprendizaje completo",
      descripcion: "Completaste todo el contenido",
      icono: "🏆",
      leccionId: null,
    },
  ];

  for (const logro of logros) {
    await prisma.logro.upsert({
      where: { id: logros.indexOf(logro) + 1 },
      update: {},
      create: logro,
    });
  }

  // ─── 5. PREGUNTAS (EJERCICIOS) ──────────────────────────────
  const ejercicios = [
    // === LECCIÓN 1: ALFABETO ===
    {
      lessonId: alfabeto.id,
      titulo: "¿Cuál es la seña correcta para la letra 'B'?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Letra_A", "Letra_B", "Letra_C"],
      respuestaEsperada: "Letra_B",
      contenidoMultimedia: ["Letra_B"], // <-- Cambiado a Array
    },
    {
      lessonId: alfabeto.id,
      titulo: "Verdadero o Falso: La siguiente imagen representa la letra 'E'.",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: true,
      contenidoMultimedia: ["Letra_E"],
    },
    {
      lessonId: alfabeto.id,
      titulo: "¿A qué letra corresponde esta seña?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Letra_G", "Letra_H", "Letra_I"],
      respuestaEsperada: "Letra_H",
      contenidoMultimedia: ["Letra_H"],
    },
    {
      lessonId: alfabeto.id,
      titulo: "Ordená las letras para formar la palabra 'Cada':",
      tipo: "ORDER_WORDS",
      opcionesRespuesta: ["D", "A", "C", "A"],
      respuestaEsperada: ["C", "A", "D", "A"],
      // Ahora puedes pasar múltiples videos según las letras de la palabra:
      contenidoMultimedia: ["Letra_C", "Letra_A", "Letra_D", "Letra_A"],
    },
    {
      lessonId: alfabeto.id,
      titulo: "Identificá la seña que corresponde a la letra 'Ñ'.",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Letra_M", "Letra_N", "Letra_Ñ"],
      respuestaEsperada: "Letra_Ñ",
      contenidoMultimedia: ["Letra_Ñ"],
    },
    {
      lessonId: alfabeto.id,
      titulo: "Verdadero o Falso: Esta seña representa la letra 'O'.",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: false,
      contenidoMultimedia: ["Letra_P"],
    },
    {
      lessonId: alfabeto.id,
      titulo: "¿Cuál de estas opciones representa la letra 'S'?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Letra_R", "Letra_S", "Letra_T"],
      respuestaEsperada: "Letra_S",
      contenidoMultimedia: ["Letra_S"],
    },
    {
      lessonId: alfabeto.id,
      titulo: "Verdadero o Falso: Esta seña corresponde a la letra 'V'.",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: true,
      contenidoMultimedia: ["Letra_V"],
    },
    {
      lessonId: alfabeto.id,
      titulo: "¿A qué letra del abecedario corresponde la siguiente seña?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Letra_X", "Letra_Y", "Letra_Z"],
      respuestaEsperada: "Letra_Z",
      contenidoMultimedia: ["Letra_Z"],
    },

    // === LECCIÓN 2: DÍAS ===
    {
      lessonId: dias.id,
      titulo: "¿Qué día de la semana se representa en esta seña?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Lunes", "Martes", "Miércoles", "Jueves"],
      respuestaEsperada: "Miércoles",
      contenidoMultimedia: ["Miercoles"],
    },
    {
      lessonId: dias.id,
      titulo: "Ordená cronológicamente los últimos días de la semana vistos:",
      tipo: "ORDER_WORDS",
      opcionesRespuesta: ["Domingo", "Viernes", "Sábado"],
      respuestaEsperada: ["Viernes", "Sábado", "Domingo"],
      contenidoMultimedia: ["Domingo", "Viernes", "Sábado"],
    },

    // === LECCIÓN 3: NÚMEROS ===
    {
      lessonId: numeros.id,
      titulo: "¿Qué número representa la siguiente seña?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Número 0", "Número 1", "Número 2", "Número 3"],
      respuestaEsperada: "Número 2",
      contenidoMultimedia: ["Numero_2"],
    },
    {
      lessonId: numeros.id,
      titulo: "Verdadero o Falso: ¿Esta seña corresponde al 'Número 5'?",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: true,
      contenidoMultimedia: ["Numero_5"],
    },
    {
      lessonId: numeros.id,
      titulo: "¿Cuál es la seña correcta para el número '20'?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Numero_8", "Numero_9", "Numero_10", "Numero_20"],
      respuestaEsperada: "Numero_20",
      contenidoMultimedia: ["Numero_20"],
    },
    {
      lessonId: numeros.id,
      titulo:
        "Verdadero o Falso: ¿La siguiente seña representa al número '40'?",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: false,
      contenidoMultimedia: ["Numero_50"],
    },
    {
      lessonId: numeros.id,
      titulo: "Seleccioná la opción que muestre la seña del número '100'.",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Numero_70", "Numero_80", "Numero_90", "Numero_100"],
      respuestaEsperada: "Numero_100",
      contenidoMultimedia: ["Numero_100"],
    },
    {
      lessonId: numeros.id,
      titulo: "Verdadero o Falso: Esta seña representa la cantidad '500'.",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: true,
      contenidoMultimedia: ["Numero_500"],
    },
    {
      lessonId: numeros.id,
      titulo: "Ordená de menor a mayor los siguientes números en señas:",
      tipo: "ORDER_WORDS",
      opcionesRespuesta: ["900", "700", "600", "800"],
      respuestaEsperada: ["600", "700", "800", "900"],
      contenidoMultimedia: [
        "Numero_900",
        "Numero_700",
        "Numero_600",
        "Numero_800",
      ],
    },

    // === LECCIÓN 4: SENTIMIENTOS ===
    {
      lessonId: sentimientos.id,
      titulo: "Identificá la seña que exprese el sentimiento 'Triste'.",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Feliz", "Triste", "Enojado", "Asustado"],
      respuestaEsperada: "Triste",
      contenidoMultimedia: ["Triste"],
    },
    {
      lessonId: sentimientos.id,
      titulo:
        "Verdadero o Falso: Esta seña representa el estado de estar 'Enfermo'.",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: true,
      contenidoMultimedia: ["Enfermo"],
    },

    // === LECCIÓN 5: SALUDOS ===
    {
      lessonId: saludos.id,
      titulo: "¿Cuál es la seña correcta para despedirse diciendo 'Chau'?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: [
        "Hola_buen_dia",
        "Buenas_tardes",
        "Buenas_noches",
        "Chau",
      ],
      respuestaEsperada: "Chau",
      contenidoMultimedia: ["Chau"],
    },

    // === LECCIÓN 6: PRESENTACIONES ===
    {
      lessonId: presentaciones.id,
      titulo: "Verdadero o Falso: Esta seña expresa la frase '¿Cómo estás?'.",
      tipo: "TRUE_FALSE",
      opcionesRespuesta: [true, false],
      respuestaEsperada: true,
      contenidoMultimedia: ["Como_estas"],
    },

    // === LECCIÓN 7: FRASES DE ENTORNO ===
    {
      lessonId: entorno.id,
      titulo:
        "¿A qué frase de tu entorno de trabajo corresponde la siguiente seña?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: [
        "Pasá por acá",
        "¿Dónde duele?",
        "Espacio seguro",
        "Tenemos reunión",
      ],
      respuestaEsperada: "Pasá por acá",
      contenidoMultimedia: ["Pasa_por_aca"],
    },

    // === LECCIÓN 8: CONECTORES DE EMERGENCIA ===
    {
      lessonId: conectores.id,
      titulo: "¿Qué seña de emergencia se representa en el siguiente video?",
      tipo: "MULTIPLE_CHOICE",
      opcionesRespuesta: ["Sí", "No", "Necesito ayuda", "Esperá un momento"],
      respuestaEsperada: "Necesito ayuda",
      contenidoMultimedia: ["Necesito_ayuda"],
    },
  ];

  for (let i = 0; i < ejercicios.length; i++) {
    const ej = ejercicios[i];
    await prisma.ejercicio.upsert({
      where: {
        id: i + 1,
      },
      update: {
        lessonId: ej.lessonId,
        titulo: ej.titulo,
        tipo: ej.tipo,
        opcionesRespuesta: ej.opcionesRespuesta,
        respuestaEsperada: ej.respuestaEsperada,
        contenidoMultimedia: ej.contenidoMultimedia,
      },
      create: {
        id: i + 1,
        lessonId: ej.lessonId,
        titulo: ej.titulo,
        tipo: ej.tipo,
        opcionesRespuesta: ej.opcionesRespuesta,
        respuestaEsperada: ej.respuestaEsperada,
        contenidoMultimedia: ej.contenidoMultimedia,
      },
    });
  }

  // ─── 6. SINCRONIZACIÓN DE SECUENCIAS (PostgreSQL) ───────────
  // Esto previene fallos futuros de inserciones por claves autoincrementables desfasadas.
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Teoria"', 'id'), COALESCE(MAX(id), 1)) FROM "Teoria"`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Ejercicios"', 'id'), COALESCE(MAX(id), 1)) FROM "Ejercicios"`;

  console.log("✅ Seed completado con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el proceso de seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
