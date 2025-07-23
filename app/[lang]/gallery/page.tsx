import { getGalleryImages } from '@/lib/gallery';
import { getDictionary } from '@/lib/dictionaries';
import GalleryView from './_components/GalleryView';

// ✅ Definisi tipe yang benar untuk Next.js 13+
type GalleryPageProps = {
  params: Promise<{
    lang: 'en' | 'id';
  }>;
};

export default async function GalleryPage({ params }: GalleryPageProps) {
  // ✅ Await params untuk mendapatkan nilai lang
  const { lang } = await params;
  
  const images = getGalleryImages();

  return (
    <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
      {/* Judul Halaman */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
          {lang === 'id' ? 'Galeri' : 'Gallery'}
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-400">
          {lang === 'id'
            ? 'Koleksi desain, branding, dan ilustrasi yang pernah saya buat.'
            : 'A collection of designs, branding, and illustrations I have created.'}
        </p>
      </div>

      {/* Tampilkan komponen interaktif galeri */}
      <GalleryView images={images} lang={lang} />
    </div>
  );
}

// ✅ Tambahkan generateStaticParams untuk static generation
export async function generateStaticParams(): Promise<{ lang: 'en' | 'id' }[]> {
  return [
    { lang: 'en' },
    { lang: 'id' },
  ];
}

// ✅ Tambahkan generateMetadata untuk SEO yang lebih baik
export async function generateMetadata({ params }: GalleryPageProps) {
  const { lang } = await params;
  
  // Jika Anda memiliki dictionary untuk gallery page
  // const dict = await getDictionary(lang);
  // const content = dict.galleryPage;
  
  const title = lang === 'id' ? 'Galeri' : 'Gallery';
  const description = lang === 'id' 
    ? 'Koleksi desain, branding, dan ilustrasi yang pernah saya buat.'
    : 'A collection of designs, branding, and illustrations I have created.';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: '/images/gallery-og.jpg', // Sesuaikan dengan gambar OG Anda
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/gallery-og.jpg'], // Sesuaikan dengan gambar Twitter card Anda
    },
  };
}