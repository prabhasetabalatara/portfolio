import { getProjectBySlug, getWorkData } from '@/lib/work';
import { notFound } from 'next/navigation';
import WorkDetailClient from '../_components/WorkDetailClient';

type WorkDetailPageProps = {
  params: Promise<{
    lang: 'en' | 'id';
    slug: string;
  }>;
};

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug);
  const workData = getWorkData();

  if (!project) {
    notFound();
  }

  // Konversi data proyek ke format yang dibutuhkan client component
  const projectData = {
    title: project.title[lang],
    category: project.category[lang],
    techStack: project.techStack,
    details: {
      role: project.details.role[lang],
      year: project.details.year,
      description: project.details.description[lang],
      images: project.details.images,
      sourceLink: project.details.sourceLink,
      previewLink: project.details.previewLink,
    },
  };

  // Labels untuk detail page
  const labels = {
    sidebarTitle: workData.detail.sidebarTitle[lang],
    roleLabel: workData.detail.roleLabel[lang],
    yearLabel: workData.detail.yearLabel[lang],
    techLabel: workData.detail.techLabel[lang],
    aboutTitle: workData.detail.aboutTitle[lang],
    galleryTitle: workData.detail.galleryTitle[lang],
    sourceCode: workData.detail.sourceCode[lang],
    livePreview: workData.detail.livePreview[lang],
  };

  return <WorkDetailClient project={projectData} labels={labels} />;
}
