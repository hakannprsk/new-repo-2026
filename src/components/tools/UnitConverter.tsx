'use client';
import { useState } from 'react';

type Category = { name: string; units: { label: string; factor: number; offset?: number }[] };

const CATEGORIES: Record<string, Category> = {
  length: { name: 'Uzunluk', units: [
    {label:'Metre (m)',factor:1},{label:'Kilometre (km)',factor:1000},{label:'Santimetre (cm)',factor:0.01},
    {label:'Milimetre (mm)',factor:0.001},{label:'Mil (mi)',factor:1609.34},{label:'Yarda (yd)',factor:0.9144},
    {label:'Fit (ft)',factor:0.3048},{label:'İnç (in)',factor:0.0254},{label:'Deniz mili',factor:1852},
  ]},
  weight: { name: 'Ağırlık', units: [
    {label:'Kilogram (kg)',factor:1},{label:'Gram (g)',factor:0.001},{label:'Miligram (mg)',factor:0.000001},
    {label:'Pound (lb)',factor:0.453592},{label:'Ons (oz)',factor:0.0283495},{label:'Ton (t)',factor:1000},
  ]},
  temperature: { name: 'Sıcaklık', units: [
    {label:'Celsius (°C)',factor:1,offset:0},{label:'Fahrenheit (°F)',factor:5/9,offset:-32*5/9},
    {label:'Kelvin (K)',factor:1,offset:-273.15},
  ]},
  area: { name: 'Alan', units: [
    {label:'m²',factor:1},{label:'km²',factor:1e6},{label:'cm²',factor:0.0001},
    {label:'Hektar (ha)',factor:10000},{label:'Dönüm',factor:1000},{label:'ft²',factor:0.092903},
    {label:'Mil²',factor:2589988},{label:'Acre',factor:4046.86},
  ]},
  data: { name: 'Veri', units: [
    {label:'Byte (B)',factor:1},{label:'Kilobyte (KB)',factor:1024},{label:'Megabyte (MB)',factor:1048576},
    {label:'Gigabyte (GB)',factor:1073741824},{label:'Terabyte (TB)',factor:1099511627776},
    {label:'Bit',factor:0.125},{label:'Kilobit (Kb)',factor:128},{label:'Megabit (Mb)',factor:131072},
  ]},
  speed: { name: 'Hız', units: [
    {label:'m/s',factor:1},{label:'km/h',factor:1/3.6},{label:'mph',factor:0.44704},
    {label:'Knot',factor:0.514444},{label:'Mach',factor:340.29},
  ]},
};

function convert(value: number, fromFactor: number, fromOffset: number=0, toFactor: number, toOffset: number=0): number {
  const inBase = value * fromFactor + fromOffset;
  return (inBase - toOffset) / toFactor;
}

export default function UnitConverter() {
  const [cat, setCat] = useState('length');
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState(0);

  const category = CATEGORIES[cat];
  const fromUnit = category.units[from];
  const numVal = parseFloat(value) || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(CATEGORIES).map(([k,v]) => (
          <button key={k} onClick={() => { setCat(k); setFrom(0); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${cat===k?'btn-primary':'btn-secondary'}`}>{v.name}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Değer</label>
          <input className="tool-input" type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder="0"/>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-2">Kaynak Birim</label>
          <select className="tool-select w-full" value={from} onChange={e=>setFrom(+e.target.value)}>
            {category.units.map((u,i) => <option key={u.label} value={i}>{u.label}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {category.units.map((unit, i) => {
          if (i === from) return null;
          const result = cat === 'temperature'
            ? convert(numVal, fromUnit.factor, fromUnit.offset, unit.factor, unit.offset)
            : (numVal * fromUnit.factor) / unit.factor;
          return (
            <div key={unit.label} className="flex items-center justify-between bg-space-800/60 border border-[var(--border-subtle)] rounded-xl px-4 py-3">
              <span className="text-xs text-[var(--text-muted)]">{unit.label}</span>
              <span className="font-mono text-sm text-violet-400 font-medium">
                {result.toLocaleString('tr-TR', { maximumFractionDigits: 6 })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
