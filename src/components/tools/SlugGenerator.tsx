'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

function toSlug(text: string, sep: string): string {
  return text.toString().toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s')
    .replace(/[ı]/g,'i').replace(/[ö]/g,'o').replace(/[ç]/g,'c')
    .replace(/[^a-z0-9\s-]/g,'').trim()
    .replace(/[\s_-]+/g,sep).replace(/^-+|-+$/g,'');
}

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [sep, setSep] = useState('-');
  const [copied, setCopied] = useState(false);
  const result = input ? toSlug(input, sep) : '';

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-2">Metin</label>
        <input className="tool-input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Örnek: Merhaba Dünya & KralTools!"/>
      </div>
      <div className="flex gap-2">
        {['-','_','.'].map(s => (
          <button key={s} onClick={()=>setSep(s)} className={`px-4 py-2 rounded-lg text-sm font-mono font-bold transition-all ${sep===s?'btn-primary':'btn-secondary'}`}>{s}</button>
        ))}
      </div>
      {result && (
        <div className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-default)] rounded-xl px-4 py-3">
          <span className="flex-1 font-mono text-sm text-violet-400">{result}</span>
          <button onClick={async()=>{await copyToClipboard(result);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
            {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13}/>}
          </button>
        </div>
      )}
      {input && (
        <div className="space-y-2">
          {['-','_','.'].map(s => (
            <div key={s} className="flex items-center gap-3 px-4 py-2 bg-space-800/40 rounded-lg">
              <span className="text-xs text-[var(--text-muted)] w-4">{s}</span>
              <span className="font-mono text-sm text-[var(--text-secondary)]">{toSlug(input,s)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
