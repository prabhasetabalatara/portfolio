'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Code, Eye } from 'lucide-react';

type Project = {
  title: string;
  category: string;
  techStack: string[];
  details: {
    role: string;
    year: string;
    description: string;
    images: string[];
    sourceLink?: string;
    previewLink?: string;
  };
};

type Dictionary = {
  workPage: {
    detail: {
      sidebarTitle: string;
      roleLabel: string;
      yearLabel: string;
      techLabel: string;
      aboutTitle: string;
      galleryTitle: string;
    };
  };
};

export default function WorkDetailClient({
  project,
  dict,
}: {
  project: Project;
  dict: Dictionary;
}) {
  const content = dict.workPage.detail;
  const { title, category, techStack, details } = project;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Proyek */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-semibold">{category}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)] mt-2">{title}</h1>
        </div>

        {/* Gambar Utama Proyek */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl mb-12">
          <Image
            src={details.images[0]}
            alt={`Gambar utama untuk ${title}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Detail dan Deskripsi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar Detail */}
          <aside className="md:col-span-1">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">{content.sidebarTitle}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <User size={18} className="text-cyan-400 mt-1" />
                  <div>
                    <span className="text-sm text-[var(--foreground)]">{content.roleLabel}</span>
                    <p className="font-semibold text-white">{details.role}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar size={18} className="text-cyan-400 mt-1" />
                  <div>
                    <span className="text-sm text-[var(--foreground)]">{content.yearLabel}</span>
                    <p className="font-semibold text-white">{details.year}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Code size={18} className="text-cyan-400 mt-1" />
                  <div>
                    <span className="text-sm text-[var(--foreground)]">{content.techLabel}</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-700 text-xs font-medium text-white px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>

                {details.sourceLink && (
                  <li className="flex items-center gap-3">
                    <Code size={18} className="text-green-400" />
                    <a
                      href={details.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-colors font-medium"
                    >
                      Source Code
                    </a>
                  </li>
                )}

                {details.previewLink && (
                  <li className="flex items-center gap-3">
                    <Eye size={18} className="text-blue-400" />
                    <a
                      href={details.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors font-medium"
                    >
                      Live Preview
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </aside>

          {/* Konten Utama */}
          <main className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">{content.aboutTitle}</h2>
            <p className="text-[var(--foreground)] leading-relaxed">{details.description}</p>
          </main>
        </div>

        {/* Galeri Gambar Tambahan */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">{content.galleryTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {details.images.map((img, index) => (
              <motion.div
                key={index}
                className="relative w-full h-80 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(img)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Image
                  src={img}
                  alt={`Gambar proyek ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal Gambar */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
              >
                <Image
                  src={selectedImage}
                  alt="Gambar proyek"
                  width={1000}
                  height={800}
                  className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
