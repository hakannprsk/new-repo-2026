'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const result = input ? (mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)) : '';
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['encode','decode'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
            {m === 'encode' ? 'Kodla' : 'Çöz'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Giriş</label>
          <textarea className="tool-textarea" rows={8} value={input} onChange={e => setInput(e.target.value)} placeholder="URL veya metin girin..."/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Sonuç</label>
            {result && <button onClick={async () => { await copyToClipboard(result); setCopied(true); setTimeout(()=>setCopied(false),1500); }} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
              {copied ? <Check size={13} className="text-emerald-400"/> : <Copy size={13}/>}
            </button>}
          </div>
          <textarea className="tool-textarea" rows={8} readOnly value={result} placeholder="Sonuç..."/>
        </div>
      </div>
    </div>
  );
}
