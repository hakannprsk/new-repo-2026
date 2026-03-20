'use client';
import { useState } from 'react';
import { copyToClipboard, downloadText } from '@/lib/utils';
import { Copy, Check, Download } from 'lucide-react';

export default function DuplicateRemover() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'lines'|'words'>('lines');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [copied, setCopied] = useState(false);

  const process = () => {
    if (!input) return '';
    if (mode === 'lines') {
      const lines = input.split('\n');
      const seen = new Set<string>();
      return lines.filter(l => {
        const key = caseSensitive ? l : l.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key); return true;
      }).join('\n');
    } else {
      const words = input.split(/\s+/).filter(Boolean);
      const seen = new Set<string>();
      return words.filter(w => {
        const key = caseSensitive ? w : w.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key); return true;
      }).join(' ');
    }
  };

  const result = process();
  const origCount = mode === 'lines' ? input.split('\n').length : input.split(/\s+/).filter(Boolean).length;
  const newCount = mode === 'lines' ? result.split('\n').filter(Boolean).length : result.split(/\s+/).filter(Boolean).length;
  const removed = Math.max(0, origCount - newCount);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          {(['lines','words'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
              {m === 'lines' ? 'Satırlar' : 'Kelimeler'}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-secondary)]">
          <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)}/>
          Büyük/küçük harf ayrımı
        </label>
      </div>
      {removed > 0 && (
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <span className="font-bold">{removed}</span> tekrar kaldırıldı
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Giriş ({origCount})</label>
          <textarea className="tool-textarea" rows={10} value={input} onChange={e => setInput(e.target.value)} placeholder="Metni girin..."/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Sonuç ({newCount})</label>
            <div className="flex gap-1">
              {result && <>
                <button onClick={async () => { await copyToClipboard(result); setCopied(true); setTimeout(()=>setCopied(false),1500); }} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                  {copied ? <Check size={13} className="text-emerald-400"/> : <Copy size={13}/>}
                </button>
                <button onClick={() => downloadText(result, 'temizlenmis.txt')} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                  <Download size={13}/>
                </button>
              </>}
            </div>
          </div>
          <textarea className="tool-textarea" rows={10} readOnly value={result} placeholder="Sonuç..."/>
        </div>
      </div>
    </div>
  );
}
