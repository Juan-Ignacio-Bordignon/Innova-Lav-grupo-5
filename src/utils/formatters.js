// URL Base para Supabase Storage (Bucket público: videos-lsa)
const URL_BASE_VIDEOS =
  "https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/";

// Agrega URL base y formato .mp4 a un único nombre de archivo
const formatSingleUrl = (mediaName, baseUrl) => {
  if (!mediaName || typeof mediaName !== "string") return mediaName;

  const trimmed = mediaName.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `${baseUrl}${trimmed}.mp4`;
};

// Formatea el campo contenidoMultimedia aceptando Strings, Arrays y Strings JSON
export const formatMediaUrls = (items, baseUrl = URL_BASE_VIDEOS) => {
  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    let media = item.contenidoMultimedia;

    if (!media) return item;

    // Si la BD devuelve un Array (text[])
    if (Array.isArray(media)) {
      return {
        ...item,
        contenidoMultimedia: media.map((file) =>
          formatSingleUrl(file, baseUrl),
        ),
      };
    }

    // Fallback por si viene un string simple
    return {
      ...item,
      contenidoMultimedia: formatSingleUrl(media, baseUrl),
    };
  });
};
