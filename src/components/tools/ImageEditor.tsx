'use client';
import { useState, useRef, useEffect } from 'react';
import { fileToDataURL, downloadBlob, canvasToBlob } from '@/lib/utils';
import { Upload, Download, RotateCcw } from 'lucide-react';

export default function ImageEditor() {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => { setFile(f); setSrc(await fileToDataURL(f)); };

  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) grayscale(${grayscale}%) sepia(${sepia}%)`;

  const reset = () => { setBrightness(100); setContrast(100); setSaturation(100); setBlur(0); setGrayscale(0); setSepia(0); };

  const download = async () => {
    if (!src) return;
    const img = new Image(); img.src = src;
    await new Promise(r=>img.onload=r);
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.filter = filterStr;
    ctx.drawImage(img,0,0);
    const blob = await canvasToBlob(canvas,'image/png');
    downloadBlob(blob,'edited.png');
  };

  const sliders = [
    { label:'Parlaklık', value:brightness, set:setBrightness, min:0, max:200, unit:'%' },
    { label:'Kontrast', value:contrast, set:setContrast, min:0, max:200, unit:'%' },
    { label:'Doygunluk', value:saturation, set:setSaturation, min:0, max:200, unit:'%' },
    { label:'Bulanıklık', value:blur, set:setBlur, min:0, max:20, unit:'px' },
    { label:'Gri Ton', value:grayscale, set:setGrayscale, min:0, max:100, unit:'%' },
    { label:'Sepia', value:sepia, set:setSepia, min:0, max:100, unit:'%' },
  ];

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-violet-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Resmi yükleyin</p>
      </div>
      {src && (
        <>
          <div className="image-preview"><img src={src} alt="preview" className="max-h-64 mx-auto object-contain p-2" style={{filter:filterStr}}/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sliders.map(({label,value,set,min,max,unit})=>(
              <div key={label}>
                <label className="block text-xs text-[var(--text-muted)] mb-2">{label}: <span className="text-violet-400 font-bold">{value}{unit}</span></label>
                <input type="range" min={min} max={max} value={value} onChange={e=>set(+e.target.value)} className="w-full"/>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={download} className="btn-primary flex items-center gap-2"><Download size={15}/>PNG İndir</button>
            <button onClick={reset} className="btn-secondary flex items-center gap-2"><RotateCcw size={14}/>Sıfırla</button>
          </div>
        </>
      )}
    </div>
  );
}
