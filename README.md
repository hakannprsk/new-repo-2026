# KralTools 👑

**50+ ücretsiz, tarayıcı tabanlı dijital araç** — tek platformda.

> Tüm işlemler tamamen tarayıcınızda gerçekleşir. Verileriniz hiçbir zaman sunucuya gönderilmez.

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+ (https://nodejs.org)
- npm veya yarn

### Kurulum

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirme sunucusunu başlatın
npm run dev

# 3. Tarayıcıda açın
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## ☁️ Vercel'e Deploy

### Yöntem 1: GitHub üzerinden (Önerilen)
1. Projeyi GitHub'a push edin
2. https://vercel.com adresine gidin
3. "New Project" → GitHub repo'yu seçin
4. Deploy edin — otomatik çalışır!

### Yöntem 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🛠 Araç Listesi

### 📝 Metin & Şifre (14 Araç)
| Araç | URL | Açıklama |
|------|-----|----------|
| Büyük/Küçük Harf | `/tools/text-case-converter` | BÜYÜK, küçük, camelCase, snake_case vb. |
| Kelime Sayacı | `/tools/word-counter` | Kelime, karakter, cümle, paragraf sayısı |
| Metin Ters Çevirici | `/tools/text-reverser` | Karakter, kelime veya satır bazında |
| Şifre Üretici | `/tools/password-generator` | Özelleştirilebilir güçlü şifreler |
| Base64 Kodlayıcı | `/tools/base64-text` | Metin ↔ Base64 |
| URL Kodlayıcı | `/tools/url-encoder` | URL encode/decode |
| Markdown → HTML | `/tools/markdown-to-html` | Canlı önizlemeli dönüştürme |
| HTML → Markdown | `/tools/html-to-markdown` | TurndownJS tabanlı |
| Metin Fark Bulucu | `/tools/text-diff` | Karakter/kelime/satır bazında diff |
| Tekrar Kaldırıcı | `/tools/duplicate-remover` | Tekrar eden satır/kelime temizleme |
| Lorem Ipsum | `/tools/lorem-ipsum` | Paragraf, cümle veya kelime üretimi |
| Metin Karıştırıcı | `/tools/text-shuffler` | Rastgele sıralama |
| Metinden Sese | `/tools/text-to-speech` | Tarayıcı TTS API |
| Slug Üretici | `/tools/slug-generator` | URL dostu slug oluşturma |

### 💻 Web Geliştirme (16 Araç)
| Araç | URL | Açıklama |
|------|-----|----------|
| JSON Biçimlendirici | `/tools/json-formatter` | Biçimlendir, doğrula, sıkıştır |
| XML Biçimlendirici | `/tools/xml-formatter` | XML parse & format |
| CSS Biçimlendirici | `/tools/css-formatter` | Biçimlendir/sıkıştır |
| HTML Biçimlendirici | `/tools/html-formatter` | Düzgün girintileme |
| JS Biçimlendirici | `/tools/js-formatter` | JavaScript format/minify |
| QR Kod Üretici | `/tools/qr-code` | Özelleştirilebilir QR kod |
| Birim Dönüştürücü | `/tools/unit-converter` | Uzunluk, ağırlık, sıcaklık, veri |
| Zaman Damgası | `/tools/timestamp-converter` | Unix ↔ tarih dönüşümü |
| Regex Test Aracı | `/tools/regex-tester` | Eşleşme vurgulama |
| Hash Üretici | `/tools/hash-generator` | MD5, SHA1, SHA256, SHA512 |
| URL Ayrıştırıcı | `/tools/url-parser` | URL bileşenlerine ayırma |
| HTTP Durum Kodları | `/tools/http-status-codes` | 200, 404, 500... açıklamaları |
| UUID Üretici | `/tools/uuid-generator` | RFC 4122 UUID v4 |
| JWT Çözücü | `/tools/jwt-decoder` | Header/payload görüntüleme |
| CRON Aracı | `/tools/cron-builder` | İfade oluşturma ve açıklama |
| CSS Gradyan | `/tools/css-gradient` | Görsel gradyan editörü |

### 🎨 Görsel & Renk (11 Araç)
| Araç | URL | Açıklama |
|------|-----|----------|
| Resim Boyutlandırma | `/tools/image-resize` | Piksel/yüzde ile boyutlandırma |
| Resim Sıkıştırma | `/tools/image-compress` | JPEG/WebP/PNG kalite kontrolü |
| Resim Kırpma | `/tools/image-crop` | Özel boyut ve oran kırpma |
| Format Dönüştürücü | `/tools/image-format-converter` | JPG ↔ PNG ↔ WebP ↔ BMP |
| Renk Paleti | `/tools/color-palette` | Analogous, complementary vb. |
| Renk Seçici | `/tools/color-picker` | HEX/RGB/HSL dönüşümü |
| Kontrast Kontrol | `/tools/contrast-checker` | WCAG 2.1 AA/AAA uyumluluk |
| Favicon Üretici | `/tools/favicon-generator` | 16-256px favicon seti |
| Filigran Ekleme | `/tools/image-watermark` | Metin filigranı |
| Resim Düzenleyici | `/tools/image-editor` | Parlaklık, kontrast, filtreler |

### 📁 Dosya Araçları (9 Araç)
| Araç | URL | Açıklama |
|------|-----|----------|
| Resimden PDF | `/tools/image-to-pdf` | Çoklu resim → çok sayfalı PDF |
| PDF'ten Resme | `/tools/pdf-to-image` | Her sayfa → PNG (Tesseract) |
| PDF Birleştirici | `/tools/pdf-merger` | Çoklu PDF birleştirme |
| PDF Bölücü | `/tools/pdf-splitter` | Sayfa aralığına göre bölme |
| PDF Sıkıştırıcı | `/tools/pdf-compressor` | Metadata temizleme ile küçültme |
| ZIP Araçları | `/tools/zip-tool` | Oluştur & aç |
| Dosya Şifreleyici | `/tools/file-encryptor` | AES-256 şifreleme |
| Resim ↔ Base64 | `/tools/image-to-base64` | Encode/decode |
| OCR Metin Tanıma | `/tools/ocr-tool` | Tesseract.js, TR+EN |

---

## 🏗 Proje Yapısı

```
kraltools/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (font, meta)
│   │   ├── page.tsx            # Ana sayfa
│   │   ├── globals.css         # Deep Space tema CSS
│   │   └── tools/[slug]/
│   │       └── page.tsx        # Dinamik araç sayfası
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Arama + navigasyon
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── ToolCard.tsx    # 3D tilt kart efekti
│   │   │   └── ToolLayout.tsx  # Araç sayfa wrapper
│   │   └── tools/              # Her araç ayrı component
│   ├── data/
│   │   └── tools.ts            # 50+ araç metadata
│   └── lib/
│       └── utils.ts            # Yardımcı fonksiyonlar
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── vercel.json
└── package.json
```

---

## 🎨 Tasarım Sistemi

- **Tema:** Deep Space — koyu lacivert/siyah, cam efekti kartlar, 3D perspektif tilt
- **Fontlar:** Syne (display) + DM Sans (body) + JetBrains Mono (code)
- **Renkler:** Violet (#7c3aed) · Cyan (#0891b2) · Amber (#d97706) · Emerald (#059669)
- **Efektler:** Glassmorphism, mesh gradient arka plan, grain texture

---

## 🔒 Güvenlik & Gizlilik

- **Sıfır sunucu** — tüm işlemler `WebCrypto`, `Canvas API`, `pdf-lib` ile client-side
- Dosyalar asla upload edilmez
- API anahtarı gerektirmez
- CORS header'ları `vercel.json`'da yapılandırılmış (SharedArrayBuffer için)

---

## 🧩 Yeni Araç Ekleme

1. `src/data/tools.ts` dosyasına yeni araç metadata ekleyin
2. `src/components/tools/YeniArac.tsx` oluşturun
3. `src/app/tools/[slug]/page.tsx` içindeki `toolComponents` map'ine ekleyin

---

## 📦 Kullanılan Teknolojiler

| Paket | Kullanım |
|-------|---------|
| Next.js 14 | Framework, SSG, routing |
| Tailwind CSS | Stilizasyon |
| pdf-lib | PDF oluşturma, birleştirme, bölme |
| pdfjs-dist | PDF render → resim |
| jszip | ZIP oluşturma/açma |
| crypto-js | AES-256 şifreleme, hash |
| tesseract.js | OCR metin tanıma |
| qrcode | QR kod üretimi |
| marked | Markdown → HTML |
| turndown | HTML → Markdown |
| diff | Metin diff |
| uuid | UUID üretimi |
| lucide-react | İkonlar |
| framer-motion | Animasyonlar |

---

## 📄 Lisans

MIT © KralTools
