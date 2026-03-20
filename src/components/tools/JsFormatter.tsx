'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

function basicFormat(js: string): string {
  let level = 0; let result = ''; const sp = '  ';
  for (let i=0;i<js.length;i++) {
    const c = js[i];
    if (c==='{' || c==='[') { result += c+'\n'+sp.repeat(++level); }
    else if (c==='}' || c===']') { result = result.trimEnd()+'\n'+sp.repeat(--level)+c; }
    else if (c===';') { result += c+'\n'+sp.repeat(level); }
    else if (c===',') { result += c+'\n'+sp.repeat(level); }
    else result += c;
  }
  return result.trim();
}

export default function JsFormatter() {
  const [input, setInput] = useState('const tools=["JSON","XML","CSS"];function greet(name){return "Merhaba "+name+"!";}const obj={key:"value",count:42};');
  const [mode, setMode] = useState<'format'|'minify'>('format');
  const [copied, setCopied] = useState(false);
  const result = input ? (mode==='format' ? basicFormat(input) : input.replace(/\s+/g,' ').trim()) : '';
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
          <label className="block text-xs text-[var(--text-muted)] mb-2">JavaScript</label>
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
