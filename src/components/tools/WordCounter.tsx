'use client';

import { useState, useMemo } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text === '' ? 0 : text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text === '' ? 0 : text.split(/\n\n+/).filter((p) => p.trim()).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);

    // Frequency map
    const wordMap: Record<string, number> = {};
    if (text.trim()) {
      text
        .toLowerCase()
        .replace(/[^a-zA-ZÀ-ÿğüşıöçĞÜŞİÖÇ\s]/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => (wordMap[w] = (wordMap[w] || 0) + 1));
    }
    const topWords = Object.entries(wordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return { chars, charsNoSpace, words, sentences, paragraphs, lines, readingTime, speakingTime, topWords };
  }, [text]);

  const metrics = [
    { label: 'Karakter', value: stats.chars },
    { label: 'Karakter (boşluksuz)', value: stats.charsNoSpace },
    { label: 'Kelime', value: stats.words },
    { label: 'Cümle', value: stats.sentences },
    { label: 'Paragraf', value: stats.paragraphs },
    { label: 'Satır', value: stats.lines },
    { label: 'Okuma süresi', value: `~${stats.readingTime} dk` },
    { label: 'Konuşma süresi', value: `~${stats.speakingTime} dk` },
  ];

  return (
    <div className="space-y-6">
      <textarea
        className="tool-textarea"
        rows={8}
        placeholder="Analiz etmek istediğiniz metni buraya girin..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map(({ label, value }) => (
          <div
            key={label}
            className="bg-space-800/60 border border-[var(--border-subtle)] rounded-xl p-4 text-center"
          >
            <div className="font-display font-bold text-2xl text-violet-400">{value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {stats.topWords.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
            En Sık Kullanılan Kelimeler
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.topWords.map(([word, count]) => (
              <span
                key={word}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm"
              >
                <span className="text-[var(--text-primary)]">{word}</span>
                <span className="text-xs text-violet-400 font-bold">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
