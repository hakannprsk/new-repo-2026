'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { formatFileSize, downloadBlob } from '@/lib/utils';
import { Upload, Download } from 'lucide-react';

export default function PdfCompressor() {
  const [file, setFile] = useState<File|null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{size:number,blob:Blob}|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File) => { setFile(f); setResult(null); };

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    const buf = await file.arrayBuffer();
    const doc = await PDFDocument.load(buf, { updateMetadata: false });
    // Remove metadata to reduce size
    doc.setTitle(''); doc.setAuthor(''); doc.setSubject(''); doc.setKeywords([]);
    const bytes = await doc.save({ useObjectStreams: true });
    const blob = new Blob([bytes],{type:'application/pdf'});
    setResult({size:bytes.length,blob});
    setProcessing(false);
  };

  const saving = file && result ? Math.round((1 - result.size/file.size)*100) : 0;

  return (
    <div className="space-y-6">
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)onFile(f);}}>
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
        <Upload size={32} className="text-amber-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">PDF dosyasını yükleyin</p>
      </div>
      {file && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-space-800/60 border border-[var(--border-subtle)] rounded-xl p-4 text-center">
              <div className="font-bold text-lg text-[var(--text-primary)]">{formatFileSize(file.size)}</div>
              <div className="text-xs text-[var(--text-muted)]">Orijinal</div>
            </div>
            {result && (
              <div className="bg-space-800/60 border border-emerald-500/20 rounded-xl p-4 text-center">
                <div className="font-bold text-lg text-emerald-400">{formatFileSize(result.size)}</div>
                <div className="text-xs text-[var(--text-muted)]">{saving > 0 ? `%${saving} küçüldü` : 'Zaten optimize'}</div>
              </div>
            )}
          </div>
          {!result && <button onClick={compress} disabled={processing} className="btn-primary flex items-center gap-2"><Download size={15}/>{processing?'Sıkıştırılıyor...':'Sıkıştır'}</button>}
          {result && <button onClick={()=>downloadBlob(result.blob,'compressed.pdf')} className="btn-primary flex items-center gap-2"><Download size={15}/>Sıkıştırılmış PDF'i İndir</button>}
        </>
      )}
    </div>
  );
}
