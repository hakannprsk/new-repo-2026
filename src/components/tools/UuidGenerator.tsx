'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { copyToClipboard, downloadText } from '@/lib/utils';
import { Copy, Check, Download, RefreshCw } from 'lucide-react';

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<string|null>(null);
  const generate = () => setUuids(Array.from({length:count},()=>uuidv4()));
  const cp = async (v: string) => { await copyToClipboard(v); setCopied(v); setTimeout(()=>setCopied(null),1500); };
  return (
    <div className="space-y-5">
      <div className="flex items-end gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Adet: <span className="text-violet-400 font-bold">{count}</span></label>
          <input type="range" min={1} max={50} value={count} onChange={e=>setCount(+e.target.value)} className="w-36"/>
        </div>
        <button onClick={generate} className="btn-primary flex items-center gap-2"><RefreshCw size={15}/> Oluştur</button>
        {uuids.length > 0 && <button onClick={()=>downloadText(uuids.join('\n'),'uuids.txt')} className="btn-secondary flex items-center gap-2"><Download size={14}/> İndir</button>}
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map(u => (
            <div key={u} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3 group hover:border-[var(--border-default)] transition-all">
              <span className="flex-1 font-mono text-sm text-[var(--text-primary)]">{u}</span>
              <button onClick={()=>cp(u)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                {copied===u?<Check size={12} className="text-emerald-400"/>:<Copy size={12}/>}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
