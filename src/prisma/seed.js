// src/prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ─── MÓDULOS ───────────────────────────────────────────────
  const palabras = await prisma.modulo.upsert({
    where: { id: 1 },
    update: {},
    create: { nombre: "Palabras", descripcion: "Módulo de palabras en LSA" },
  });

  const frases = await prisma.modulo.upsert({
    where: { id: 2 },
    update: {},
    create: { nombre: "Frases Armadas", descripcion: "Módulo de frases en LSA" },
  });

  // ─── LECCIONES (Palabras) ───────────────────────────────────
  const alfabeto = await prisma.leccion.upsert({
    where: { id: 1 },
    update: {},
    create: { titulo: "Alfabeto", contenido: "Categoría Alfabeto", moduloId: palabras.id },
  });

  const dias = await prisma.leccion.upsert({
    where: { id: 2 },
    update: {},
    create: { titulo: "Días", contenido: "Categoría Días de la semana", moduloId: palabras.id },
  });

  const numeros = await prisma.leccion.upsert({
    where: { id: 3 },
    update: {},
    create: { titulo: "Números", contenido: "Categoría Números", moduloId: palabras.id },
  });

  const sentimientos = await prisma.leccion.upsert({
    where: { id: 4 },
    update: {},
    create: { titulo: "Sentimientos", contenido: "Categoría Sentimientos", moduloId: palabras.id },
  });

  // ─── LECCIONES (Frases Armadas) ────────────────────────────
  const saludos = await prisma.leccion.upsert({
    where: { id: 5 },
    update: {},
    create: { titulo: "Saludos", contenido: "Categoría Saludos", moduloId: frases.id },
  });

  const presentaciones = await prisma.leccion.upsert({
    where: { id: 6 },
    update: {},
    create: { titulo: "Presentaciones", contenido: "Categoría Presentaciones", moduloId: frases.id },
  });

  const entorno = await prisma.leccion.upsert({
    where: { id: 7 },
    update: {},
    create: { titulo: "Frases de Entorno", contenido: "Frases de Salud / Escuela", moduloId: frases.id },
  });

  const conectores = await prisma.leccion.upsert({
    where: { id: 8 },
    update: {},
    create: { titulo: "Conectores de Emergencia", contenido: "Frases de emergencia", moduloId: frases.id },
  });

  // ─── LOGROS ────────────────────────────────────────────────
  const logros = [
    // Módulo Palabras
    { nombre: "Deletrear",           descripcion: "Completaste la categoría Alfabeto",      icono: "Aa",  leccionId: alfabeto.id },
    { nombre: "En agenda",           descripcion: "Completaste la categoría Días",           icono: "📅",  leccionId: dias.id },
    { nombre: "En orden",            descripcion: "Completaste la categoría Números",        icono: "123", leccionId: numeros.id },
    { nombre: "Espacio seguro",      descripcion: "Completaste la categoría Sentimientos",   icono: "🛡️", leccionId: sentimientos.id },
    // Módulo Frases Armadas
    { nombre: "Primer diálogo",      descripcion: "Completaste Saludos",                     icono: "💬",  leccionId: saludos.id },
    { nombre: "Con vos",             descripcion: "Completaste Presentaciones",               icono: "🔗",  leccionId: presentaciones.id },
    { nombre: "Orientados",          descripcion: "Completaste Frases de Entorno",            icono: "📋",  leccionId: entorno.id },
    { nombre: "Lenguaje compartido", descripcion: "Completaste Conectores de Emergencia",     icono: "🗣️", leccionId: conectores.id },
    // Globales
    { nombre: "Sin errores",         descripcion: "Completaste una lección sin errores",     icono: "⭐",  leccionId: null },
    { nombre: "Aprendizaje completo",descripcion: "Completaste todo el contenido",           icono: "🏆",  leccionId: null },
  ];

  for (const logro of logros) {
    await prisma.logro.upsert({
      where: { id: logros.indexOf(logro) + 1 },
      update: {},
      create: logro,
    });
  }

  console.log("✅ Seed completado");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());