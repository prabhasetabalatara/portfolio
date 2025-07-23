import { getProjectBySlug } from '@/lib/work';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';
import WorkDetailClient from './WorkDetailClient';

// ✅ Samakan dengan layout.tsx: params adalah Promise
interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
    lang: 'id' | 'en';
  }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug, lang } = await params;
  const projectRaw = getProjectBySlug(slug, lang);
  const dict = await getDictionary(lang);

  if (!projectRaw) notFound();

  const project = {
    ...projectRaw,
    title: projectRaw.title[lang],
    category: projectRaw.category[lang],
    summary: projectRaw.summary[lang],
    details: {
      ...projectRaw.details,
      description: projectRaw.details.description[lang],
    },
  };

  return <WorkDetailClient project={project} dict={dict} />;
}
