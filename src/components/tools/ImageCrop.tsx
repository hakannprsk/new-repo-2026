'use client';
import { useState, useRef, useEffect } from 'react';
import { fileToDataURL, downloadBlob, canvasToBlob } from '@/lib/utils';
import { Upload, Download, Crop } from 'lucide-react';

export default function ImageCrop() {
  const [src, setSrc] = useState('');
  const [x, setX] = useState(0); const [y, setY] = useState(0);
  const [cw, setCw] = useState(200); const [ch, setCh] = useState(200);
  const [imgW, setImgW] = useState(0); const [imgH, setImgH] = useState(0);
  const [file, setFile] = useState<File|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setFile(f);
    const url = await fileToDataURL(f);
    setSrc(url);
    const img = new Image();
    img.onload = () => { setImgW(img.width); setImgH(img.height); setCw(Math.min(200,img.width)); setCh(Math.min(200,img.height)); };
    img.src = url;
  };

  const doCrop = async () => {
    if (!src) return;
    const img = new Image(); img.src = src;
    await new Promise(r=>img.onload=r);
    const canvas = document.createElement('canvas');
    canvas.width = cw; canvas.height = ch;
    canvas.getContext('2d')!.drawImage(img, x, y, cw, ch, 0, 0, cw, ch);
    const blob = await canvasToBlob(canvas,'image/png');
    downloadBlob(blob, `cropped_${cw}x${ch}.png`);
  };

  const RATIOS = [{label:'Serbest',w:cw,h:ch},{label:'1:1',w:200,h:200},{label:'16:9',w:320,h:180},{label:'4:3',w:400,h:300},{label:'3:2',w:300,h:200}];

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Crop size={32} className="text-emerald-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Resmi sürükleyin veya tıklayın</p>
      </div>
      {src && (
        <>
          <div className="flex flex-wrap gap-2">
            {RATIOS.slice(1).map(r => (
              <button key={r.label} onClick={()=>{setCw(r.w);setCh(r.h);}} className="btn-secondary text-xs px-3 py-2">{r.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{label:'X',v:x,set:setX,max:Math.max(0,imgW-cw)},{label:'Y',v:y,set:setY,max:Math.max(0,imgH-ch)},
              {label:'Genişlik',v:cw,set:setCw,max:imgW},{label:'Yükseklik',v:ch,set:setCh,max:imgH}].map(({label,v,set,max}) => (
              <div key={label}>
                <label className="block text-xs text-[var(--text-muted)] mb-2">{label} (px)</label>
                <input type="number" className="tool-input" value={v} min={0} max={max}
                  onChange={e=>set(Math.min(+e.target.value,max))}/>
              </div>
            ))}
          </div>
          <div className="image-preview relative overflow-hidden" style={{maxHeight:'300px'}}>
            <img src={src} alt="preview" className="object-contain w-full"/>
            <div className="absolute border-2 border-violet-400 pointer-events-none" style={{
              left:`${imgW?x/imgW*100:0}%`,top:`${imgH?y/imgH*100:0}%`,
              width:`${imgW?cw/imgW*100:0}%`,height:`${imgH?ch/imgH*100:0}%`,
              boxShadow:'0 0 0 9999px rgba(0,0,0,0.5)'
            }}/>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--text-muted)]">Kırpma: {x},{y} · {cw}×{ch}px</span>
            <button onClick={doCrop} className="btn-primary flex items-center gap-2 ml-auto"><Download size={15}/> Kırp & İndir</button>
          </div>
        </>
      )}
    </div>
  );
}
