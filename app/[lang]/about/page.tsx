// app/[lang]/about/page.tsx
import { getDictionary } from '@/lib/dictionaries';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Briefcase,
  Code,
  Figma,
  GitBranch,
  GraduationCap,
  Wind,
  Book,
  FlaskConical,
  Wrench,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from 'lucide-react';

// ✅ Definisi tipe PageProps yang benar untuk Next.js 13+
type PageProps = {
  params: Promise<{
    lang: 'id' | 'en';
  }>;
};

type AboutPageContent = {
  title: string;
  subtitle: string;
  bioTitle: string;
  bio: string;
  bio2: string;
  skillsTitle: string;
  experienceTitle: string;
  timeline: {
    role: string;
    company: string;
    date: string;
    description: string;
  }[];
  ctaTitle: string;
  ctaButton: string;
  hobbies?: string[];
  socials?: {
    linkedin: string;
    facebook: string;
    youtube: string;
    instagram: string;
    whatsapp: string;
  };
};

// ✅ Perbaiki parameter function dengan Promise
export default async function AboutPage({ params }: PageProps) {
  // ✅ Await params untuk mendapatkan nilai lang
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const content = dict?.aboutPage as unknown as AboutPageContent;
  const name = dict?.home?.leftColumn?.name || '';

  if (!content) {
    return (
      <div className="container mx-auto px-6 py-24 text-center text-red-500">
        Failed to load content.
      </div>
    );
  }

  const skills = [
    { name: 'Figma', icon: <Figma size={32} className="text-pink-500" /> },
    { name: 'React', icon: <Code size={32} className="text-cyan-400" /> },
    { name: 'Next.js', icon: <Code size={32} className="text-gray-800 dark:text-white" /> },
    { name: 'JavaScript', icon: <Code size={32} className="text-yellow-400" /> },
    { name: 'TypeScript', icon: <Code size={32} className="text-blue-500" /> },
    { name: 'Tailwind CSS', icon: <Wind size={32} className="text-teal-400" /> },
    { name: 'Node.js', icon: <Code size={32} className="text-green-500" /> },
    { name: 'Git', icon: <GitBranch size={32} className="text-orange-500" /> },
  ];

  const pekerjaan = content.timeline.filter((item) =>
    ['petani', 'developer', 'staf', 'freelancer', 'panwaslu', 'penulis', 'pekerjaan'].some((role) =>
      item.role.toLowerCase().includes(role)
    )
  );

  const pendidikan = content.timeline.filter((item) =>
    ['siswa', 'mahasiswa', 'sarjana'].some((role) =>
      item.role.toLowerCase().includes(role)
    )
  );

  const hobbies = content.hobbies || [
    'Membaca buku dan artikel berbagai topik',
    'Utak-atik perangkat lunak dan sistem',
    'Bereksperimen dan mencoba hal-hal baru',
  ];

  const socials = content.socials || {
    linkedin: '#',
    facebook: '#',
    youtube: '#',
    instagram: '#',
    whatsapp: '#',
  };

  return (
    <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
          {content.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--foreground)]/70">
          {content.subtitle}
        </p>
      </div>

      {/* Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-24">
        <div className="lg:col-span-2">
          <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/profile-placeholder.png"
              alt="Foto Profil"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-4">
            {content.bioTitle}
          </h2>
          <p className="leading-relaxed mb-4 text-[var(--foreground)]/90 text-justify">
            {content.bio.replaceAll('[Nama Kamu]', name)}
          </p>
          <p className="leading-relaxed text-[var(--foreground)]/90 text-justify">
            {content.bio2}
          </p>
        </div>
      </div>

      {/* Social Media */}
      <div className="text-center mb-24">
        <h2 className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-6">
          Sosial Media
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link href={socials.linkedin} target="_blank">
            <Linkedin />
          </Link>
          <Link href={socials.facebook} target="_blank">
            <Facebook />
          </Link>
          <Link href={socials.instagram} target="_blank">
            <Instagram />
          </Link>
          <Link href={socials.youtube} target="_blank">
            <Youtube />
          </Link>
          <Link href={socials.whatsapp} target="_blank">
            <MessageCircle />
          </Link>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500 dark:text-cyan-400">
          {content.skillsTitle}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-3 p-4 rounded-xl border transition-colors
                bg-[var(--background)]
                text-[var(--foreground)]
                border-gray-200 dark:border-neutral-700
                hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {skill.icon}
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pengalaman Kerja */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500 dark:text-cyan-400">
          Pengalaman Kerja
        </h2>
        <div className="relative border-l-2 border-cyan-500/30 ml-6">
          {pekerjaan.map((item, index) => (
            <div key={index} className="mb-10 ml-10">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-neutral-900 rounded-full -left-4 border-2 border-cyan-500">
                <Briefcase className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              </span>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.role}</h3>
              <p className="block mb-2 text-sm text-[var(--foreground)]/70">
                {item.company} | {item.date}
              </p>
              <p className="text-base text-[var(--foreground)]/90">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pendidikan */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500 dark:text-cyan-400">
          Pendidikan
        </h2>
        <div className="relative border-l-2 border-cyan-500/30 ml-6">
          {pendidikan.map((item, index) => (
            <div key={index} className="mb-10 ml-10">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-neutral-900 rounded-full -left-4 border-2 border-cyan-500">
                <GraduationCap className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              </span>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.role}</h3>
              <p className="block mb-2 text-sm text-[var(--foreground)]/70">
                {item.company} | {item.date}
              </p>
              <p className="text-base text-[var(--foreground)]/90">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hobi */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500 dark:text-cyan-400">
          Hobi
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {hobbies.map((hobi, index) => (
            <li
              key={index}
              className="flex items-center justify-center gap-2
                text-[var(--foreground)]
                bg-[var(--background)]
                p-4 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-sm"
            >
              {hobi.toLowerCase().includes('baca') && <Book />}
              {hobi.toLowerCase().includes('utak') && <Wrench />}
              {hobi.toLowerCase().includes('eksperimen') && <FlaskConical />}
              <span>{hobi}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ✅ Update generateStaticParams juga untuk konsistensi
export async function generateStaticParams(): Promise<{ lang: 'id' | 'en' }[]> {
  return [
    { lang: 'en' },
    { lang: 'id' },
  ];
}

// ✅ Opsional: Tambahkan generateMetadata jika diperlukan
export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const content = dict?.aboutPage as unknown as AboutPageContent;
  
  return {
    title: content?.title || 'About',
    description: content?.subtitle || 'About me page',
  };
}