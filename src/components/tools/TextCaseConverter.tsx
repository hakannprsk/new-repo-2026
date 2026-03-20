'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

const CASES = [
  { id: 'upper', label: 'BÜYÜK HARF', fn: (t: string) => t.toUpperCase() },
  { id: 'lower', label: 'küçük harf', fn: (t: string) => t.toLowerCase() },
  {
    id: 'title',
    label: 'Başlık Harfi',
    fn: (t: string) =>
      t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    id: 'sentence',
    label: 'Cümle harfi',
    fn: (t: string) =>
      t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
  },
  {
    id: 'camel',
    label: 'camelCase',
    fn: (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  },
  {
    id: 'pascal',
    label: 'PascalCase',
    fn: (t: string) =>
      t
        .toLowerCase()
        .replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, _2, c) => c.toUpperCase()),
  },
  {
    id: 'snake',
    label: 'snake_case',
    fn: (t: string) =>
      t
        .replace(/\s+/g, '_')
        .replace(/[A-Z]/g, (c) => '_' + c.toLowerCase())
        .replace(/^_/, '')
        .toLowerCase(),
  },
  {
    id: 'kebab',
    label: 'kebab-case',
    fn: (t: string) =>
      t
        .replace(/\s+/g, '-')
        .replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
        .replace(/^-/, '')
        .toLowerCase(),
  },
  {
    id: 'alternate',
    label: 'AlTeRnAtE',
    fn: (t: string) =>
      t
        .split('')
        .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
        .join(''),
  },
];

export default function TextCaseConverter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await copyToClipboard(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Metninizi girin
        </label>
        <textarea
          className="tool-textarea"
          rows={5}
          placeholder="Dönüştürmek istediğiniz metni buraya yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="text-xs text-[var(--text-muted)] mt-1.5">
          {input.length} karakter · {input.split(/\s+/).filter(Boolean).length} kelime
        </div>
      </div>

      {input && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CASES.map(({ id, label, fn }) => {
            const result = fn(input);
            return (
              <div
                key={id}
                className="bg-space-800/60 border border-[var(--border-subtle)] rounded-xl p-4 group hover:border-[var(--border-default)] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {label}
                  </span>
                  <button
                    onClick={() => handleCopy(result, id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all"
                  >
                    {copied === id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
                <p className="text-sm text-[var(--text-primary)] font-mono break-all leading-relaxed line-clamp-3">
                  {result}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {!input && (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <div className="text-4xl mb-3">Aa</div>
          <p className="text-sm">Yukarıya metin girin, sonuçlar burada görünecek.</p>
        </div>
      )}
    </div>
  );
}
