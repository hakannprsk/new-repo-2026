'use client';
import { useState, useMemo } from 'react';
import * as Diff from 'diff';

export default function TextDiff() {
  const [left, setLeft] = useState('Merhaba dünya!\nBu ilk metin.');
  const [right, setRight] = useState('Merhaba KralTools!\nBu ikinci metin.\nYeni satır eklendi.');
  const [mode, setMode] = useState<'chars'|'words'|'lines'>('lines');

  const diffs = useMemo(() => {
    if (mode === 'chars') return Diff.diffChars(left, right);
    if (mode === 'words') return Diff.diffWords(left, right);
    return Diff.diffLines(left, right);
  }, [left, right, mode]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['chars','words','lines'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
            {m === 'chars' ? 'Karakter' : m === 'words' ? 'Kelime' : 'Satır'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Orijinal</label>
          <textarea className="tool-textarea" rows={8} value={left} onChange={e => setLeft(e.target.value)}/>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Yeni</label>
          <textarea className="tool-textarea" rows={8} value={right} onChange={e => setRight(e.target.value)}/>
        </div>
      </div>
      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-2">Fark</label>
        <div className="bg-space-800/60 border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words min-h-20">
          {diffs.map((part, i) => (
            <span key={i} className={part.added ? 'diff-added inline' : part.removed ? 'diff-removed inline' : 'text-[var(--text-secondary)]'}>
              {part.value}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <span className="text-emerald-400">■ Eklenen</span>
          <span className="text-red-400">■ Silinen</span>
          <span className="text-[var(--text-muted)]">■ Değişmez</span>
        </div>
      </div>
    </div>
  );
}
