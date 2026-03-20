'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

export default function TextReverser() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chars'|'words'|'lines'>('chars');
  const [copied, setCopied] = useState(false);

  const reverse = () => {
    if (mode === 'chars') return input.split('').reverse().join('');
    if (mode === 'words') return input.split(' ').reverse().join(' ');
    return input.split('\n').reverse().join('\n');
  };

  const result = input ? reverse() : '';

  const handleCopy = async () => {
    await copyToClipboard(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['chars','words','lines'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode===m ? 'btn-primary' : 'btn-secondary'}`}>
            {m === 'chars' ? 'Karakterler' : m === 'words' ? 'Kelimeler' : 'Satırlar'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Giriş</label>
          <textarea className="tool-textarea" rows={8} placeholder="Metni girin..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Sonuç</label>
            {result && <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all">
              {copied ? <Check size={13} className="text-emerald-400"/> : <Copy size={13}/>}
            </button>}
          </div>
          <textarea className="tool-textarea" rows={8} readOnly value={result} placeholder="Sonuç burada görünecek..."/>
        </div>
      </div>
    </div>
  );
}
