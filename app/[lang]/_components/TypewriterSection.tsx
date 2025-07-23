'use client';

import { useEffect, useState } from 'react';

interface TypewriterSectionProps {
  content?: {
    title: string;
    subtitle: string;
    role?: string[];
    description: string;
  };
}

export function TypewriterSection({ content }: TypewriterSectionProps) {
  const [displayedRole, setDisplayedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = content?.role ?? [];

  useEffect(() => {
    if (roles.length === 0) return;

    const currentRole = roles[roleIndex];
    const delay = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayedRole(currentRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setDisplayedRole(currentRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [roles, charIndex, isDeleting, roleIndex]);

  if (!content) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load content.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title with gradient */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold 
                     bg-gradient-to-r from-blue-600 to-purple-600 
                     dark:from-blue-400 dark:to-purple-400 
                     bg-clip-text text-transparent">
        {content.title}
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--foreground)]">
        {content.subtitle}
      </h2>

      {/* Typing Role */}
      <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-blue-600 dark:text-blue-400 h-8">
        {displayedRole}
        <span className="animate-pulse text-[var(--foreground)]">|</span>
      </h3>
    </div>
  );
}
