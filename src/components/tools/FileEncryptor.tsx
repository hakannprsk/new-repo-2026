'use client';
import { useState, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { formatFileSize, downloadBlob } from '@/lib/utils';
import { Upload, Lock, Unlock, Eye, EyeOff } from 'lucide-react';

export default function FileEncryptor() {
  const [file, setFile] = useState<File|null>(null);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'encrypt'|'decrypt'>('encrypt');
  const [showPw, setShowPw] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const process = async () => {
    if (!file || !password) return;
    setProcessing(true); setError('');
    try {
      const buf = await file.arrayBuffer();
      if (mode==='encrypt') {
        const wordArray = CryptoJS.lib.WordArray.create(buf as any);
        const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
        downloadBlob(new Blob([encrypted],{type:'text/plain'}), file.name+'.enc');
      } else {
        const text = new TextDecoder().decode(buf);
        const decrypted = CryptoJS.AES.decrypt(text, password);
        const bytes = new Uint8Array(decrypted.sigBytes);
        const words = decrypted.words;
        for (let i=0;i<decrypted.sigBytes;i++) bytes[i]=(words[i>>>2]>>>(24-(i%4)*8))&0xff;
        const origName = file.name.endsWith('.enc') ? file.name.slice(0,-4) : 'decrypted_'+file.name;
        downloadBlob(new Blob([bytes]), origName);
      }
    } catch(e:any) { setError('Hata: Şifre yanlış veya dosya bozuk olabilir.'); }
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['encrypt','decrypt'] as const).map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode===m?'btn-primary':'btn-secondary'}`}>
            {m==='encrypt'?<><Lock size={14}/>Şifrele</>:<><Unlock size={14}/>Şifre Çöz</>}
          </button>
        ))}
      </div>
      <div className="drop-zone" onClick={()=>inputRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)setFile(f);}}>
        <input ref={inputRef} type="file" className="hidden" onChange={e=>e.target.files?.[0]&&setFile(e.target.files[0])}/>
        <Upload size={32} className="text-violet-400 mx-auto mb-3"/>
        <p className="text-sm text-[var(--text-secondary)]">{mode==='encrypt'?'Şifrelenecek dosyayı':'Şifreli dosyayı (.enc)'} yükleyin</p>
      </div>
      {file && <div className="text-sm text-[var(--text-muted)] px-4 py-2 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl">{file.name} · {formatFileSize(file.size)}</div>}
      <div>
        <label className="block text-xs text-[var(--text-muted)] mb-2">AES-256 Şifre</label>
        <div className="flex gap-2">
          <input type={showPw?'text':'password'} className="tool-input flex-1" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Güçlü bir şifre girin..."/>
          <button onClick={()=>setShowPw(p=>!p)} className="btn-secondary px-3">{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>
        </div>
      </div>
      {error && <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      <button onClick={process} disabled={!file||!password||processing} className="btn-primary flex items-center gap-2 disabled:opacity-50">
        {mode==='encrypt'?<Lock size={15}/>:<Unlock size={15}/>}
        {processing?'İşleniyor...':mode==='encrypt'?'Şifrele & İndir':'Şifre Çöz & İndir'}
      </button>
    </div>
  );
}
