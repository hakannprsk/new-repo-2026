'use client';
import { useState, useRef } from 'react';
import { copyToClipboard, downloadText } from '@/lib/utils';
import { Upload, Copy, Check, Download, ScanText } from 'lucide-react';

export default function OcrTool() {
  const [src, setSrc] = useState('');
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    const url = URL.createObjectURL(f);
    setSrc(url); setText(''); setProgress('');
    setProcessing(true);
    try {
      const Tesseract = (await import('tesseract.js')).default;
      const result = await Tesseract.recognize(url, 'tur+eng', {
        logger: (m: any) => { if (m.status==='recognizing text') setProgress(`İşleniyor: %${Math.round(m.progress*100)}`); }
      });
      setText(result.data.text);
    } catch(e:any) { setText('OCR hatası: '+e.message); }
    setProcessing(false); setProgress('');
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <ScanText size={32} className="text-cyan-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Metin içeren resmi yükleyin</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">Türkçe ve İngilizce desteklenir · Tesseract.js</p>
      </div>
      {src && <div className="image-preview"><img src={src} alt="ocr source" className="max-h-48 mx-auto object-contain p-2"/></div>}
      {processing && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
          <span className="animate-pulse">⚙</span> {progress || 'Metin tanınıyor...'}
        </div>
      )}
      {text && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)]">Tanınan Metin</label>
            <div className="flex gap-1">
              <button onClick={async()=>{await copyToClipboard(text);setCopied(true);setTimeout(()=>setCopied(false),1500);}} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                {copied?<Check size={13} className="text-emerald-400"/>:<Copy size={13}/>}
              </button>
              <button onClick={()=>downloadText(text,'ocr_result.txt')} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all"><Download size={13}/></button>
            </div>
          </div>
          <textarea className="tool-textarea" rows={10} value={text} onChange={e=>setText(e.target.value)}/>
          <p className="text-xs text-[var(--text-muted)] mt-1">{text.split(/\s+/).filter(Boolean).length} kelime · {text.length} karakter</p>
        </div>
      )}
    </div>
  );
}
