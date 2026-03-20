'use client';
import { useState } from 'react';

const CODES: { code: number; text: string; desc: string; category: string }[] = [
  {code:100,text:'Continue',desc:'İstemci devam etmeli.',category:'1xx'},
  {code:200,text:'OK',desc:'İstek başarılı.',category:'2xx'},
  {code:201,text:'Created',desc:'Kaynak başarıyla oluşturuldu.',category:'2xx'},
  {code:204,text:'No Content',desc:'Başarılı, içerik yok.',category:'2xx'},
  {code:301,text:'Moved Permanently',desc:'Kaynak kalıcı olarak taşındı.',category:'3xx'},
  {code:302,text:'Found',desc:'Kaynak geçici olarak taşındı.',category:'3xx'},
  {code:304,text:'Not Modified',desc:'Önbellek geçerli, içerik değişmedi.',category:'3xx'},
  {code:400,text:'Bad Request',desc:'Geçersiz istek formatı.',category:'4xx'},
  {code:401,text:'Unauthorized',desc:'Kimlik doğrulama gerekli.',category:'4xx'},
  {code:403,text:'Forbidden',desc:'Erişim izni yok.',category:'4xx'},
  {code:404,text:'Not Found',desc:'Kaynak bulunamadı.',category:'4xx'},
  {code:405,text:'Method Not Allowed',desc:'HTTP metodu desteklenmiyor.',category:'4xx'},
  {code:409,text:'Conflict',desc:'Kaynak çakışması.',category:'4xx'},
  {code:410,text:'Gone',desc:'Kaynak kalıcı olarak kaldırıldı.',category:'4xx'},
  {code:422,text:'Unprocessable Entity',desc:'Doğrulama hatası.',category:'4xx'},
  {code:429,text:'Too Many Requests',desc:'İstek limiti aşıldı.',category:'4xx'},
  {code:500,text:'Internal Server Error',desc:'Sunucu hatası.',category:'5xx'},
  {code:501,text:'Not Implemented',desc:'İşlev desteklenmiyor.',category:'5xx'},
  {code:502,text:'Bad Gateway',desc:'Geçersiz ağ geçidi yanıtı.',category:'5xx'},
  {code:503,text:'Service Unavailable',desc:'Servis kullanılamıyor.',category:'5xx'},
  {code:504,text:'Gateway Timeout',desc:'Ağ geçidi zaman aşımı.',category:'5xx'},
];

const CAT_COLOR: Record<string,string> = {'1xx':'text-blue-400','2xx':'text-emerald-400','3xx':'text-amber-400','4xx':'text-orange-400','5xx':'text-red-400'};

export default function HttpStatusCodes() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const filtered = CODES.filter(c => (cat==='all'||c.category===cat) && (c.code.toString().includes(search)||c.text.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <input className="tool-input flex-1 min-w-48" placeholder="Kod veya isim ara..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div className="flex gap-2">
          {['all','2xx','3xx','4xx','5xx'].map(c => (
            <button key={c} onClick={()=>setCat(c)} className={`px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all ${cat===c?'btn-primary':c==='all'?'btn-secondary':CAT_COLOR[c]+' btn-secondary'}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map(({code,text,desc,category}) => (
          <div key={code} className="flex items-start gap-4 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3 hover:border-[var(--border-default)] transition-all">
            <span className={`font-display font-bold text-2xl w-14 shrink-0 ${CAT_COLOR[category]}`}>{code}</span>
            <div>
              <div className="font-medium text-sm text-[var(--text-primary)]">{text}</div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-8 text-[var(--text-muted)]">Sonuç bulunamadı.</div>}
      </div>
    </div>
  );
}
