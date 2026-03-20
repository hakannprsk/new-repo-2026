'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

export default function UrlParser() {
  const [url, setUrl] = useState('https://kraltools.vercel.app/tools/json-formatter?theme=dark&lang=tr#section');
  const [copied, setCopied] = useState<string|null>(null);

  let parsed: URL | null = null;
  let error = '';
  try { parsed = new URL(url); } catch { error = 'Geçersiz URL formatı'; }

  const parts = parsed ? [
    { label: 'Protokol', value: parsed.protocol },
    { label: 'Host', value: parsed.host },
    { label: 'Hostname', value: parsed.hostname },
    { label: 'Port', value: parsed.port || '(varsayılan)' },
    { label: 'Pathname', value: parsed.pathname },
    { label: 'Search', value: parsed.search },
    { label: 'Hash', value: parsed.hash },
    { label: 'Origin', value: parsed.origin },
  ] : [];

  const params = parsed ? Array.from(parsed.searchParams.entries()) : [];
  const cp = async (v: string, id: string) => { await copyToClipboard(v); setCopied(id); setTimeout(()=>setCopied(null),1500); };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-2">URL</label>
        <input className="tool-input font-mono text-sm" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com/path?key=value#hash"/>
      </div>
      {error && <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      {parsed && (
        <>
          <div className="space-y-2">
            {parts.map(({label,value}) => value && value !== '(varsayılan)' ? (
              <div key={label} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3 group">
                <span className="text-xs text-[var(--text-muted)] w-20 shrink-0">{label}</span>
                <span className="flex-1 font-mono text-sm text-[var(--text-primary)] truncate">{value}</span>
                <button onClick={()=>cp(value,label)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all shrink-0">
                  {copied===label?<Check size={12} className="text-emerald-400"/>:<Copy size={12}/>}
                </button>
              </div>
            ) : null)}
          </div>
          {params.length > 0 && (
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Query Parametreleri</label>
              <div className="space-y-2">
                {params.map(([k,v]) => (
                  <div key={k} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5">
                    <span className="text-xs font-mono text-cyan-400">{k}</span>
                    <span className="text-xs text-[var(--text-muted)]">=</span>
                    <span className="text-sm font-mono text-[var(--text-primary)]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
