import { getAllProjects } from '@/lib/work';
import WorkView from './_components/WorkView';

// ⬇️ Disamakan dengan layout.tsx
type WorkPageProps = {
  params: Promise<{
    lang: 'en' | 'id';
  }>;
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { lang } = await params;
  const projects = getAllProjects();

  return (
    <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
      {/* Judul Halaman */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
          {lang === 'id' ? 'Projek' : 'Projects'}
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--foreground)]/70">
          {lang === 'id'
            ? 'Berikut adalah beberapa proyek yang pernah saya kerjakan.'
            : 'Here are some of the projects I’ve worked on.'}
        </p>
      </div>

      {/* Daftar Proyek */}
      <div className="mb-24">
        <WorkView projects={projects} lang={lang} />
      </div>
    </div>
  );
}
