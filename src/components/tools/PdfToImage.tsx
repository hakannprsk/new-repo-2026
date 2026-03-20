'use client';
import { useState, useRef } from 'react';
import { downloadBlob } from '@/lib/utils';
import { Upload, Download, AlertCircle } from 'lucide-react';

export default function PdfToImage() {
  const [file, setFile] = useState<File|null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setFile(f); setPages([]); setError('');
    setProcessing(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const buf = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({data:buf}).promise;
      const rendered: string[] = [];
      for (let i=1;i<=Math.min(pdf.numPages,10);i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({scale:1.5});
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({canvasContext:canvas.getContext('2d')!,viewport}).promise;
        rendered.push(canvas.toDataURL('image/png'));
      }
      setPages(rendered);
    } catch(e:any) { setError('PDF yüklenirken hata oluştu: '+e.message); }
    setProcessing(false);
  };

  const dl = (dataUrl: string, i: number) => {
    const arr = dataUrl.split(',');
    const bytes = atob(arr[1]);
    const buf = new Uint8Array(bytes.length).map((_,idx)=>bytes.charCodeAt(idx));
    downloadBlob(new Blob([buf],{type:'image/png'}), `page_${i+1}.png`);
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-amber-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">PDF dosyasını yükleyin (max 10 sayfa önizlenir)</p>
      </div>
      {processing && <div className="text-center py-8 text-violet-400 animate-pulse">Sayfalar işleniyor...</div>}
      {error && <div className="flex gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle size={16}/>{error}</div>}
      {pages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {pages.map((p,i)=>(
            <div key={i} className="image-preview group relative">
              <img src={p} alt={`Sayfa ${i+1}`} className="w-full object-contain"/>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={()=>dl(p,i)} className="btn-primary flex items-center gap-2 text-sm"><Download size={14}/>PNG İndir</button>
              </div>
              <div className="text-center text-xs text-[var(--text-muted)] py-2">Sayfa {i+1}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
