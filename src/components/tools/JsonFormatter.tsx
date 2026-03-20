'use client';
import { useState, useCallback } from 'react';
import { copyToClipboard, downloadText } from '@/lib/utils';
import { Copy, Check, Download, Minimize2, Maximize2, AlertCircle, CheckCircle } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"KralTools","version":"1.0","tools":["JSON","XML","CSS"],"active":true}');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'format'|'minify'>('format');

  const process = useCallback(() => {
    setError('');
    if (!input.trim()) return '';
    try {
      const parsed = JSON.parse(input);
      if (mode === 'minify') return JSON.stringify(parsed);
      return JSON.stringify(parsed, null, indent);
    } catch (e: any) {
      setError(e.message);
      return '';
    }
  }, [input, indent, mode]);

  const result = process();
  const isValid = !error && input.trim() !== '';

  return (
    <div className="space-y-5">
      {/* Status bar */}
      {input.trim() && (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${isValid ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {isValid ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
          {isValid ? `Geçerli JSON · ${Object.keys(JSON.parse(result||'{}')).length || 0} anahtar` : error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {(['format','minify'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
              {m === 'format' ? <><Maximize2 size={13}/> Biçimlendir</> : <><Minimize2 size={13}/> Sıkıştır</>}
            </button>
          ))}
        </div>
        {mode === 'format' && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-muted)]">Girinti:</label>
            {[2, 4].map(n => (
              <button key={n} onClick={() => setIndent(n)} className={`w-8 h-8 rounded-lg text-sm font-mono font-bold transition-all ${indent===n?'bg-violet-500/20 text-violet-400 border border-violet-500/30':'text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--border-default)]'}`}>{n}</button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Giriş (JSON)</label>
          <textarea className="tool-textarea" rows={16} value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}'/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Sonuç</label>
            <div className="flex gap-1">
              {result && <>
                <button onClick={async () => { await copyToClipboard(result); setCopied(true); setTimeout(()=>setCopied(false),1500); }} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                  {copied ? <Check size={13} className="text-emerald-400"/> : <Copy size={13}/>}
                </button>
                <button onClick={() => downloadText(result, 'formatted.json')} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all"><Download size={13}/></button>
              </>}
            </div>
          </div>
          <textarea className="tool-textarea" rows={16} readOnly value={result} placeholder="Biçimlendirilmiş JSON..."/>
        </div>
      </div>
    </div>
  );
}
