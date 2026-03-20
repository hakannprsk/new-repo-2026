'use client';
import { useState, useRef } from 'react';
import { fileToDataURL, downloadBlob, canvasToBlob, imageToCanvas, formatFileSize } from '@/lib/utils';
import { Upload, Download } from 'lucide-react';

const FORMATS = ['image/jpeg','image/png','image/webp','image/bmp'] as const;

export default function ImageFormatConverter() {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const [target, setTarget] = useState<typeof FORMATS[number]>('image/webp');
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => { setFile(f); setSrc(await fileToDataURL(f)); };

  const convert = async () => {
    if (!file) return;
    setProcessing(true);
    const canvas = await imageToCanvas(file);
    const blob = await canvasToBlob(canvas, target, quality/100);
    const ext = target.split('/')[1];
    downloadBlob(blob, `converted.${ext}`);
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-cyan-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">JPG, PNG, WebP, BMP yükleyin</p>
      </div>
      {src && (
        <>
          <div className="image-preview"><img src={src} alt="preview" className="max-h-48 mx-auto object-contain p-2"/></div>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span>{file?.name}</span>
            <span>·</span>
            <span>{file&&formatFileSize(file.size)}</span>
            <span>·</span>
            <span className="text-violet-400">{file?.type.split('/')[1].toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Hedef Format</label>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map(f => (
                  <button key={f} onClick={()=>setTarget(f)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${target===f?'btn-primary':'btn-secondary'}`}>
                    {f.split('/')[1].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            {target !== 'image/png' && (
              <div>
                <label className="block text-xs text-[var(--text-muted)] mb-2">Kalite: <span className="text-violet-400">{quality}%</span></label>
                <input type="range" min={10} max={100} value={quality} onChange={e=>setQuality(+e.target.value)} className="w-full"/>
              </div>
            )}
          </div>
          <button onClick={convert} disabled={processing} className="btn-primary flex items-center gap-2">
            <Download size={15}/> {processing?'Dönüştürülüyor...':'Dönüştür & İndir'}
          </button>
        </>
      )}
    </div>
  );
}
