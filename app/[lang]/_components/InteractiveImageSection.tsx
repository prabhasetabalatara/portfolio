'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

// Komponen untuk menampilkan bagian gambar interaktif di halaman utama
export function InteractiveImageSection() {
  // Membuat motion values untuk melacak posisi mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mengubah posisi mouse menjadi nilai rotasi untuk efek 3D
  // Input range [-100, 100] adalah seberapa jauh mouse bergerak dari tengah
  // Output range [10, -10] adalah derajat rotasi yang dihasilkan
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  // Mengubah posisi mouse untuk pergerakan elemen dekoratif (efek parallax)
  const moveXShape1 = useTransform(x, [-200, 200], [-30, 30]);
  const moveYShape1 = useTransform(y, [-200, 200], [-15, 15]);

  const moveXShape2 = useTransform(x, [-200, 200], [40, -40]);
  const moveYShape2 = useTransform(y, [-200, 200], [20, -20]);

  // Fungsi untuk memperbarui posisi x dan y saat mouse bergerak
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    // Menghitung posisi mouse relatif terhadap tengah elemen
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  // Fungsi untuk mereset posisi saat mouse meninggalkan elemen
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    // Container utama yang mendeteksi gerakan mouse
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }} // Penting untuk efek 3D
      className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto"
    >
      {/* Latar Belakang Lingkaran */}
      <div className="absolute inset-0 bg-gray-800/50 rounded-full shadow-2xl border-2 border-gray-700"></div>

      {/* Gambar Utama (Karakter) dengan efek rotasi */}
      <motion.div
        style={{ x: 0, y: 0, rotateX, rotateY, transition: 'transform 0.1s ease-out' }}
        className="absolute inset-5"
      >
        <Image 
          src="/images/character.png" // Ganti dengan path gambarmu
          alt="Foto Profil"
          fill
          style={{ objectFit: 'contain' }}
          priority // Prioritaskan pemuatan gambar ini
        />
      </motion.div>
      
      {/* Elemen Dekoratif 1 dengan efek parallax */}
      <motion.div
        style={{ x: moveXShape1, y: moveYShape1, transition: 'transform 0.1s ease-out' }}
        className="absolute top-10 left-5 w-16 h-16"
      >
          <Image src="/images/shape-react.svg" alt="React" fill />
      </motion.div>

      {/* Elemen Dekoratif 2 dengan efek parallax */}
      <motion.div
        style={{ x: moveXShape2, y: moveYShape2, transition: 'transform 0.1s ease-out' }}
        className="absolute bottom-10 right-5 w-20 h-20"
      >
          <Image src="/images/shape-figma.svg" alt="Figma" fill />
      </motion.div>
    </motion.div>
  );
}
