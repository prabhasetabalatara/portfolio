
import { getWorkData } from '@/lib/work';
import WorkView from './_components/WorkView';

type WorkPageProps = {
  params: Promise<{
    lang: 'en' | 'id';
  }>;
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { lang } = await params;
  const data = getWorkData();

  return (
    <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
      {/* Judul   Halaman */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
          {data.hero.title[lang]}
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--foreground)]/70">
          {data.hero.description[lang]}
        </p>
      </div>

      {/* Daftar Proyek */}
      <div className="mb-24">
        <WorkView 
          projects={data.projects}
          lang={lang} allLabel={'Semua'} />
      </div>
    </div>
  );
}
