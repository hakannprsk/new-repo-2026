'use client';
import { useState, useRef } from 'react';
import { fileToDataURL, downloadBlob, canvasToBlob } from '@/lib/utils';
import { Upload, Download } from 'lucide-react';

const SIZES = [16,32,48,64,128,256];

export default function FaviconGenerator() {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onFile = async (f: File) => { setFile(f); setSrc(await fileToDataURL(f)); };

  const download = async (size: number) => {
    if (!src) return;
    const img = new Image(); img.src = src;
    await new Promise(r=>img.onload=r);
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    canvas.getContext('2d')!.drawImage(img,0,0,size,size);
    const blob = await canvasToBlob(canvas,'image/png');
    downloadBlob(blob, `favicon_${size}x${size}.png`);
  };

  const downloadAll = async () => { for (const s of SIZES) await download(s); };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-violet-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Kare resim yükleyin (önerilen: 256×256+)</p>
      </div>
      {src && (
        <>
          <div className="flex items-center gap-6 p-4 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl">
            {SIZES.slice(0,4).map(s => (
              <div key={s} className="flex flex-col items-center gap-1">
                <img src={src} alt="" style={{width:s/4,height:s/4}} className="rounded"/>
                <span className="text-[10px] text-[var(--text-muted)]">{s}px</span>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Boyutlar</label>
              <button onClick={downloadAll} className="btn-secondary flex items-center gap-2 text-xs"><Download size={12}/> Hepsini İndir</button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {SIZES.map(s => (
                <button key={s} onClick={()=>download(s)} className="flex flex-col items-center gap-2 p-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl hover:border-violet-500/40 transition-all">
                  <Download size={14} className="text-violet-400"/>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{s}×{s}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
