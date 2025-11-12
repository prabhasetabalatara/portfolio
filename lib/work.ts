import fs from 'fs';
import path from 'path';

const workDirectory = path.join(process.cwd(), 'content', 'work');

interface LangText {
  id: string;
  en: string;
}

interface ProjectDetails {
  role: LangText;
  year: string;
  description: LangText;
  images: string[];
  sourceLink?: string;
  previewLink?: string;
}

export interface Project {
  slug: string;
  title: LangText;
  category: LangText;
  thumbnail: string;
  summary: LangText;
  techStack: string[];
  details: ProjectDetails;
}

export interface WorkData {
  hero: {
    title: LangText;
    description: LangText;
  };
  filter: {
    allLabel: LangText;
  };
  detail: {
    sidebarTitle: LangText;
    roleLabel: LangText;
    yearLabel: LangText;
    techLabel: LangText;
    aboutTitle: LangText;
    galleryTitle: LangText;
    sourceCode: LangText;
    livePreview: LangText;
  };
  projects: Project[];
}

export function getWorkData(): WorkData {
  const fullPath = path.join(workDirectory, 'work.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const data: WorkData = JSON.parse(fileContents);
  
  return data;
}

export function getAllProjects(): Project[] {
  const data = getWorkData();
  return data.projects;
}

export function getProjectBySlug(slug: string): Project | null {
  const data = getWorkData();
  return data.projects.find((project) => project.slug === slug) || null;
}
