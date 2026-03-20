'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import type { Tool } from '@/data/tools';

const CATEGORY_COLORS: Record<string, { border: string; glow: string; badge: string; icon: string }> = {
  text: {
    border: 'rgba(124, 58, 237, 0.3)',
    glow: 'rgba(124, 58, 237, 0.15)',
    badge: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
    icon: 'bg-violet-500/15 text-violet-400',
  },
  webdev: {
    border: 'rgba(8, 145, 178, 0.3)',
    glow: 'rgba(8, 145, 178, 0.15)',
    badge: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    icon: 'bg-cyan-500/15 text-cyan-400',
  },
  image: {
    border: 'rgba(5, 150, 105, 0.3)',
    glow: 'rgba(5, 150, 105, 0.15)',
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    icon: 'bg-emerald-500/15 text-emerald-400',
  },
  file: {
    border: 'rgba(217, 119, 6, 0.3)',
    glow: 'rgba(217, 119, 6, 0.15)',
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    icon: 'bg-amber-500/15 text-amber-400',
  },
  network: {
    border: 'rgba(220, 38, 38, 0.3)',
    glow: 'rgba(220, 38, 38, 0.15)',
    badge: 'bg-red-500/10 text-red-400 border border-red-500/20',
    icon: 'bg-red-500/15 text-red-400',
  },
};

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const colors = CATEGORY_COLORS[tool.category] ?? CATEGORY_COLORS.text;

  // @ts-ignore
  const IconComponent = (Icons[tool.icon] as React.ComponentType<{ size?: number }>) ?? Icons.Wrench;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${colors.border}, 0 0 50px ${colors.glow}`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      boxShadow: '',
    });
    setIsHovered(false);
  };

  const delay = (index % 6) * 0.05;

  return (
    <Link href={`/tools/${tool.slug}`} className="block" tabIndex={-1}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="glass-card rounded-2xl p-5 cursor-pointer opacity-0 animate-fade-up h-full"
        style={{
          ...style,
          animationDelay: `${delay}s`,
          animationFillMode: 'forwards',
          transition: isHovered
            ? 'transform 0.05s ease, box-shadow 0.05s ease'
            : 'transform 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon}`}>
            <IconComponent size={18} />
          </div>
          <div className="flex gap-1.5">
            {tool.new && (
              <span className="category-badge bg-violet-500/15 text-violet-300 border border-violet-500/20 text-[10px] px-2 py-0.5">
                YENİ
              </span>
            )}
            {tool.featured && (
              <span className="category-badge bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5">
                ★
              </span>
            )}
          </div>
        </div>

        <h3 className="font-display font-semibold text-[var(--text-primary)] text-sm leading-snug mb-2">
          {tool.name}
        </h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
          {tool.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <Icons.ArrowRight
            size={14}
            className="text-[var(--text-muted)] group-hover:text-violet-400 transition-colors shrink-0"
          />
        </div>
      </div>
    </Link>
  );
}
