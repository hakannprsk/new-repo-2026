'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

function formatCss(css: string): string {
  return css
    .replace(/\s*{\s*/g,' {\n  ')
    .replace(/;\s*/g,';\n  ')
    .replace(/\s*}\s*/g,'\n}\n')
    .replace(/,\s*([^\n])/g,',\n$1')
    .replace(/  \n}/g,'}')
    .trim();
}

function minifyCss(css: string): string {
  return css.replace(/\s+/g,' ').replace(/\s*([{};:,])\s*/g,'$1').replace(/;}/g,'}').trim();
}

export default function CssFormatter() {
  const [input, setInput] = useState('.container{display:flex;flex-direction:column;align-items:center;gap:16px;}.title{font-size:24px;font-weight:bold;color:#a78bfa;}');
  const [mode, setMode] = useState<'format'|'minify'>('format');
  const [copied, setCopied] = useState(false);
  const result = input ? (mode==='format' ? formatCss(input) : minifyCss(input)) : '';
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['format','minify'] as const).map(m => (
          <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
            {m==='format'?'Biçimlendir':'Sıkıştır'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">CSS Giriş</label>
          <textarea className="tool-textarea" rows={14} value={input} onChange={e=>setInput(e.target.value)}/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Sonuç</label>
            {result && <button onClick={async()=>{await copyToClipboard(result);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
              {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13}/>}
            </button>}
          </div>
          <textarea className="tool-textarea" rows={14} readOnly value={result}/>
        </div>
      </div>
    </div>
  );
}
