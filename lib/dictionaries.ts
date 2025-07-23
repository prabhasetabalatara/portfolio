import 'server-only';

// Tipe untuk locale agar lebih aman dan terbatas hanya pada 'en' dan 'id'
export type Locale = 'en' | 'id';

// Objek yang memetakan kode bahasa ke fungsi impor dinamis.
// Ini memungkinkan kita untuk memuat file JSON terjemahan hanya saat dibutuhkan.
const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  id: () => import('../dictionaries/id.json').then((module) => module.default),
};

// Fungsi async untuk mengambil kamus yang sesuai berdasarkan locale.
// Fungsi ini akan dipanggil di dalam Server Components (layout.tsx, page.tsx).
export const getDictionary = async (locale: Locale) => {
  // Memeriksa apakah locale yang diminta ada di dalam objek dictionaries,
  // jika tidak, default ke 'id'.
  const loader = dictionaries[locale] || dictionaries.id;
  return loader();
};
