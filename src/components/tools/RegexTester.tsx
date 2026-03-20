'use client';
import { useState, useMemo } from 'react';

const EXAMPLES = [
  { label: 'E-posta', pattern: '^[\\w.-]+@[\\w.-]+\\.\\w{2,}$', flags: 'i' },
  { label: 'URL', pattern: 'https?:\\/\\/[\\w.-]+(?:\\/[^\\s]*)?', flags: 'gi' },
  { label: 'Türk telefon', pattern: '0?5\\d{2}[\\s-]?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}', flags: 'g' },
  { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { label: 'Tarih', pattern: '\\d{1,2}[\\/-]\\d{1,2}[\\/-]\\d{2,4}', flags: 'g' },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('[A-Z][a-z]+');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('Merhaba Dünya! KralTools en iyi araç sitesidir. İstanbul ve Ankara büyük şehirlerdir.');

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern || !testText) return { matches: [], error: '', highlighted: testText };
    try {
      const re = new RegExp(pattern, flags);
      const allMatches: RegExpExecArray[] = [];
      if (flags.includes('g')) {
        let m;
        const r2 = new RegExp(pattern, flags);
        while ((m = r2.exec(testText)) !== null) { allMatches.push(m); if (!flags.includes('g')) break; }
      } else {
        const m = re.exec(testText);
        if (m) allMatches.push(m);
      }
      const parts: {text:string;match:boolean}[] = [];
      let last = 0;
      allMatches.forEach(m => {
        if (m.index > last) parts.push({text:testText.slice(last,m.index),match:false});
        parts.push({text:m[0],match:true});
        last = m.index + m[0].length;
      });
      if (last < testText.length) parts.push({text:testText.slice(last),match:false});
      return { matches: allMatches, error: '', highlighted: parts };
    } catch(e: any) { return { matches: [], error: e.message, highlighted: testText }; }
  }, [pattern, flags, testText]);

  const allFlags = ['g','i','m','s','u'];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map(ex => (
          <button key={ex.label} onClick={()=>{setPattern(ex.pattern);setFlags(ex.flags);}} className="px-3 py-1.5 rounded-lg text-xs btn-secondary">{ex.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs text-[var(--text-muted)] mb-2">Regex Pattern</label>
          <input className="tool-input font-mono" value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="regex..."/>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Bayraklar</label>
          <div className="flex gap-2 flex-wrap">
            {allFlags.map(f => (
              <button key={f} onClick={()=>setFlags(p=>p.includes(f)?p.replace(f,''):p+f)}
                className={`w-8 h-10 rounded-lg text-sm font-mono font-bold transition-all ${flags.includes(f)?'bg-violet-500/20 text-violet-400 border border-violet-500/30':'text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--border-default)]'}`}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-2">Test Metni</label>
        <textarea className="tool-textarea" rows={5} value={testText} onChange={e=>setTestText(e.target.value)}/>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="text-xs text-[var(--text-muted)]">Eşleşmeler</label>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-bold">{matches.length}</span>
        </div>
        <div className="bg-space-800/60 border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm leading-relaxed min-h-12">
          {Array.isArray(highlighted) ? highlighted.map((part,i) => (
            <span key={i} className={part.match ? 'bg-violet-500/30 text-violet-200 rounded px-0.5' : 'text-[var(--text-secondary)]'}>{part.text}</span>
          )) : <span className="text-[var(--text-secondary)]">{highlighted as string}</span>}
        </div>
      </div>

      {matches.length > 0 && (
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Tüm Eşleşmeler</label>
          <div className="flex flex-wrap gap-2">
            {matches.map((m,i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-sm">
                [{m.index}] "{m[0]}"
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
