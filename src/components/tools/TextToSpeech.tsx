'use client';
import { useState, useRef } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';

export default function TextToSpeech() {
  const [text, setText] = useState('Merhaba! Ben KralTools\'un metin okuma aracıyım.');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState('');
  const uttRef = useRef<SpeechSynthesisUtterance|null>(null);

  const loadVoices = () => {
    const v = window.speechSynthesis.getVoices();
    setVoices(v);
    if (v.length && !voice) setVoice(v[0].name);
  };

  if (typeof window !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  const speak = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = rate;
    utt.pitch = pitch;
    const v = voices.find(v => v.name === voice);
    if (v) utt.voice = v;
    utt.onend = () => setPlaying(false);
    utt.onerror = () => setPlaying(false);
    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setPlaying(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  return (
    <div className="space-y-6">
      <textarea className="tool-textarea" rows={6} value={text} onChange={e=>setText(e.target.value)} placeholder="Okunacak metni girin..."/>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Ses: <span className="text-violet-400">{voice || 'Varsayılan'}</span></label>
          <select className="tool-select w-full" value={voice} onChange={e=>setVoice(e.target.value)} onClick={loadVoices}>
            {voices.length === 0 && <option>Sesler yükleniyor...</option>}
            {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Hız: <span className="text-violet-400">{rate}x</span></label>
          <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={e=>setRate(+e.target.value)} className="w-full"/>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Perde: <span className="text-violet-400">{pitch}</span></label>
          <input type="range" min={0} max={2} step={0.1} value={pitch} onChange={e=>setPitch(+e.target.value)} className="w-full"/>
        </div>
      </div>
      <div className="flex gap-3">
        {!playing ? (
          <button onClick={speak} className="btn-primary flex items-center gap-2"><Play size={15}/> Oynat</button>
        ) : (
          <button onClick={stop} className="btn-secondary flex items-center gap-2"><Square size={15}/> Durdur</button>
        )}
      </div>
      {playing && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm">
          <Volume2 size={16} className="animate-pulse"/> Oynatılıyor...
        </div>
      )}
    </div>
  );
}
