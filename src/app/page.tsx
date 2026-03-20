'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { TOOLS, CATEGORIES, getToolsByCategory } from '@/data/tools';
import type { ToolCategory } from '@/data/tools';
import ToolCard from '@/components/ui/ToolCard';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    let tools = TOOLS;
    if (activeCategory !== 'all') {
      tools = tools.filter((t) => t.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q))
      );
    }
    return tools;
  }, [activeCategory, searchQuery]);

  const featuredTools = TOOLS.filter((t) => t.featured);

  const CATEGORY_ICONS: Record<string, React.ElementType> = {
    text: Icons.Type,
    webdev: Icons.Code2,
    image: Icons.Image,
    file: Icons.FileBox,
    network: Icons.Shield,
  };

  const CATEGORY_GRADIENTS: Record<string, string> = {
    text: 'from-violet-600/20 to-purple-900/10 border-violet-500/20',
    webdev: 'from-cyan-600/20 to-blue-900/10 border-cyan-500/20',
    image: 'from-emerald-600/20 to-teal-900/10 border-emerald-500/20',
    file: 'from-amber-600/20 to-orange-900/10 border-amber-500/20',
    network: 'from-red-600/20 to-rose-900/10 border-red-500/20',
  };

  const CATEGORY_TEXT: Record<string, string> = {
    text: 'text-violet-400',
    webdev: 'text-cyan-400',
    image: 'text-emerald-400',
    file: 'text-amber-400',
    network: 'text-red-400',
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6 opacity-0 animate-fade-up stagger-1">
            <Icons.Sparkles size={14} />
            50+ Ücretsiz Araç · Tarayıcıda Çalışır
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-6 opacity-0 animate-fade-up stagger-2">
            Dijital araçların
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              kralı burada
            </span>
          </h1>

          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up stagger-3">
            Dosya dönüştürme, görsel düzenleme, metin manipülasyonu, web araçları ve daha fazlası — hepsi ücretsiz, hızlı ve tamamen tarayıcınızda.
          </p>

          {/* Main search */}
          <div className="relative max-w-lg mx-auto opacity-0 animate-fade-up stagger-4">
            <Icons.Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Hangi aracı arıyorsunuz?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-space-800/80 border border-[var(--border-default)] rounded-2xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-violet-500/60 focus:shadow-glow-violet transition-all text-base backdrop-blur-sm"
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-10 opacity-0 animate-fade-up stagger-5">
            {[
              { value: '55+', label: 'Araç' },
              { value: '100%', label: 'Ücretsiz' },
              { value: '0 KB', label: 'Veri Paylaşımı' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const IconComp = CATEGORY_ICONS[cat.id] ?? Icons.Folder;
            const isActive = activeCategory === cat.id;
            const toolCount = getToolsByCategory(cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(isActive ? 'all' : cat.id);
                  setSearchQuery('');
                }}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-200 group ${
                  isActive
                    ? `bg-gradient-to-br ${CATEGORY_GRADIENTS[cat.id]} border-current shadow-lg`
                    : 'glass-card hover:border-white/10'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${
                    isActive ? `${CATEGORY_TEXT[cat.id]} bg-white/10` : 'bg-white/5 text-[var(--text-muted)] group-hover:text-white'
                  }`}
                >
                  <IconComp size={18} />
                </div>
                <div
                  className={`font-display font-semibold text-sm ${
                    isActive ? CATEGORY_TEXT[cat.id] : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {cat.label}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">{toolCount} araç</div>
              </button>
            );
          })}
        </div>

        {/* Featured tools (shown when no filter active) */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display font-bold text-xl text-white">⭐ Öne Çıkan Araçlar</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/20 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredTools.map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* All / filtered tools */}
        {CATEGORIES.filter((c) => activeCategory === 'all' || activeCategory === c.id).map((cat) => {
          const catTools = filteredTools.filter((t) => t.category === cat.id);
          if (catTools.length === 0) return null;
          const IconComp = CATEGORY_ICONS[cat.id] ?? Icons.Folder;

          return (
            <div key={cat.id} id={cat.id} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className={`flex items-center gap-2 ${CATEGORY_TEXT[cat.id]}`}>
                  <IconComp size={20} />
                  <h2 className="font-display font-bold text-xl text-white">{cat.label}</h2>
                </div>
                <span className="text-xs text-[var(--text-muted)] px-2 py-0.5 rounded-full bg-white/5">
                  {catTools.length} araç
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catTools.map((tool, i) => (
                  <ToolCard key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </div>
          );
        })}

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <Icons.SearchX size={40} className="text-[var(--text-muted)] mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg text-[var(--text-secondary)] mb-2">
              Sonuç bulunamadı
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              "{searchQuery}" için sonuç yok. Farklı anahtar kelimeler deneyin.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
