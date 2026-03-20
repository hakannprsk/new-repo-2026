'use client';
import { useState, useRef } from 'react';
import { fileToDataURL, formatFileSize, downloadBlob, canvasToBlob } from '@/lib/utils';
import { Upload, Download } from 'lucide-react';

export default function ImageResize() {
  const [src, setSrc] = useState('');
  const [origW, setOrigW] = useState(0); const [origH, setOrigH] = useState(0);
  const [w, setW] = useState(0); const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [file, setFile] = useState<File|null>(null);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setFile(f);
    const url = await fileToDataURL(f);
    setSrc(url);
    const img = new Image();
    img.onload = () => { setOrigW(img.width); setOrigH(img.height); setW(img.width); setH(img.height); };
    img.src = url;
  };

  const updateW = (v: number) => { setW(v); if (lock && origW) setH(Math.round(v*origH/origW)); };
  const updateH = (v: number) => { setH(v); if (lock && origH) setW(Math.round(v*origW/origH)); };

  const resize = async () => {
    if (!src || !w || !h) return;
    setProcessing(true);
    const img = new Image(); img.src = src;
    await new Promise(r=>img.onload=r);
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d')!.drawImage(img,0,0,w,h);
    const blob = await canvasToBlob(canvas,'image/png');
    downloadBlob(blob, `resized_${w}x${h}.png`);
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-violet-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Resmi sürükleyin veya tıklayın</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">JPG, PNG, WebP, GIF desteklenir</p>
      </div>
      {src && (
        <>
          <div className="image-preview"><img src={src} alt="preview" className="max-h-48 mx-auto object-contain p-2"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Genişlik (px)</label>
              <input type="number" className="tool-input" value={w} onChange={e=>updateW(+e.target.value)}/>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Yükseklik (px)</label>
              <input type="number" className="tool-input" value={h} onChange={e=>updateH(+e.target.value)}/>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-secondary)]">
              <input type="checkbox" checked={lock} onChange={e=>setLock(e.target.checked)}/> En-boy oranını koru
            </label>
            <span className="text-xs text-[var(--text-muted)]">Orijinal: {origW}×{origH} · {file&&formatFileSize(file.size)}</span>
          </div>
          <button onClick={resize} disabled={processing} className="btn-primary flex items-center gap-2">
            <Download size={15}/> {processing?'İşleniyor...':'PNG İndir'}
          </button>
        </>
      )}
    </div>
  );
}
