'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check, Clock } from 'lucide-react';

export default function TimestampConverter() {
  const [ts, setTs] = useState(Math.floor(Date.now()/1000).toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0,16));
  const [copied, setCopied] = useState<string|null>(null);

  const fromTs = () => {
    const n = parseInt(ts);
    if (isNaN(n)) return null;
    const ms = n > 1e10 ? n : n * 1000;
    return new Date(ms);
  };

  const d = fromTs();

  const rows = d ? [
    { label: 'ISO 8601', value: d.toISOString() },
    { label: 'UTC', value: d.toUTCString() },
    { label: 'Yerel Saat', value: d.toLocaleString('tr-TR') },
    { label: 'Tarih', value: d.toLocaleDateString('tr-TR',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) },
    { label: 'Saat', value: d.toLocaleTimeString('tr-TR') },
    { label: 'Unix (sn)', value: Math.floor(d.getTime()/1000).toString() },
    { label: 'Unix (ms)', value: d.getTime().toString() },
    { label: 'Göreli', value: (() => {
      const diff = Math.floor((Date.now()-d.getTime())/1000);
      if (diff < 60) return `${diff} sn önce`;
      if (diff < 3600) return `${Math.floor(diff/60)} dk önce`;
      if (diff < 86400) return `${Math.floor(diff/3600)} sa önce`;
      return `${Math.floor(diff/86400)} gün önce`;
    })() },
  ] : [];

  const cp = async (v: string, id: string) => { await copyToClipboard(v); setCopied(id); setTimeout(()=>setCopied(null),1500); };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Unix Timestamp</label>
          <input className="tool-input" value={ts} onChange={e=>setTs(e.target.value)} placeholder="1700000000"/>
          <button onClick={()=>setTs(Math.floor(Date.now()/1000).toString())} className="mt-2 flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors">
            <Clock size={12}/> Şimdiki zamanı kullan
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Tarih/Saat → Timestamp</label>
          <input type="datetime-local" className="tool-input" value={dateStr} onChange={e=>{setDateStr(e.target.value);setTs(Math.floor(new Date(e.target.value).getTime()/1000).toString());}}/>
        </div>
      </div>
      {d && !isNaN(d.getTime()) && (
        <div className="space-y-2">
          {rows.map(({label,value}) => (
            <div key={label} className="flex items-center justify-between bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3 group hover:border-[var(--border-default)] transition-all">
              <span className="text-xs text-[var(--text-muted)] w-28 shrink-0">{label}</span>
              <span className="font-mono text-sm text-[var(--text-primary)] flex-1 truncate mx-3">{value}</span>
              <button onClick={()=>cp(value,label)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all shrink-0">
                {copied===label?<Check size={12} className="text-emerald-400"/>:<Copy size={12}/>}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
