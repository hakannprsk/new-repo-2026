'use client';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://kraltools.vercel.app');
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState('#a78bfa');
  const [bg, setBg] = useState('#0b0b1f');
  const [ecLevel, setEcLevel] = useState<'L'|'M'|'Q'|'H'>('M');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size, margin: 2,
      color: { dark: fg, light: bg },
      errorCorrectionLevel: ecLevel,
    }).catch(console.error);
  }, [text, size, fg, bg, ecLevel]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">İçerik</label>
            <textarea className="tool-textarea" rows={4} value={text} onChange={e => setText(e.target.value)} placeholder="URL, metin, telefon numarası..."/>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Boyut: {size}px</label>
              <input type="range" min={128} max={512} step={32} value={size} onChange={e => setSize(+e.target.value)} className="w-full"/>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Hata Düzeltme</label>
              <select className="tool-select w-full" value={ecLevel} onChange={e => setEcLevel(e.target.value as any)}>
                <option value="L">L - Düşük (7%)</option>
                <option value="M">M - Orta (15%)</option>
                <option value="Q">Q - Yüksek (25%)</option>
                <option value="H">H - Maksimum (30%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Ön Renk</label>
              <div className="flex items-center gap-3">
                <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"/>
                <input className="tool-input flex-1" value={fg} onChange={e => setFg(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-2">Arka Renk</label>
              <div className="flex items-center gap-3">
                <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"/>
                <input className="tool-input flex-1" value={bg} onChange={e => setBg(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-2xl border border-[var(--border-default)] bg-space-800/60">
            <canvas ref={canvasRef} className="rounded-xl"/>
          </div>
          <button onClick={download} className="btn-primary flex items-center gap-2">
            <Download size={15}/> PNG İndir
          </button>
        </div>
      </div>
    </div>
  );
}
