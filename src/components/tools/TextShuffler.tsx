'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check, Shuffle } from 'lucide-react';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

export default function TextShuffler() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'words'|'lines'|'chars'>('words');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const doShuffle = () => {
    if (!input) return;
    if (mode==='words') setResult(shuffle(input.split(/\s+/).filter(Boolean)).join(' '));
    else if (mode==='lines') setResult(shuffle(input.split('\n')).join('\n'));
    else setResult(shuffle(input.split('')).join(''));
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['words','lines','chars'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
            {m==='words'?'Kelimeler':m==='lines'?'Satırlar':'Karakterler'}
          </button>
        ))}
      </div>
      <textarea className="tool-textarea" rows={6} value={input} onChange={e=>setInput(e.target.value)} placeholder="Karıştırmak istediğiniz metni girin..."/>
      <button onClick={doShuffle} className="btn-primary flex items-center gap-2"><Shuffle size={15}/> Karıştır</button>
      {result && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Sonuç</label>
            <button onClick={async()=>{await copyToClipboard(result);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
              {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13}/>}
            </button>
          </div>
          <textarea className="tool-textarea" rows={6} readOnly value={result}/>
        </div>
      )}
    </div>
  );
}
