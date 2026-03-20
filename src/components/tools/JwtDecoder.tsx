'use client';
import { useState, useMemo } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Check, ShieldCheck, ShieldAlert } from 'lucide-react';

function decodeBase64(str: string): string {
  try {
    const b64 = str.replace(/-/g,'+').replace(/_/g,'/');
    const pad = b64.length % 4;
    const padded = pad ? b64 + '='.repeat(4-pad) : b64;
    return decodeURIComponent(escape(atob(padded)));
  } catch { return ''; }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktyYWxUb29scyBVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [copied, setCopied] = useState<string|null>(null);

  const decoded = useMemo(() => {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      const header = JSON.parse(decodeBase64(parts[0]));
      const payload = JSON.parse(decodeBase64(parts[1]));
      return { header, payload, signature: parts[2] };
    } catch { return null; }
  }, [token]);

  const cp = async (v: string, id: string) => { await copyToClipboard(v); setCopied(id); setTimeout(()=>setCopied(null),1500); };

  const isExpired = decoded?.payload?.exp ? decoded.payload.exp * 1000 < Date.now() : false;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">JWT Token</label>
        <textarea className="tool-textarea font-mono text-xs" rows={4} value={token} onChange={e=>setToken(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiJ9..."/>
      </div>
      {decoded ? (
        <>
          {decoded.payload?.exp && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${isExpired?'bg-red-500/10 border border-red-500/20 text-red-400':'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
              {isExpired?<ShieldAlert size={14}/>:<ShieldCheck size={14}/>}
              {isExpired ? 'Token süresi dolmuş' : `Geçerli — ${new Date(decoded.payload.exp*1000).toLocaleString('tr-TR')}'e kadar`}
            </div>
          )}
          {[
            {id:'header', label:'Header', data:decoded.header, color:'text-cyan-400'},
            {id:'payload', label:'Payload', data:decoded.payload, color:'text-violet-400'},
          ].map(({id,label,data,color}) => (
            <div key={id}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>{label}</span>
                <button onClick={()=>cp(JSON.stringify(data,null,2),id)} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] transition-all">
                  {copied===id?<Check size={12} className="text-emerald-400"/>:<Copy size={12}/>}
                </button>
              </div>
              <pre className="code-block text-xs overflow-auto">{JSON.stringify(data,null,2)}</pre>
            </div>
          ))}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Signature</span>
            <div className="mt-2 result-box text-xs break-all">{decoded.signature}</div>
          </div>
        </>
      ) : token && <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">Geçersiz JWT formatı. Token 3 bölümden oluşmalıdır.</div>}
    </div>
  );
}
