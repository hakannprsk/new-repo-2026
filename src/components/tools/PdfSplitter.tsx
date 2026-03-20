'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { downloadBlob } from '@/lib/utils';
import { Upload, Download } from 'lucide-react';

export default function PdfSplitter() {
  const [file, setFile] = useState<File|null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setFile(f);
    const buf = await f.arrayBuffer();
    const doc = await PDFDocument.load(buf);
    const count = doc.getPageCount();
    setPageCount(count);
    setTo(count);
  };

  const split = async () => {
    if (!file) return;
    setProcessing(true);
    const buf = await file.arrayBuffer();
    const src = await PDFDocument.load(buf);
    const newDoc = await PDFDocument.create();
    const indices = Array.from({length:to-from+1},(_,i)=>from-1+i);
    const pages = await newDoc.copyPages(src,indices);
    pages.forEach(p=>newDoc.addPage(p));
    const bytes = await newDoc.save();
    downloadBlob(new Blob([bytes],{type:'application/pdf'}),`pages_${from}-${to}.pdf`);
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-amber-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">PDF dosyasını yükleyin</p>
      </div>
      {file && (
        <>
          <div className="px-4 py-3 rounded-xl bg-space-800/60 border border-[var(--border-default)] text-sm">
            <span className="text-[var(--text-primary)]">{file.name}</span>
            <span className="text-violet-400 ml-3 font-bold">{pageCount} sayfa</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Başlangıç Sayfası</label>
              <input type="number" className="tool-input" min={1} max={pageCount} value={from} onChange={e=>setFrom(Math.min(+e.target.value,to))}/>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Bitiş Sayfası</label>
              <input type="number" className="tool-input" min={from} max={pageCount} value={to} onChange={e=>setTo(Math.max(+e.target.value,from))}/>
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Seçili: {to-from+1} sayfa (sayfa {from} - {to})</p>
          <button onClick={split} disabled={processing} className="btn-primary flex items-center gap-2">
            <Download size={15}/>{processing?'Bölünüyor...':'Böl & İndir'}
          </button>
        </>
      )}
    </div>
  );
}
