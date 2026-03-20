'use client';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

const ALGOS = ['MD5','SHA1','SHA256','SHA384','SHA512','SHA3','RIPEMD160'];

export default function HashGenerator() {
  const [input, setInput] = useState('KralTools');
  const [copied, setCopied] = useState<string|null>(null);

  const hash = (algo: string): string => {
    if (!input) return '';
    try {
      switch(algo) {
        case 'MD5': return CryptoJS.MD5(input).toString();
        case 'SHA1': return CryptoJS.SHA1(input).toString();
        case 'SHA256': return CryptoJS.SHA256(input).toString();
        case 'SHA384': return CryptoJS.SHA384(input).toString();
        case 'SHA512': return CryptoJS.SHA512(input).toString();
        case 'SHA3': return CryptoJS.SHA3(input).toString();
        case 'RIPEMD160': return CryptoJS.RIPEMD160(input).toString();
        default: return '';
      }
    } catch { return 'Hata'; }
  };

  const cp = async (v: string, id: string) => { await copyToClipboard(v); setCopied(id); setTimeout(()=>setCopied(null),1500); };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Giriş Metni</label>
        <textarea className="tool-textarea" rows={3} value={input} onChange={e=>setInput(e.target.value)} placeholder="Hash'ini almak istediğiniz metin..."/>
      </div>
      <div className="space-y-2">
        {ALGOS.map(algo => {
          const result = hash(algo);
          return (
            <div key={algo} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3 group hover:border-[var(--border-default)] transition-all">
              <span className="text-xs font-bold text-[var(--text-muted)] w-20 shrink-0 font-mono">{algo}</span>
              <span className="flex-1 font-mono text-xs text-[var(--text-secondary)] truncate">{result}</span>
              <button onClick={()=>cp(result,algo)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all shrink-0">
                {copied===algo?<Check size={12} className="text-emerald-400"/>:<Copy size={12}/>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
