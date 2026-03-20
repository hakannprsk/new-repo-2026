'use client';
import { useState, useRef } from 'react';
import { fileToDataURL, formatFileSize } from '@/lib/utils';
import { Copy, Check, Upload, Image } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function ImageToBase64() {
  const [mode, setMode] = useState<'encode'|'decode'>('encode');
  const [src, setSrc] = useState('');
  const [base64, setBase64] = useState('');
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setFile(f);
    const url = await fileToDataURL(f);
    setSrc(url);
    setBase64(url.split(',')[1]);
  };

  const decodeBase64 = (b64: string) => {
    try {
      const prefix = 'data:image/png;base64,';
      setSrc(b64.startsWith('data:') ? b64 : prefix+b64);
    } catch { setSrc(''); }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['encode','decode'] as const).map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
            {m==='encode'?'Resim → Base64':'Base64 → Resim'}
          </button>
        ))}
      </div>
      {mode==='encode' ? (
        <>
          <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
            <Image size={32} className="text-violet-400 mx-auto mb-3"/>
            <p className="text-sm text-[var(--text-secondary)]">Resmi yükleyin</p>
          </div>
          {src && <div className="image-preview"><img src={src} alt="" className="max-h-32 mx-auto object-contain p-2"/></div>}
          {base64 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-[var(--text-muted)]">Base64 Çıktısı ({Math.round(base64.length/1024)} KB)</label>
                <button onClick={async()=>{await copyToClipboard(base64);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                  {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13}/>}
                </button>
              </div>
              <textarea className="tool-textarea text-xs" rows={6} readOnly value={base64}/>
              <div className="mt-2 text-xs text-[var(--text-muted)]">HTML img: <code className="text-violet-400">&lt;img src="data:image/...;base64,{base64.slice(0,20)}..."&gt;</code></div>
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-2">Base64 Kodu</label>
            <textarea className="tool-textarea text-xs" rows={6} placeholder="data:image/png;base64,... veya sadece base64 kodu" value={base64} onChange={e=>{setBase64(e.target.value);decodeBase64(e.target.value);}}/>
          </div>
          {src && <div className="image-preview"><img src={src} alt="decoded" className="max-h-64 mx-auto object-contain p-2"/></div>}
        </>
      )}
    </div>
  );
}
