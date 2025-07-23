import fs from 'fs';
import path from 'path';

const workDirectory = path.join(process.cwd(), 'content', 'work');

// Tipe bilingual
interface LangText {
  id: string;
  en: string;
}

// Struktur detail proyek
interface ProjectDetails {
  role: string;
  year: string;
  description: LangText;
  images: string[];
  sourceLink: string;
  previewLink: string;
}

// Struktur utama proyek
export interface Project {
  slug: string;
  title: LangText;
  category: LangText;
  thumbnail: string;
  summary: LangText;
  techStack: string[];
  details: ProjectDetails;
}

// Ambil semua proyek (untuk list/preview)
export function getAllProjects(): Project[] {
  const fullPath = path.join(workDirectory, 'projects.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const projects: Project[] = JSON.parse(fileContents);

  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    thumbnail: project.thumbnail,
    summary: project.summary,
    techStack: project.techStack,
    details: project.details
  }));
}

// Ambil proyek berdasarkan slug (untuk detail halaman)
export function getProjectBySlug(slug: string, _lang: string): Project | null {
  const fullPath = path.join(workDirectory, 'projects.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const projects: Project[] = JSON.parse(fileContents);

  return projects.find((project) => project.slug === slug) || null;
}
