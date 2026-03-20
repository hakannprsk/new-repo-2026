'use client';
import { useState, useCallback } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { hexToRgb, rgbToHsl, rgbToHex } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

export default function ColorPicker() {
  const [hex, setHex] = useState('#7c3aed');
  const [copied, setCopied] = useState<string|null>(null);

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const cp = async (v: string, id: string) => { await copyToClipboard(v); setCopied(id); setTimeout(()=>setCopied(null),1500); };

  const fromRgb = useCallback((r: number, g: number, b: number) => {
    setHex(rgbToHex(Math.round(r), Math.round(g), Math.round(b)));
  }, []);

  const variants = rgb && hsl ? [
    { label: 'HEX', value: hex },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'RGBA (1.0)', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: 'CSS Variable', value: `--color: ${hex};` },
    { label: 'Tailwind approx', value: `text-[${hex}]` },
  ] : [];

  const shades = rgb ? Array.from({length:9},(_,i) => {
    const factor = 0.1 + i * 0.1;
    const r = Math.round(rgb.r * factor + (1-factor)*255);
    const g = Math.round(rgb.g * factor + (1-factor)*255);
    const b = Math.round(rgb.b * factor + (1-factor)*255);
    return rgbToHex(r,g,b);
  }).reverse() : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <div>
          <input type="color" value={hex} onChange={e=>setHex(e.target.value)}
            className="w-20 h-20 rounded-2xl cursor-pointer border-0 bg-transparent"/>
        </div>
        <div className="flex-1 space-y-3">
          {rgb && (
            <>
              {['r','g','b'].map((ch, ci) => {
                const val = ci===0?rgb.r:ci===1?rgb.g:rgb.b;
                const colors = ['text-red-400','text-emerald-400','text-blue-400'];
                return (
                  <div key={ch} className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-3 ${colors[ci]}`}>{ch.toUpperCase()}</span>
                    <input type="range" min={0} max={255} value={val}
                      onChange={e=>{
                        const newR=ci===0?+e.target.value:rgb.r;
                        const newG=ci===1?+e.target.value:rgb.g;
                        const newB=ci===2?+e.target.value:rgb.b;
                        fromRgb(newR,newG,newB);
                      }} className="flex-1"/>
                    <span className="font-mono text-xs text-[var(--text-muted)] w-8 text-right">{val}</span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {variants.map(({label,value}) => (
          <div key={label} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3 group hover:border-[var(--border-default)] transition-all">
            <span className="text-xs text-[var(--text-muted)] w-24 shrink-0">{label}</span>
            <span className="flex-1 font-mono text-sm text-[var(--text-primary)]">{value}</span>
            <button onClick={()=>cp(value,label)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all shrink-0">
              {copied===label?<Check size={12} className="text-emerald-400"/>:<Copy size={12}/>}
            </button>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-3">Tonlar</label>
        <div className="grid grid-cols-9 gap-2">
          {shades.map((s,i) => (
            <button key={i} onClick={()=>setHex(s)} title={s}
              className="color-swatch"
              style={{background:s}}/>
          ))}
        </div>
      </div>
    </div>
  );
}
