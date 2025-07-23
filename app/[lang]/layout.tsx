import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portofolio Kang Diki',
  description: 'Portofolio Kang Diki - Desainer UI/UX, Frontend Developer, dan Ilustrator',
};

// ✅ Definisi tipe yang benar untuk Next.js 13+
type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: 'en' | 'id' }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // ✅ Await params untuk mendapatkan nilai lang
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

// ✅ Update generateStaticParams dengan return type yang eksplisit
export async function generateStaticParams(): Promise<{ lang: 'en' | 'id' }[]> {
  return [
    { lang: 'en' }, 
    { lang: 'id' }
  ];
}

// ✅ Opsional: Tambahkan generateMetadata dinamis jika diperlukan
/*
export async function generateMetadata({ params }: RootLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: lang === 'id' ? 'Portofolio Kang Diki' : 'Kang Diki Portfolio',
    description: lang === 'id' 
      ? 'Portofolio Kang Diki - Desainer UI/UX, Frontend Developer, dan Ilustrator'
      : 'Kang Diki Portfolio - UI/UX Designer, Frontend Developer, and Illustrator',
    openGraph: {
      title: lang === 'id' ? 'Portofolio Kang Diki' : 'Kang Diki Portfolio',
      description: lang === 'id' 
        ? 'Portofolio Kang Diki - Desainer UI/UX, Frontend Developer, dan Ilustrator'
        : 'Kang Diki Portfolio - UI/UX Designer, Frontend Developer, and Illustrator',
      type: 'website',
      locale: lang === 'id' ? 'id_ID' : 'en_US',
    },
  };
}
*/