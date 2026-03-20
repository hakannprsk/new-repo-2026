'use client';
import { useState, useMemo } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

const PRESETS = [
  { label: 'Her dakika', expr: '* * * * *' },
  { label: 'Her saat', expr: '0 * * * *' },
  { label: 'Her gün gece yarısı', expr: '0 0 * * *' },
  { label: 'Her Pazartesi', expr: '0 0 * * 1' },
  { label: 'Her ayın 1\'i', expr: '0 0 1 * *' },
  { label: 'Her 5 dakika', expr: '*/5 * * * *' },
  { label: 'Her gün sabah 9\'da', expr: '0 9 * * *' },
];

function explainCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return 'Geçersiz CRON ifadesi. 5 alan gereklidir.';
  const [min, hour, dom, month, dow] = parts;
  const mn = (v: string, u: string) => v === '*' ? `her ${u}` : v.startsWith('*/') ? `her ${v.slice(2)} ${u}da` : `${v}. ${u}da`;
  let desc = 'Çalışır: ';
  desc += mn(min,'dakika') + ', ';
  desc += mn(hour,'saatte') + ', ';
  if (dom !== '*') desc += `ayın ${dom}. gününde, `;
  if (month !== '*') desc += `${month}. ayda, `;
  if (dow !== '*') { const days=['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi']; desc += `her ${days[+dow] ?? dow} günü, `; }
  return desc.replace(/, $/, '.');
}

export default function CronBuilder() {
  const [expr, setExpr] = useState('0 9 * * 1-5');
  const [copied, setCopied] = useState(false);
  const explanation = useMemo(() => explainCron(expr), [expr]);
  const isValid = expr.trim().split(/\s+/).length === 5;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">CRON İfadesi</label>
        <div className="flex gap-2">
          <input className="tool-input flex-1 font-mono text-lg tracking-widest" value={expr} onChange={e=>setExpr(e.target.value)} placeholder="* * * * *"/>
          <button onClick={async()=>{await copyToClipboard(expr);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="btn-secondary px-3">
            {copied?<Check size={14} className="text-emerald-400"/>:<Copy size={14}/>}
          </button>
        </div>
        <div className="flex gap-4 mt-2 text-xs text-[var(--text-muted)]">
          {['dakika','saat','gün','ay','hf günü'].map((l,i) => (
            <span key={l} className="flex flex-col items-center"><span className="text-violet-400 font-mono font-bold">{expr.split(/\s+/)[i]||'?'}</span>{l}</span>
          ))}
        </div>
      </div>
      <div className={`px-4 py-3 rounded-xl border text-sm ${isValid?'bg-violet-500/10 border-violet-500/20 text-violet-300':'bg-red-500/10 border-red-500/20 text-red-400'}`}>
        {explanation}
      </div>
      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-3">Hazır Şablonlar</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(({label,expr:e}) => (
            <button key={label} onClick={()=>setExpr(e)} className="px-3 py-2 rounded-lg text-xs btn-secondary">
              <span className="text-violet-400 font-mono mr-2">{e}</span>{label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
