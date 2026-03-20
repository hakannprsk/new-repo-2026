'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

function formatHtml(html: string): string {
  let formatted = ''; let level = 0;
  const sp = '  ';
  const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  const tokens = html.split(/(<[^>]+>)/g).filter(t => t.trim());
  tokens.forEach(token => {
    if (token.startsWith('</')) { level = Math.max(0,level-1); formatted += sp.repeat(level)+token+'\n'; }
    else if (token.startsWith('<')) {
      const tag = token.match(/^<(\w+)/)?.[1]?.toLowerCase();
      formatted += sp.repeat(level)+token+'\n';
      if (tag && !voidTags.has(tag) && !token.endsWith('/>')) level++;
    } else { if (token.trim()) formatted += sp.repeat(level)+token.trim()+'\n'; }
  });
  return formatted.trim();
}

export default function HtmlFormatterTool() {
  const [input, setInput] = useState('<div class="container"><h1>KralTools</h1><p>HTML Biçimlendirici</p><ul><li>Hızlı</li><li>Güvenli</li></ul></div>');
  const [copied, setCopied] = useState(false);
  const result = input ? formatHtml(input) : '';
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">HTML Giriş</label>
          <textarea className="tool-textarea" rows={14} value={input} onChange={e=>setInput(e.target.value)}/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Biçimlendirilmiş HTML</label>
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
