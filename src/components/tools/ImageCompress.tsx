'use client';
import { useState, useRef } from 'react';
import { fileToDataURL, formatFileSize, downloadBlob, canvasToBlob, imageToCanvas } from '@/lib/utils';
import { Upload, Download } from 'lucide-react';

export default function ImageCompress() {
  const [src, setSrc] = useState('');
  const [origSize, setOrigSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<'image/jpeg'|'image/png'|'image/webp'>('image/jpeg');
  const [file, setFile] = useState<File|null>(null);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setFile(f); setOrigSize(f.size);
    setSrc(await fileToDataURL(f));
  };

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    const canvas = await imageToCanvas(file);
    const blob = await canvasToBlob(canvas, format, quality/100);
    const ext = format.split('/')[1];
    downloadBlob(blob, `compressed.${ext}`);
    setProcessing(false);
  };

  const estSize = origSize ? Math.round(origSize * (quality/100) * (format==='image/png'?1.2:0.8)) : 0;

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-amber-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Resmi sürükleyin veya tıklayın</p>
      </div>
      {src && (
        <>
          <div className="image-preview"><img src={src} alt="preview" className="max-h-48 mx-auto object-contain p-2"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Format</label>
              <select className="tool-select w-full" value={format} onChange={e=>setFormat(e.target.value as any)}>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Kalite: <span className="text-violet-400 font-bold">{quality}%</span></label>
              <input type="range" min={10} max={100} value={quality} onChange={e=>setQuality(+e.target.value)} className="w-full"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-space-800/60 border border-[var(--border-subtle)] rounded-xl p-4 text-center">
              <div className="text-lg font-bold text-[var(--text-primary)]">{formatFileSize(origSize)}</div>
              <div className="text-xs text-[var(--text-muted)]">Orijinal Boyut</div>
            </div>
            <div className="bg-space-800/60 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-lg font-bold text-emerald-400">~{formatFileSize(estSize)}</div>
              <div className="text-xs text-[var(--text-muted)]">Tahmini Boyut</div>
            </div>
          </div>
          <button onClick={compress} disabled={processing} className="btn-primary flex items-center gap-2">
            <Download size={15}/> {processing?'Sıkıştırılıyor...':'Sıkıştır & İndir'}
          </button>
        </>
      )}
    </div>
  );
}
