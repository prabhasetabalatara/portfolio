import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';

// Komponen MDX kustom
const components = {
  Image,
};

// ✅ Tipe parameter yang benar untuk Next.js 13+ dengan Promise
type Props = {
  params: Promise<{
    lang: 'id' | 'en';
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  // ✅ Await params untuk mendapatkan nilai lang dan slug
  const { lang, slug } = await params;
  
  const post = await getPostBySlug(slug, lang);
  if (!post) notFound();

  const hasInlineImage = post.content.includes('<Image');

  return (
    <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
      <article className="max-w-3xl mx-auto">
        {post.meta.image && !hasInlineImage && (
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={post.meta.image}
              alt={post.meta.title}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)]">
            {post.meta.title}
          </h1>
          <div className="flex items-center justify-center gap-6 mt-6 text-gray-400">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.meta.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(post.meta.date).toLocaleDateString(lang)}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-justify text-[var(--foreground)]">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>
    </div>
  );
}

// ✅ Tambahkan generateStaticParams jika diperlukan (untuk static generation)
export async function generateStaticParams(): Promise<{ lang: 'id' | 'en'; slug: string }[]> {
  // Implementasi ini tergantung pada bagaimana Anda mendapatkan daftar post
  // Contoh implementasi:
  /*
  const posts = await getAllPosts();
  return posts.flatMap(post => [
    { lang: 'id', slug: post.slug },
    { lang: 'en', slug: post.slug }
  ]);
  */
  
  // Untuk sementara return array kosong, sesuaikan dengan kebutuhan Anda
  return [];
}

// ✅ Tambahkan generateMetadata untuk SEO yang lebih baik
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug, lang);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.meta.title,
    summary: post.meta.summary || post.meta.title,
    authors: [{ name: post.meta.author }],
    openGraph: {
      title: post.meta.title,
      summary: post.meta.summary || post.meta.title,
      images: post.meta.image ? [post.meta.image] : [],
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      summary: post.meta.summary || post.meta.title,
      images: post.meta.image ? [post.meta.image] : [],
    },
  };
}