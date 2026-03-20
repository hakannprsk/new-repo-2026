'use client';
import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, Shield } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

function generatePassword(length: number, opts: Record<string, boolean>): string {
  const sets: Record<string, string> = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };
  let chars = '';
  Object.entries(opts).forEach(([k, v]) => { if (v) chars += sets[k]; });
  if (!chars) chars = sets.lower;
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function getStrength(pwd: string): { label: string; color: string; width: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 2) return { label: 'Zayıf', color: 'bg-red-500', width: 'w-1/4' };
  if (score <= 4) return { label: 'Orta', color: 'bg-amber-500', width: 'w-1/2' };
  if (score <= 5) return { label: 'İyi', color: 'bg-blue-500', width: 'w-3/4' };
  return { label: 'Güçlü', color: 'bg-emerald-500', width: 'w-full' };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: false });
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [count, setCount] = useState(5);

  const generate = useCallback(() => {
    setPasswords(Array.from({ length: count }, () => generatePassword(length, opts)));
  }, [length, opts, count]);

  const handleCopy = async (pwd: string, i: number) => {
    await copyToClipboard(pwd);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  const optLabels: Record<string, string> = { upper: 'A-Z', lower: 'a-z', numbers: '0-9', symbols: '!@#' };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
            Uzunluk: <span className="text-violet-400 font-bold">{length}</span>
          </label>
          <input type="range" min={4} max={64} value={length} onChange={e => setLength(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1"><span>4</span><span>64</span></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
            Adet: <span className="text-violet-400 font-bold">{count}</span>
          </label>
          <input type="range" min={1} max={20} value={count} onChange={e => setCount(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1"><span>1</span><span>20</span></div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">Karakter Seti</label>
        <div className="flex flex-wrap gap-3">
          {Object.entries(opts).map(([k, v]) => (
            <label key={k} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={v} onChange={e => setOpts(p => ({ ...p, [k]: e.target.checked }))} />
              <span className={`text-sm font-mono font-bold ${v ? 'text-violet-400' : 'text-[var(--text-muted)]'}`}>
                {optLabels[k]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={generate} className="btn-primary flex items-center gap-2">
        <RefreshCw size={15} /> Oluştur
      </button>

      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pwd, i) => {
            const str = getStrength(pwd);
            return (
              <div key={i} className="flex items-center gap-3 bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3 group hover:border-[var(--border-default)] transition-all">
                <Shield size={14} className={str.label === 'Güçlü' ? 'text-emerald-400' : str.label === 'İyi' ? 'text-blue-400' : 'text-amber-400'} />
                <span className="flex-1 font-mono text-sm text-[var(--text-primary)] tracking-wider">{pwd}</span>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${str.color} ${str.width} transition-all`} />
                  </div>
                  <span className="text-xs text-[var(--text-muted)] w-12">{str.label}</span>
                </div>
                <button onClick={() => handleCopy(pwd, i)} className="p-1.5 rounded-lg hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all">
                  {copied === i ? <Check size={13} className="text-emerald-400"/> : <Copy size={13}/>}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
