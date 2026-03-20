'use client';
import { useState, useRef } from 'react';
import { fileToDataURL, downloadBlob, canvasToBlob } from '@/lib/utils';
import { Upload, Download } from 'lucide-react';

const POSITIONS = ['üst-sol','üst-orta','üst-sağ','orta','alt-sol','alt-orta','alt-sağ'];

export default function ImageWatermark() {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const [text, setText] = useState('© KralTools');
  const [position, setPosition] = useState('alt-sağ');
  const [opacity, setOpacity] = useState(70);
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState('#ffffff');
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => { setFile(f); setSrc(await fileToDataURL(f)); };

  const apply = async () => {
    if (!src) return;
    setProcessing(true);
    const img = new Image(); img.src = src;
    await new Promise(r=>img.onload=r);
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img,0,0);
    ctx.globalAlpha = opacity/100;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px 'Syne', sans-serif`;
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(text).width;
    const pad = 20;
    const [vy, vx] = position.split('-');
    let x = vx==='sol' ? pad : vx==='sağ' ? img.width-tw-pad : (img.width-tw)/2;
    let y = vy==='üst' ? fontSize/2+pad : vy==='alt' ? img.height-fontSize/2-pad : img.height/2;
    ctx.fillText(text,x,y);
    const blob = await canvasToBlob(canvas,'image/png');
    downloadBlob(blob,'watermarked.png');
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-amber-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Resmi yükleyin</p>
      </div>
      {src && (
        <>
          <div className="image-preview"><img src={src} alt="preview" className="max-h-48 mx-auto object-contain p-2"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Filigran Metni</label>
              <input className="tool-input" value={text} onChange={e=>setText(e.target.value)}/>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Renk</label>
              <div className="flex gap-2">
                <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"/>
                <input className="tool-input flex-1 font-mono" value={color} onChange={e=>setColor(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Opaklık: <span className="text-violet-400">{opacity}%</span></label>
              <input type="range" min={10} max={100} value={opacity} onChange={e=>setOpacity(+e.target.value)} className="w-full"/>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Font Boyutu: <span className="text-violet-400">{fontSize}px</span></label>
              <input type="range" min={12} max={120} value={fontSize} onChange={e=>setFontSize(+e.target.value)} className="w-full"/>
            </div>
          </div>
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-2">Pozisyon</label>
            <div className="grid grid-cols-3 gap-1 w-36">
              {['üst-sol','üst-orta','üst-sağ','','orta','','alt-sol','alt-orta','alt-sağ'].map((p,i) => (
                p ? <button key={i} onClick={()=>setPosition(p)} className={`py-2 rounded-lg text-[10px] transition-all ${position===p?'btn-primary':'btn-secondary'}`}>●</button>
                : <div key={i}/>
              ))}
            </div>
          </div>
          <button onClick={apply} disabled={processing} className="btn-primary flex items-center gap-2"><Download size={15}/>{processing?'İşleniyor...':'Uygula & İndir'}</button>
        </>
      )}
    </div>
  );
}
