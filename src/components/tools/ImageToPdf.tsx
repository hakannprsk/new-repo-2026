'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { formatFileSize, downloadBlob } from '@/lib/utils';
import { Upload, Download, Trash2 } from 'lucide-react';

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (fl: FileList|null) => {
    if (!fl) return;
    setFiles(p=>[...p,...Array.from(fl).filter(f=>f.type.startsWith('image/'))]);
  };

  const convert = async () => {
    if (!files.length) return;
    setProcessing(true);
    const pdf = await PDFDocument.create();
    for (const file of files) {
      const buf = await file.arrayBuffer();
      const img = file.type==='image/png' ? await pdf.embedPng(buf) : await pdf.embedJpg(buf);
      const page = pdf.addPage([img.width, img.height]);
      page.drawImage(img, {x:0,y:0,width:img.width,height:img.height});
    }
    const bytes = await pdf.save();
    downloadBlob(new Blob([bytes],{type:'application/pdf'}), 'images.pdf');
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();addFiles(e.dataTransfer.files);}}>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={e=>addFiles(e.target.files)}/>
        <Upload size={32} className="text-violet-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">Resimleri yükleyin (JPG, PNG)</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">Her resim bir PDF sayfası olacak</p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f,i)=>(
            <div key={i} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5">
              <span className="w-5 h-5 text-xs text-violet-400 font-bold">{i+1}</span>
              <span className="flex-1 text-sm truncate">{f.name}</span>
              <span className="text-xs text-[var(--text-muted)]">{formatFileSize(f.size)}</span>
              <button onClick={()=>setFiles(p=>p.filter((_,idx)=>idx!==i))} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-all"><Trash2 size={12}/></button>
            </div>
          ))}
        </div>
      )}
      <button onClick={convert} disabled={!files.length||processing} className="btn-primary flex items-center gap-2 disabled:opacity-50">
        <Download size={15}/>{processing?'PDF oluşturuluyor...':'PDF\'e Dönüştür & İndir'}
      </button>
    </div>
  );
}
