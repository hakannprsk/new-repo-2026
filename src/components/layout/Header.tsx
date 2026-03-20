'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Zap } from 'lucide-react';
import { searchTools } from '@/data/tools';
import type { Tool } from '@/data/tools';

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      setResults(searchTools(query).slice(0, 6));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const navLinks = [
    { label: 'Metin', href: '/#text' },
    { label: 'Web Dev', href: '/#webdev' },
    { label: 'Görsel', href: '/#image' },
    { label: 'Dosya', href: '/#file' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-space-900/90 backdrop-blur-xl border-b border-violet-500/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-glow-violet group-hover:scale-110 transition-transform">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Kral<span className="text-violet-400">Tools</span>
            </span>
          </Link>

          {/* Nav — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                placeholder="Araç ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => query.length > 1 && setShowResults(true)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-space-800/60 border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-violet-500/50 focus:bg-space-800 transition-all"
              />
            </div>
            {showResults && results.length > 0 && (
              <div className="absolute top-full mt-2 w-full glass-card rounded-xl overflow-hidden z-50">
                {results.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{tool.name}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">{tool.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[var(--border-subtle)] mt-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
