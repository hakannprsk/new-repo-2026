'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { formatFileSize, downloadBlob } from '@/lib/utils';
import { Upload, Download, Trash2, GripVertical } from 'lucide-react';

export default function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfs = Array.from(newFiles).filter(f=>f.type==='application/pdf');
    setFiles(p=>[...p,...pdfs]);
  };

  const remove = (i: number) => setFiles(p=>p.filter((_,idx)=>idx!==i));
  const moveUp = (i: number) => { if(i===0) return; setFiles(p=>{const a=[...p];[a[i-1],a[i]]=[a[i],a[i-1]];return a;}); };

  const merge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      const merged = await PDFDocument.create();
      for (let i=0;i<files.length;i++) {
        setProgress(`${i+1}/${files.length} PDF işleniyor...`);
        const buf = await files[i].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach(p=>merged.addPage(p));
      }
      setProgress('Kaydediliyor...');
      const bytes = await merged.save();
      downloadBlob(new Blob([bytes],{type:'application/pdf'}),'merged.pdf');
    } catch(e: any) { alert('Hata: '+e.message); }
    setProcessing(false); setProgress('');
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();addFiles(e.dataTransfer.files);}}>
        <input ref={inputRef} type="file" accept=".pdf" multiple className="hidden" onChange={e=>addFiles(e.target.files)}/>
        <Upload size={32} className="text-amber-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">PDF dosyalarını sürükleyin (birden fazla)</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">Sıralama önemlidir</p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">{files.length} dosya · Yukarı/aşağı ok ile sırala</span>
            <span className="text-xs text-violet-400">{files.reduce((a,f)=>a+f.size,0) > 0 ? formatFileSize(files.reduce((a,f)=>a+f.size,0)) : ''}</span>
          </div>
          {files.map((f,i)=>(
            <div key={i} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3">
              <GripVertical size={14} className="text-[var(--text-muted)] cursor-grab"/>
              <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold shrink-0">{i+1}</span>
              <span className="flex-1 text-sm text-[var(--text-primary)] truncate">{f.name}</span>
              <span className="text-xs text-[var(--text-muted)]">{formatFileSize(f.size)}</span>
              <div className="flex gap-1">
                <button onClick={()=>moveUp(i)} disabled={i===0} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] disabled:opacity-30 transition-all text-xs">↑</button>
                <button onClick={()=>remove(i)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-all"><Trash2 size={12}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {processing && (
        <div className="px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm">{progress}</div>
      )}
      <button onClick={merge} disabled={files.length<2||processing} className="btn-primary flex items-center gap-2 disabled:opacity-50">
        <Download size={15}/> {processing?'Birleştiriliyor...':'Birleştir & İndir'}
      </button>
    </div>
  );
}
