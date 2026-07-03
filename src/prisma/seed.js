
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //  MÓDULOS 
  const palabras = await prisma.modulo.upsert({
    where: { id: 1 },
    update: { nombre: "Palabras", descripcion: "Módulo de palabras en LSA" },
    create: { nombre: "Palabras", descripcion: "Módulo de palabras en LSA" },
  });

  const frases = await prisma.modulo.upsert({
    where: { id: 2 },
    update: { nombre: "Frases", descripcion: "Módulo de frases en LSA" },
    create: { nombre: "Frases", descripcion: "Módulo de frases en LSA" },
  });

  // LECCIONES (Palabras) 
  const abecedario = await prisma.leccion.upsert({
    where: { id: 1 },
    update: { titulo: "Abecedario", contenido: "Categoría Abecedario" },
    create: { titulo: "Abecedario", contenido: "Categoría Abecedario", moduloId: palabras.id },
  });

  const dias = await prisma.leccion.upsert({
    where: { id: 2 },
    update: { titulo: "Días de la semana", contenido: "Categoría Días de la semana" },
    create: { titulo: "Días de la semana", contenido: "Categoría Días de la semana", moduloId: palabras.id },
  });

  const numeros = await prisma.leccion.upsert({
    where: { id: 3 },
    update: { titulo: "Números", contenido: "Categoría Números" },
    create: { titulo: "Números", contenido: "Categoría Números", moduloId: palabras.id },
  });

  const sentimientos = await prisma.leccion.upsert({
    where: { id: 4 },
    update: { titulo: "Sentimientos", contenido: "Categoría Sentimientos" },
    create: { titulo: "Sentimientos", contenido: "Categoría Sentimientos", moduloId: palabras.id },
  });

  //  LECCIONES (Frases) 
  const saludos = await prisma.leccion.upsert({
    where: { id: 5 },
    update: { titulo: "Saludos", contenido: "Categoría Saludos" },
    create: { titulo: "Saludos", contenido: "Categoría Saludos", moduloId: frases.id },
  });

  const presentaciones = await prisma.leccion.upsert({
    where: { id: 6 },
    update: { titulo: "Presentaciones", contenido: "Categoría Presentaciones" },
    create: { titulo: "Presentaciones", contenido: "Categoría Presentaciones", moduloId: frases.id },
  });

  const entorno = await prisma.leccion.upsert({
    where: { id: 7 },
    update: { titulo: "Entorno", contenido: "Categoría Entorno" },
    create: { titulo: "Entorno", contenido: "Categoría Entorno", moduloId: frases.id },
  });

  const emergencia = await prisma.leccion.upsert({
    where: { id: 8 },
    update: { titulo: "Emergencia", contenido: "Categoría Emergencia" },
    create: { titulo: "Emergencia", contenido: "Categoría Emergencia", moduloId: frases.id },
  });

  //  LOGROS 
  const logros = [
    // Módulo Palabras
    { nombre: "Deletrear",           descripcion: "Completaste la categoría Abecedario",    icono: "Aa",  leccionId: abecedario.id },
    { nombre: "En agenda",           descripcion: "Completaste la categoría Días de la semana", icono: "📅", leccionId: dias.id },
    { nombre: "En orden",            descripcion: "Completaste la categoría Números",        icono: "123", leccionId: numeros.id },
    { nombre: "Espacio seguro",      descripcion: "Completaste la categoría Sentimientos",   icono: "🛡️", leccionId: sentimientos.id },
    // Módulo Frases
    { nombre: "Primer diálogo",      descripcion: "Completaste Saludos",                     icono: "💬", leccionId: saludos.id },
    { nombre: "Con vos",             descripcion: "Completaste Presentaciones",               icono: "🔗", leccionId: presentaciones.id },
    { nombre: "Orientados",          descripcion: "Completaste Entorno",                      icono: "📋", leccionId: entorno.id },
    { nombre: "Lenguaje compartido", descripcion: "Completaste Emergencia",                   icono: "🗣️", leccionId: emergencia.id },
    // Globales
    { nombre: "Sin errores",         descripcion: "Completaste una lección sin errores",     icono: "⭐", leccionId: null },
    { nombre: "Aprendizaje completo",descripcion: "Completaste todo el contenido",           icono: "🏆", leccionId: null },
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