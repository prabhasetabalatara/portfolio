import React from 'react';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import { TypewriterSection } from './_components/TypewriterSection';
import { InteractiveImageSection } from './_components/InteractiveImageSection';

// ⬇️ Tipe PageProps disamakan dengan layout.tsx
type PageProps = {
  params: Promise<{
    lang: 'en' | 'id';
  }>;
};

export default async function HomePage({ params }: PageProps): Promise<React.ReactElement> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8 transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
        <div className="w-full md:w-1/2 text-center md:text-left text-[var(--foreground)]">
          <TypewriterSection
            content={{
              title: dict.home.leftColumn.greeting,
              subtitle: dict.home.leftColumn.name,
              role: dict.home.leftColumn.roles,
              description: dict.home.leftColumn.description,
            }}
          />
          <p className="mt-6 text-lg text-[var(--foreground)]/70 leading-relaxed max-w-xl mx-auto md:mx-0">
            {dict.home.leftColumn.description}
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link
              href={`/${lang}/about`}
              className="inline-block bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-all"
            >
              About Me
            </Link>
            <Link
              href={`/${lang}/work`}
              className="inline-block bg-transparent border border-cyan-500 text-cyan-500 font-semibold py-3 px-6 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
            >
              Work
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center order-first md:order-last">
          <InteractiveImageSection />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams(): Promise<{ lang: 'en' | 'id' }[]> {
  return [{ lang: 'en' }, { lang: 'id' }];
}
