'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';

function formatXml(xml: string, indent: number): string {
  let formatted = '';
  let level = 0;
  const sp = ' '.repeat(indent);
  xml.replace(/>\s*</g,'>|<').split('|').forEach(node => {
    if (node.match(/^<\/\w/)) level--;
    formatted += sp.repeat(level) + node + '\n';
    if (node.match(/^<\w[^>]*[^\/]>.*$/) && !node.includes('</')) level++;
  });
  return formatted.trim();
}

export default function XmlFormatter() {
  const [input, setInput] = useState('<root><item id="1"><name>KralTools</name><type>formatter</type></item></root>');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    if (!input.trim()) return '';
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input,'text/xml');
      const err = doc.querySelector('parsererror');
      if (err) { setError('Geçersiz XML'); return ''; }
      return formatXml(input, 2);
    } catch(e: any) { setError(e.message); return ''; }
  };

  const result = process();

  return (
    <div className="space-y-5">
      {input.trim() && (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${!error ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {!error ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
          {!error ? 'Geçerli XML' : error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">XML Giriş</label>
          <textarea className="tool-textarea" rows={14} value={input} onChange={e=>setInput(e.target.value)}/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Biçimlendirilmiş</label>
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
