'use client';
import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { formatFileSize, downloadBlob } from '@/lib/utils';
import { Upload, Download, Trash2, FolderOpen } from 'lucide-react';

export default function ZipTool() {
  const [mode, setMode] = useState<'create'|'extract'>('create');
  const [files, setFiles] = useState<File[]>([]);
  const [zipFile, setZipFile] = useState<File|null>(null);
  const [entries, setEntries] = useState<{name:string,size:number}[]>([]);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (fl:FileList|null) => { if(fl) setFiles(p=>[...p,...Array.from(fl)]); };

  const createZip = async () => {
    if (!files.length) return;
    setProcessing(true);
    const zip = new JSZip();
    for (const f of files) zip.file(f.name, await f.arrayBuffer());
    const blob = await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6}});
    downloadBlob(blob,'archive.zip');
    setProcessing(false);
  };

  const readZip = async (f: File) => {
    setZipFile(f); setEntries([]);
    const zip = await JSZip.loadAsync(await f.arrayBuffer());
    const list: {name:string,size:number}[] = [];
    zip.forEach((path,entry)=>{ if(!entry.dir) list.push({name:path,size:0}); });
    setEntries(list);
  };

  const extractAll = async () => {
    if (!zipFile) return;
    setProcessing(true);
    const zip = await JSZip.loadAsync(await zipFile.arrayBuffer());
    for (const [name,entry] of Object.entries(zip.files)) {
      if (!entry.dir) {
        const blob = await entry.async('blob');
        downloadBlob(blob, name.split('/').pop()!);
      }
    }
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['create','extract'] as const).map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
            {m==='create'?'ZIP Oluştur':'ZIP Aç'}
          </button>
        ))}
      </div>
      {mode==='create' && (
        <>
          <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();addFiles(e.dataTransfer.files);}}>
            <input ref={inputRef} type="file" multiple className="hidden" onChange={e=>addFiles(e.target.files)}/>
            <Upload size={32} className="text-amber-400 mx-auto mb-3"/>
            <p className="text-sm text-[var(--text-secondary)]">Dosyaları ekleyin</p>
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f,i)=>(
                <div key={i} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5">
                  <span className="flex-1 text-sm truncate">{f.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">{formatFileSize(f.size)}</span>
                  <button onClick={()=>setFiles(p=>p.filter((_,idx)=>idx!==i))} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-all"><Trash2 size={12}/></button>
                </div>
              ))}
            </div>
          )}
          <button onClick={createZip} disabled={!files.length||processing} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            <Download size={15}/>{processing?'Oluşturuluyor...':'ZIP Oluştur & İndir'}
          </button>
        </>
      )}
      {mode==='extract' && (
        <>
          <div className="drop-zone" onClick={()=>zipInputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)readZip(f);}}>
            <input ref={zipInputRef} type="file" accept=".zip" className="hidden" onChange={e=>e.target.files?.[0]&&readZip(e.target.files[0])}/>
            <FolderOpen size={32} className="text-amber-400 mx-auto mb-3"/>
            <p className="text-sm text-[var(--text-secondary)]">ZIP dosyasını yükleyin</p>
          </div>
          {entries.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">{entries.length} dosya</span>
                <button onClick={extractAll} disabled={processing} className="btn-primary text-sm flex items-center gap-2 px-4 py-2"><Download size={14}/>{processing?'Çıkartılıyor...':'Hepsini Çıkart'}</button>
              </div>
              {entries.map(e=>(
                <div key={e.name} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5">
                  <span className="text-sm text-[var(--text-secondary)] truncate">{e.name}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
