// src/utils/racha.utils.js

/**
 * Calcula cómo debe actualizarse la racha de un usuario
 * según la fecha de su última actividad.
 *
 * Reglas:
 * - Si nunca tuvo actividad -> racha arranca en 1
 * - Si la última actividad fue HOY -> no cambia nada (ya contó hoy)
 * - Si la última actividad fue AYER -> la racha sube +1
 * - Si la última actividad fue antes de ayer -> la racha se reinicia a 1
 */
export function calcularNuevaRacha(ultimaActividad, rachaActual) {
  const hoy = new Date();
  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);

  // Primera vez que el usuario practica
  if (!ultimaActividad) {
    return { rachaActual: 1, ultimaActividad: hoy };
  }

  const ultima = new Date(ultimaActividad);

  const esMismoDia = ultima.toDateString() === hoy.toDateString();
  const fueAyer = ultima.toDateString() === ayer.toDateString();

  if (esMismoDia) {
    // Ya practicó hoy, no tocamos la racha
    return { rachaActual, ultimaActividad: ultima };
  }

  if (fueAyer) {
    // Practicó ayer, la racha sube
    return { rachaActual: rachaActual + 1, ultimaActividad: hoy };
  }

  // Se saltó uno o más días, la racha se reinicia
  return { rachaActual: 1, ultimaActividad: hoy };
}