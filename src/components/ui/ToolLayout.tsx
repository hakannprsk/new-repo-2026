'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import type { Tool } from '@/data/tools';

const CATEGORY_LABELS: Record<string, string> = {
  text: 'Metin & Şifre',
  webdev: 'Web Geliştirme',
  image: 'Görsel & Renk',
  file: 'Dosya Araçları',
  network: 'Ağ & Güvenlik',
};

const CATEGORY_COLORS: Record<string, string> = {
  text: 'text-violet-400',
  webdev: 'text-cyan-400',
  image: 'text-emerald-400',
  file: 'text-amber-400',
  network: 'text-red-400',
};

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  // @ts-ignore
  const IconComponent = (Icons[tool.icon] as React.ComponentType<{ size?: number }>) ?? Icons.Wrench;
  const categoryColor = CATEGORY_COLORS[tool.category] ?? 'text-violet-400';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--text-secondary)] transition-colors">
          Ana Sayfa
        </Link>
        <Icons.ChevronRight size={14} />
        <Link href={`/#${tool.category}`} className={`hover:text-[var(--text-secondary)] transition-colors ${categoryColor}`}>
          {CATEGORY_LABELS[tool.category]}
        </Link>
        <Icons.ChevronRight size={14} />
        <span className="text-[var(--text-secondary)]">{tool.name}</span>
      </nav>

      {/* Tool header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/30 to-purple-800/30 border border-violet-500/20 flex items-center justify-center">
            <IconComponent size={22} className="text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                {tool.name}
              </h1>
              {tool.new && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20 font-semibold">
                  YENİ
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--text-muted)]">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Tool content */}
      <div className="glass-card rounded-2xl p-6">
        {children}
      </div>

      {/* Privacy note */}
      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Icons.ShieldCheck size={13} className="text-emerald-400" />
        <span>Tüm işlemler tarayıcınızda yapılır — verileriniz hiçbir zaman sunucuya gönderilmez.</span>
      </div>
    </div>
  );
}
