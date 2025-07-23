import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(locale: 'id' | 'en') {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter(fileName => fileName.endsWith(`.${locale}.mdx`))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title || '',
        slug: data.slug || '',
        author: data.author || '',
        date: data.date || '',
        summary: data.summary || '',
        image: data.image || null, // tambahkan gambar dari frontmatter
      };
    });

  // Urutkan postingan dari yang terbaru ke yang terlama
  return allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getPostBySlug(slug: string, locale: 'id' | 'en') {
  const fileName = `${slug}.${locale}.mdx`;
  const fullPath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      title: data.title || '',
      slug: data.slug || '',
      author: data.author || '',
      date: data.date || '',
      summary: data.summary || '',
      image: data.image || null, // gambar ikut dimasukkan
    },
    content,
  };
}
