'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

type LocalizedText = {
  id: string;
  en: string;
};

type Project = {
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  thumbnail: string;
  summary: LocalizedText;
};

export default function WorkView({ projects, lang }: { projects: Project[], lang: 'id' | 'en' }) {
  const getCategory = (p: Project) => p.category[lang];

  const allLabel = lang === 'id' ? 'Semua' : 'All';
  const allCategories = [allLabel, ...Array.from(new Set(projects.map(getCategory)))];
  const [filter, setFilter] = useState(allCategories[0]);

  const filteredProjects =
    filter === allLabel
      ? projects
      : projects.filter((p) => getCategory(p) === filter);

  return (
    <>
      {/* Tombol Filter */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
              filter === category
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Proyek */}
      <div className="grid gap-8 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/${lang}/work/${project.slug}`}>
              <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden group h-full flex flex-col">
                <div className="relative w-full h-60">
                  <Image
                    src={project.thumbnail}
                    alt={project.title[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-sm font-semibold text-cyan-400 mb-1">
                    {project.category[lang]}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title[lang]}</h3>
                  <p className="text-[var(--foreground)] flex-grow">
                    {project.summary[lang]}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
