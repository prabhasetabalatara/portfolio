'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type Image = {
  src: string;
  title: string;
  category: string;
  width: number;
  height: number;
};

export default function GalleryView({ images, lang }: { images: Image[], lang: 'id' | 'en' }) {
  const allCategories = [lang === 'id' ? 'Semua' : 'All', ...Array.from(new Set(images.map(img => img.category)))];
  const [filter, setFilter] = useState(allCategories[0]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const filteredImages = filter === allCategories[0]
    ? images
    : images.filter(img => img.category === filter);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
        {allCategories.map(category => (
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

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
        {filteredImages.map((image, index) => (
          <motion.div
            key={index}
            className="mb-4 break-inside-avoid cursor-pointer"
            onClick={() => setSelectedImage(image)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Image
              src={image.src}
              alt={image.title}
              width={image.width}
              height={image.height}
              className="rounded-lg w-full h-auto"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
