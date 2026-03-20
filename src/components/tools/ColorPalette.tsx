'use client';
import { useState } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl } from '@/lib/utils';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check, RefreshCw, Shuffle } from 'lucide-react';

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1-l);
  const f = (n: number) => { const k=(n+h/30)%12; const color=l-a*Math.max(Math.min(k-3,9-k,1),-1); return Math.round(255*color).toString(16).padStart(2,'0'); };
  return '#'+f(0)+f(8)+f(4);
}

function generatePalette(base: string, type: string): string[] {
  const rgb = hexToRgb(base);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const {h, s, l} = hsl;
  switch(type) {
    case 'analogous': return [hslToHex((h-30+360)%360,s,l), base, hslToHex((h+30)%360,s,l), hslToHex((h+60)%360,s,l), hslToHex((h-60+360)%360,s,l)];
    case 'complementary': return [base, hslToHex((h+180)%360,s,l), hslToHex(h,s,l-20), hslToHex((h+180)%360,s,l-20), hslToHex(h,s,l+20)];
    case 'triadic': return [base, hslToHex((h+120)%360,s,l), hslToHex((h+240)%360,s,l), hslToHex(h,s,l-15), hslToHex(h,s,l+15)];
    case 'monochromatic': return [hslToHex(h,s,20), hslToHex(h,s,35), hslToHex(h,s,50), hslToHex(h,s,65), hslToHex(h,s,80)];
    case 'split-complementary': return [base, hslToHex((h+150)%360,s,l), hslToHex((h+210)%360,s,l), hslToHex(h,s,l-10), hslToHex(h,s,l+10)];
    default: return [base];
  }
}

export default function ColorPalette() {
  const [base, setBase] = useState('#7c3aed');
  const [type, setType] = useState('analogous');
  const [copied, setCopied] = useState<string|null>(null);
  const palette = generatePalette(base, type);
  const cp = async (v: string) => { await copyToClipboard(v); setCopied(v); setTimeout(()=>setCopied(null),1500); };
  const randomBase = () => { const h=Math.floor(Math.random()*360); const rgb2=hexToRgb('#7c3aed')!; setBase(hslToHex(h,70,50)); };

  const types = [
    {id:'analogous',label:'Analogous'},
    {id:'complementary',label:'Complementary'},
    {id:'triadic',label:'Triadic'},
    {id:'monochromatic',label:'Monochromatic'},
    {id:'split-complementary',label:'Split Comp.'},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Temel Renk</label>
          <div className="flex gap-2">
            <input type="color" value={base} onChange={e=>setBase(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"/>
            <input className="tool-input w-32 font-mono" value={base} onChange={e=>setBase(e.target.value)}/>
          </div>
        </div>
        <button onClick={randomBase} className="btn-secondary flex items-center gap-2 h-10"><Shuffle size={14}/> Rastgele</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map(t => (
          <button key={t.id} onClick={()=>setType(t.id)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${type===t.id?'btn-primary':'btn-secondary'}`}>{t.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3">
        {palette.map((color, i) => (
          <div key={i} className="space-y-2">
            <button onClick={()=>cp(color)} className="color-swatch group relative" style={{background:color,height:'80px'}}>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {copied===color?<Check size={18} className="text-white drop-shadow-lg"/>:<Copy size={18} className="text-white drop-shadow-lg"/>}
              </span>
            </button>
            <div className="text-center">
              <div className="font-mono text-xs text-[var(--text-primary)]">{color}</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Renk {i+1}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-2">CSS Değişkenleri</label>
        <div className="code-block text-xs">
          {palette.map((c,i) => `:root {\n  --color-${i+1}: ${c};\n}`).join('\n')}
        </div>
      </div>
    </div>
  );
}
