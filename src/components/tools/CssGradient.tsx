'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';

interface Stop { color: string; pos: number; }

export default function CssGradient() {
  const [type, setType] = useState<'linear'|'radial'>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    {color:'#7c3aed',pos:0},{color:'#0891b2',pos:50},{color:'#059669',pos:100}
  ]);
  const [copied, setCopied] = useState(false);

  const stopsStr = stops.map(s=>`${s.color} ${s.pos}%`).join(', ');
  const css = type==='linear' ? `linear-gradient(${angle}deg, ${stopsStr})` : `radial-gradient(circle, ${stopsStr})`;
  const fullCss = `background: ${css};`;

  const updateStop = (i: number, field: keyof Stop, value: string|number) => {
    setStops(p => p.map((s,idx) => idx===i ? {...s,[field]:value} : s));
  };
  const addStop = () => setStops(p => [...p, {color:'#ffffff',pos:75}].sort((a,b)=>a.pos-b.pos));
  const removeStop = (i: number) => { if (stops.length > 2) setStops(p => p.filter((_,idx)=>idx!==i)); };

  return (
    <div className="space-y-6">
      <div className="h-32 rounded-2xl border border-[var(--border-default)] transition-all" style={{background:css}}/>
      <div className="flex gap-2">
        {(['linear','radial'] as const).map(t => (
          <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${type===t?'btn-primary':'btn-secondary'}`}>
            {t==='linear'?'Linear':'Radial'}
          </button>
        ))}
        {type==='linear' && (
          <div className="flex items-center gap-2 ml-4">
            <label className="text-xs text-[var(--text-muted)]">Açı: <span className="text-violet-400">{angle}°</span></label>
            <input type="range" min={0} max={360} value={angle} onChange={e=>setAngle(+e.target.value)} className="w-32"/>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-[var(--text-muted)]">Renk Durakları</label>
          <button onClick={addStop} className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300"><Plus size={12}/> Ekle</button>
        </div>
        {stops.map((stop,i) => (
          <div key={i} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3">
            <input type="color" value={stop.color} onChange={e=>updateStop(i,'color',e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 shrink-0"/>
            <input className="tool-input w-28 font-mono" value={stop.color} onChange={e=>updateStop(i,'color',e.target.value)}/>
            <input type="range" min={0} max={100} value={stop.pos} onChange={e=>updateStop(i,'pos',+e.target.value)} className="flex-1"/>
            <span className="text-xs font-mono text-[var(--text-muted)] w-8">{stop.pos}%</span>
            <button onClick={()=>removeStop(i)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-all">
              <Trash2 size={12}/>
            </button>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-[var(--text-muted)]">CSS Kodu</label>
          <button onClick={async()=>{await copyToClipboard(fullCss);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
            {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13}/>}
          </button>
        </div>
        <div className="code-block text-sm">{fullCss}</div>
      </div>
    </div>
  );
}
