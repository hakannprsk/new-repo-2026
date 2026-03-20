'use client';
import { useState } from 'react';
import { marked } from 'marked';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check, Eye, Code } from 'lucide-react';

export default function MarkdownToHtml() {
  const [input, setInput] = useState(`# Merhaba KralTools!\n\nBu bir **Markdown** örneğidir.\n\n## Özellikler\n- Hızlı dönüşüm\n- Canlı önizleme\n- Kod bloğu desteği\n\n\`\`\`js\nconsole.log("Merhaba!");\n\`\`\`\n\n> Alıntı bloğu örneği.\n`);
  const [view, setView] = useState<'preview'|'code'>('preview');
  const [copied, setCopied] = useState(false);
  const html = marked(input) as string;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Markdown</label>
          <textarea className="tool-textarea" rows={16} value={input} onChange={e => setInput(e.target.value)} placeholder="Markdown yazın..."/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-1">
              <button onClick={() => setView('preview')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view==='preview'?'bg-violet-500/20 text-violet-400':'text-[var(--text-muted)] hover:text-white'}`}>
                <Eye size={12}/> Önizleme
              </button>
              <button onClick={() => setView('code')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view==='code'?'bg-violet-500/20 text-violet-400':'text-[var(--text-muted)] hover:text-white'}`}>
                <Code size={12}/> HTML
              </button>
            </div>
            <button onClick={async () => { await copyToClipboard(html); setCopied(true); setTimeout(()=>setCopied(false),1500); }} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
              {copied ? <Check size={13} className="text-emerald-400"/> : <Copy size={13}/>}
            </button>
          </div>
          {view === 'preview' ? (
            <div className="bg-space-800/60 border border-[var(--border-subtle)] rounded-xl p-4 min-h-[320px] overflow-auto prose prose-invert prose-sm max-w-none"
              style={{ color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: html }}/>
          ) : (
            <textarea className="tool-textarea" rows={16} readOnly value={html}/>
          )}
        </div>
      </div>
    </div>
  );
}
