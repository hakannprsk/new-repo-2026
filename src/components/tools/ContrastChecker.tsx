'use client';
import { useState } from 'react';
import { hexToRgb, getRelativeLuminance, getContrastRatio } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ContrastChecker() {
  const [fg, setFg] = useState('#f1f0ff');
  const [bg, setBg] = useState('#0b0b1f');

  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const ratio = fgRgb && bgRgb
    ? getContrastRatio(getRelativeLuminance(fgRgb.r,fgRgb.g,fgRgb.b), getRelativeLuminance(bgRgb.r,bgRgb.g,bgRgb.b))
    : 1;
  const r = Math.round(ratio * 100) / 100;

  const checks = [
    { label: 'AA Normal Metin', pass: r >= 4.5, req: '4.5:1' },
    { label: 'AA Büyük Metin', pass: r >= 3, req: '3:1' },
    { label: 'AAA Normal Metin', pass: r >= 7, req: '7:1' },
    { label: 'AAA Büyük Metin', pass: r >= 4.5, req: '4.5:1' },
    { label: 'UI Bileşenleri', pass: r >= 3, req: '3:1' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Ön Plan (Metin)', val: fg, set: setFg },
          { label: 'Arka Plan', val: bg, set: setBg },
        ].map(({label,val,set}) => (
          <div key={label}>
            <label className="block text-xs text-[var(--text-muted)] mb-2">{label}</label>
            <div className="flex gap-2">
              <input type="color" value={val} onChange={e=>set(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"/>
              <input className="tool-input flex-1 font-mono" value={val} onChange={e=>set(e.target.value)}/>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-8 flex items-center justify-center" style={{background:bg}}>
        <div className="text-center">
          <p className="text-2xl font-display font-bold mb-2" style={{color:fg}}>Örnek Metin</p>
          <p className="text-sm" style={{color:fg}}>Bu metin önizlemesidir. KralTools renk kontrastı aracı.</p>
        </div>
      </div>
      <div className="text-center">
        <div className="font-display font-bold text-5xl" style={{color: r >= 7 ? '#34d399' : r >= 4.5 ? '#a78bfa' : r >= 3 ? '#fbbf24' : '#f87171'}}>
          {r}:1
        </div>
        <div className="text-sm text-[var(--text-muted)] mt-1">Kontrast Oranı</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {checks.map(({label,pass,req}) => (
          <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${pass?'bg-emerald-500/10 border-emerald-500/20':'bg-red-500/10 border-red-500/20'}`}>
            {pass?<CheckCircle size={16} className="text-emerald-400 shrink-0"/>:<XCircle size={16} className="text-red-400 shrink-0"/>}
            <span className={pass?'text-emerald-300':'text-red-300'}>{label}</span>
            <span className="ml-auto text-xs text-[var(--text-muted)]">{req}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
