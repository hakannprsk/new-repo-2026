'use client';
import { useState } from 'react';
import { copyToClipboard, downloadText } from '@/lib/utils';
import { Copy, Check, Download, RefreshCw } from 'lucide-react';

const LOREM_WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum'];

function makeSentence(min=6,max=15): string {
  const len = min + Math.floor(Math.random()*(max-min));
  const words = Array.from({length:len},()=>LOREM_WORDS[Math.floor(Math.random()*LOREM_WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase()+words[0].slice(1);
  return words.join(' ')+'.';
}
function makeParagraph(): string { return Array.from({length:3+Math.floor(Math.random()*5)},makeSentence).join(' '); }

export default function LoremIpsum() {
  const [type, setType] = useState<'paragraphs'|'sentences'|'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (type==='paragraphs') setResult(Array.from({length:count},makeParagraph).join('\n\n'));
    else if (type==='sentences') setResult(Array.from({length:count},makeSentence).join(' '));
    else setResult(Array.from({length:count},()=>LOREM_WORDS[Math.floor(Math.random()*LOREM_WORDS.length)]).join(' '));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Tür</label>
          <div className="flex gap-2">
            {(['paragraphs','sentences','words'] as const).map(t => (
              <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${type===t?'btn-primary':'btn-secondary'}`}>
                {t==='paragraphs'?'Paragraf':t==='sentences'?'Cümle':'Kelime'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Adet: <span className="text-violet-400 font-bold">{count}</span></label>
          <input type="range" min={1} max={type==='words'?200:20} value={count} onChange={e=>setCount(+e.target.value)} className="w-36"/>
        </div>
        <button onClick={generate} className="btn-primary flex items-center gap-2"><RefreshCw size={15}/> Oluştur</button>
      </div>
      {result && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)]">{result.split(/\s+/).filter(Boolean).length} kelime</span>
            <div className="flex gap-1">
              <button onClick={async()=>{await copyToClipboard(result);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13}/>}
              </button>
              <button onClick={()=>downloadText(result,'lorem-ipsum.txt')} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all"><Download size={13}/></button>
            </div>
          </div>
          <textarea className="tool-textarea" rows={12} readOnly value={result}/>
        </div>
      )}
    </div>
  );
}
