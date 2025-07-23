'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname, useParams } from 'next/navigation';
import { Moon, Sun, Home, User, Briefcase, Pen, Image } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { labelKey: 'home', href: '/', icon: <Home size={18} /> },
  { labelKey: 'about', href: '/about', icon: <User size={18} /> },
  { labelKey: 'work', href: '/work', icon: <Briefcase size={18} /> },
  { labelKey: 'blog', href: '/blog', icon: <Pen size={18} /> },
  { labelKey: 'gallery', href: '/gallery', icon: <Image size={18} /> },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPath = pathname.replace(/\/$/, '');

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-2xl border border-zinc-200 bg-white/60 px-2 py-1 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/60 md:top-4 md:bottom-auto">
      {navItems.map((item) => {
        const itemPath = item.href === '/' ? `/${lang}` : `/${lang}${item.href}`;
        const isActive = currentPath === itemPath;

        return (
          <Link
            key={item.href}
            href={itemPath}
            aria-label={item.labelKey}
            className={`rounded-xl p-2 transition-colors ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
                : 'text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            {item.icon}
          </Link>
        );
      })}

      {/* Theme Switcher */}
      <button
        aria-label="Toggle Theme"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="rounded-xl p-2 text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {mounted ? (
          theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />
        ) : (
          <div className="w-[18px] h-[18px]" />
        )}
      </button>

      {/* Language Switcher */}
      <Link
        href={pathname.replace(`/${lang}`, lang === 'en' ? '/id' : '/en')}
        aria-label="Toggle Language"
        className="rounded-xl p-2 text-sm text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {lang === 'en' ? 'ID' : 'EN'}
      </Link>
    </nav>
  );
}
