'use client';
import { useState } from 'react';
import TurndownService from 'turndown';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

export default function HtmlToMarkdown() {
  const [input, setInput] = useState('<h1>Başlık</h1>\n<p>Bu bir <strong>paragraf</strong>tır.</p>\n<ul>\n  <li>Madde 1</li>\n  <li>Madde 2</li>\n</ul>');
  const [copied, setCopied] = useState(false);
  let result = '';
  try { result = input ? td.turndown(input) : ''; } catch { result = 'Hata: Geçersiz HTML'; }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">HTML</label>
          <textarea className="tool-textarea" rows={16} value={input} onChange={e => setInput(e.target.value)} placeholder="HTML kodunu girin..."/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Markdown</label>
            {result && <button onClick={async () => { await copyToClipboard(result); setCopied(true); setTimeout(()=>setCopied(false),1500); }} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
              {copied ? <Check size={13} className="text-emerald-400"/> : <Copy size={13}/>}
            </button>}
          </div>
          <textarea className="tool-textarea" rows={16} readOnly value={result} placeholder="Markdown çıktısı..."/>
        </div>
      </div>
    </div>
  );
}
