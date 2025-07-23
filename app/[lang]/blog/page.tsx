import { getAllPosts } from '@/lib/posts';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import type { Locale } from '@/lib/dictionaries'; // Import Locale type

// ✅ Define PageProps type dengan Promise untuk Next.js 13+
type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

// ✅ Define Post type untuk better type safety
type Post = {
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  image?: string;
};

export default async function BlogPage({ params }: PageProps) {
  // ✅ Await params untuk mendapatkan nilai lang
  const { lang } = await params;
  
  const posts = getAllPosts(lang as 'id' | 'en') as Post[];
  const dict = await getDictionary(lang as Locale);
  const content = dict.blogPage;

  return (
    <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
      {/* Judul Halaman */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
          {content.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-400">{content.subtitle}</p>
      </div>

      {/* Daftar Postingan */}
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
              <div className="bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all duration-300 h-full flex flex-col overflow-hidden group">
                {post.image && (
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-justify text-[var(--foreground)] mb-4 flex-grow line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString(lang)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">
            {lang === 'id' ? 'Belum ada postingan.' : 'No posts available.'}
          </p>
        </div>
      )}
    </div>
  );
}

// ✅ Tambahkan generateStaticParams untuk static generation
export async function generateStaticParams(): Promise<{ lang: string }[]> {
  return [
    { lang: 'en' },
    { lang: 'id' },
  ];
}

// ✅ Tambahkan generateMetadata untuk SEO
export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const content = dict.blogPage;
  
  return {
    title: content.title,
    description: content.subtitle,
    openGraph: {
      title: content.title,
      description: content.subtitle,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.subtitle,
    },
  };
}