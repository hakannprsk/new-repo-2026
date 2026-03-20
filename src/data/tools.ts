export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  tags: string[];
  featured?: boolean;
  new?: boolean;
}

export type ToolCategory =
  | 'text'
  | 'webdev'
  | 'image'
  | 'file'
  | 'network'
  | 'security';

export const CATEGORIES: { id: ToolCategory; label: string; icon: string; color: string; gradient: string }[] = [
  {
    id: 'text',
    label: 'Metin & Şifre',
    icon: 'Type',
    color: '#7c3aed',
    gradient: 'from-violet-600 to-purple-800',
  },
  {
    id: 'webdev',
    label: 'Web Geliştirme',
    icon: 'Code2',
    color: '#0891b2',
    gradient: 'from-cyan-600 to-blue-800',
  },
  {
    id: 'image',
    label: 'Görsel & Renk',
    icon: 'Image',
    color: '#059669',
    gradient: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'file',
    label: 'Dosya Araçları',
    icon: 'FileBox',
    color: '#d97706',
    gradient: 'from-amber-600 to-orange-800',
  },
  {
    id: 'network',
    label: 'Ağ & Güvenlik',
    icon: 'Shield',
    color: '#dc2626',
    gradient: 'from-red-600 to-rose-800',
  },
];

export const TOOLS: Tool[] = [
  // ─── TEXT & PASSWORD ────────────────────────────────────────────────
  {
    slug: 'text-case-converter',
    name: 'Büyük/Küçük Harf Dönüştürücü',
    description: 'Metni büyük harf, küçük harf, başlık veya cümle harfine anında dönüştürür.',
    category: 'text',
    icon: 'CaseSensitive',
    tags: ['metin', 'harf', 'büyük', 'küçük'],
    featured: true,
  },
  {
    slug: 'word-counter',
    name: 'Kelime & Karakter Sayacı',
    description: 'Metindeki kelime, karakter, cümle ve paragraf sayısını hesaplar.',
    category: 'text',
    icon: 'Hash',
    tags: ['kelime', 'karakter', 'sayaç'],
    featured: true,
  },
  {
    slug: 'text-reverser',
    name: 'Metin Ters Çevirici',
    description: 'Metni, kelimeleri veya karakterleri tersten yazar.',
    category: 'text',
    icon: 'ArrowLeftRight',
    tags: ['ters', 'reverse', 'çevir'],
  },
  {
    slug: 'password-generator',
    name: 'Güçlü Şifre Üretici',
    description: 'Özelleştirilebilir güçlü ve rastgele şifreler üretir.',
    category: 'text',
    icon: 'KeyRound',
    tags: ['şifre', 'güvenlik', 'rastgele'],
    featured: true,
  },
  {
    slug: 'base64-text',
    name: 'Base64 Kodlayıcı/Çözücü',
    description: 'Metinleri Base64 formatına kodlar ve çözer.',
    category: 'text',
    icon: 'Binary',
    tags: ['base64', 'encode', 'decode'],
  },
  {
    slug: 'url-encoder',
    name: 'URL Kodlayıcı/Çözücü',
    description: 'URL\'leri güvenli formata kodlar ve orijinal haline çözer.',
    category: 'text',
    icon: 'Link',
    tags: ['url', 'encode', 'decode'],
  },
  {
    slug: 'markdown-to-html',
    name: 'Markdown → HTML',
    description: 'Markdown metnini tam HTML\'e dönüştürür ve önizler.',
    category: 'text',
    icon: 'FileCode',
    tags: ['markdown', 'html', 'dönüştür'],
  },
  {
    slug: 'html-to-markdown',
    name: 'HTML → Markdown',
    description: 'HTML kodunu temiz Markdown metnine dönüştürür.',
    category: 'text',
    icon: 'FileText',
    tags: ['html', 'markdown', 'dönüştür'],
  },
  {
    slug: 'text-diff',
    name: 'Metin Farkı Bulucu',
    description: 'İki metin arasındaki farkları renk kodlarıyla vurgular.',
    category: 'text',
    icon: 'GitCompare',
    tags: ['diff', 'karşılaştır', 'fark'],
  },
  {
    slug: 'duplicate-remover',
    name: 'Tekrar Kaldırıcı',
    description: 'Metindeki yinelenen satırları veya kelimeleri kaldırır.',
    category: 'text',
    icon: 'ListX',
    tags: ['tekrar', 'duplicate', 'temizle'],
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Üretici',
    description: 'İstenen uzunlukta Lorem Ipsum placeholder metni üretir.',
    category: 'text',
    icon: 'AlignLeft',
    tags: ['lorem', 'ipsum', 'placeholder'],
  },
  {
    slug: 'text-shuffler',
    name: 'Metin Karıştırıcı',
    description: 'Kelimeleri veya karakterleri rastgele sırayla karıştırır.',
    category: 'text',
    icon: 'Shuffle',
    tags: ['karıştır', 'rastgele', 'shuffle'],
  },
  {
    slug: 'text-to-speech',
    name: 'Metinden Sese Dönüştürücü',
    description: 'Yazılı metni tarayıcı TTS motoru ile sesli okur.',
    category: 'text',
    icon: 'Volume2',
    tags: ['ses', 'tts', 'okuma'],
  },
  {
    slug: 'slug-generator',
    name: 'Slug Üretici',
    description: 'Metinleri URL dostu slug formatına dönüştürür.',
    category: 'text',
    icon: 'Link2',
    tags: ['slug', 'url', 'seo'],
  },

  // ─── WEB DEV ─────────────────────────────────────────────────────────
  {
    slug: 'json-formatter',
    name: 'JSON Biçimlendirici',
    description: 'JSON verilerini okunabilir formata getirir, doğrular ve sıkıştırır.',
    category: 'webdev',
    icon: 'Braces',
    tags: ['json', 'format', 'doğrula'],
    featured: true,
  },
  {
    slug: 'xml-formatter',
    name: 'XML Biçimlendirici',
    description: 'XML verilerini okunabilir formata getirir ve yapısını doğrular.',
    category: 'webdev',
    icon: 'FileCode2',
    tags: ['xml', 'format', 'doğrula'],
  },
  {
    slug: 'css-formatter',
    name: 'CSS Biçimlendirici',
    description: 'Düzensiz CSS kodunu temizler ve okunabilir hale getirir.',
    category: 'webdev',
    icon: 'Palette',
    tags: ['css', 'format', 'temizle'],
  },
  {
    slug: 'html-formatter',
    name: 'HTML Biçimlendirici',
    description: 'Düzensiz HTML kodunu düzgün girintilerle biçimlendirir.',
    category: 'webdev',
    icon: 'Code',
    tags: ['html', 'format', 'temizle'],
  },
  {
    slug: 'js-formatter',
    name: 'JavaScript Biçimlendirici',
    description: 'JavaScript kodunu okunabilir formata getirir ve sıkıştırır.',
    category: 'webdev',
    icon: 'FileJson',
    tags: ['javascript', 'js', 'format'],
  },
  {
    slug: 'qr-code',
    name: 'QR Kod Üretici',
    description: 'Metin, URL veya iletişim bilgileri için özelleştirilebilir QR kod üretir.',
    category: 'webdev',
    icon: 'QrCode',
    tags: ['qr', 'kod', 'üret'],
    featured: true,
  },
  {
    slug: 'unit-converter',
    name: 'Birim Dönüştürücü',
    description: 'Uzunluk, ağırlık, sıcaklık, alan ve veri boyutu birimlerini dönüştürür.',
    category: 'webdev',
    icon: 'ArrowRightLeft',
    tags: ['birim', 'dönüştür', 'ölçü'],
  },
  {
    slug: 'timestamp-converter',
    name: 'Zaman Damgası Dönüştürücü',
    description: 'Unix zaman damgalarını okunabilir tarihe ve tersine dönüştürür.',
    category: 'webdev',
    icon: 'Clock',
    tags: ['timestamp', 'unix', 'tarih'],
  },
  {
    slug: 'regex-tester',
    name: 'Regex Test Aracı',
    description: 'Düzenli ifadeleri test eder, eşleşmeleri vurgular ve açıklar.',
    category: 'webdev',
    icon: 'Search',
    tags: ['regex', 'regexp', 'test'],
  },
  {
    slug: 'hash-generator',
    name: 'Hash Üretici',
    description: 'MD5, SHA-1, SHA-256, SHA-512 hash değerleri üretir.',
    category: 'webdev',
    icon: 'Fingerprint',
    tags: ['hash', 'md5', 'sha'],
    featured: true,
  },
  {
    slug: 'url-parser',
    name: 'URL Ayrıştırıcı',
    description: 'URL\'yi protokol, host, path, query string bileşenlerine ayırır.',
    category: 'webdev',
    icon: 'Unlink',
    tags: ['url', 'parse', 'ayrıştır'],
  },
  {
    slug: 'http-status-codes',
    name: 'HTTP Durum Kodları',
    description: 'HTTP durum kodlarının (200, 404, 500...) anlamlarını açıklar.',
    category: 'webdev',
    icon: 'ServerCrash',
    tags: ['http', 'status', 'kod'],
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Üretici',
    description: 'RFC 4122 uyumlu UUID v4 tanımlayıcıları toplu olarak üretir.',
    category: 'webdev',
    icon: 'Dice5',
    tags: ['uuid', 'guid', 'benzersiz'],
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Çözücü',
    description: 'JSON Web Token\'ı ayrıştırır, header/payload/signature\'ı gösterir.',
    category: 'webdev',
    icon: 'ShieldCheck',
    tags: ['jwt', 'token', 'decode'],
  },
  {
    slug: 'cron-builder',
    name: 'CRON İfade Aracı',
    description: 'CRON ifadeleri oluşturur, açıklar ve sonraki çalışma zamanlarını gösterir.',
    category: 'webdev',
    icon: 'CalendarClock',
    tags: ['cron', 'schedule', 'zaman'],
  },
  {
    slug: 'css-gradient',
    name: 'CSS Gradyan Üretici',
    description: 'Görsel editörle CSS linear/radial gradyan kodları oluşturur.',
    category: 'webdev',
    icon: 'Layers',
    tags: ['css', 'gradient', 'renk'],
    new: true,
  },

  // ─── IMAGE & COLOR ────────────────────────────────────────────────────
  {
    slug: 'image-resize',
    name: 'Resim Boyutlandırma',
    description: 'Resimleri piksel veya yüzde olarak yeniden boyutlandırır.',
    category: 'image',
    icon: 'Maximize2',
    tags: ['resim', 'boyut', 'resize'],
    featured: true,
  },
  {
    slug: 'image-compress',
    name: 'Resim Sıkıştırma',
    description: 'Resim kalitesini koruyarak dosya boyutunu küçültür.',
    category: 'image',
    icon: 'PackageOpen',
    tags: ['resim', 'sıkıştır', 'compress'],
  },
  {
    slug: 'image-crop',
    name: 'Resim Kırpma',
    description: 'Resmi özel boyutlarda veya oranlarla kırpar.',
    category: 'image',
    icon: 'Crop',
    tags: ['resim', 'kırp', 'crop'],
  },
  {
    slug: 'image-format-converter',
    name: 'Resim Format Dönüştürücü',
    description: 'JPG, PNG, WebP, BMP formatları arasında dönüştürme yapar.',
    category: 'image',
    icon: 'RefreshCw',
    tags: ['resim', 'format', 'jpg', 'png', 'webp'],
  },
  {
    slug: 'color-palette',
    name: 'Renk Paleti Üretici',
    description: 'Uyumlu renk paletleri üretir; resimdeki renklerden de çıkarabilir.',
    category: 'image',
    icon: 'Swatch',
    tags: ['renk', 'palet', 'tasarım'],
    featured: true,
  },
  {
    slug: 'color-picker',
    name: 'Renk Seçici (HEX/RGB/HSL)',
    description: 'HEX, RGB, HSL, HSV değerleri arasında dönüşüm yapar.',
    category: 'image',
    icon: 'Pipette',
    tags: ['renk', 'hex', 'rgb', 'hsl'],
  },
  {
    slug: 'contrast-checker',
    name: 'Kontrast Oranı Hesaplayıcı',
    description: 'WCAG 2.1 standardına göre iki renk arası kontrast oranını hesaplar.',
    category: 'image',
    icon: 'SunMoon',
    tags: ['kontrast', 'wcag', 'erişilebilirlik'],
  },
  {
    slug: 'favicon-generator',
    name: 'Favicon Üretici',
    description: 'Resimleri farklı boyutlarda (16x16, 32x32, 64x64, 128x128) favicon\'a dönüştürür.',
    category: 'image',
    icon: 'Globe',
    tags: ['favicon', 'ikon', 'web'],
    new: true,
  },
  {
    slug: 'image-watermark',
    name: 'Filigran Ekleme',
    description: 'Resimlere metin veya şeffaf filigran ekler.',
    category: 'image',
    icon: 'Stamp',
    tags: ['filigran', 'watermark', 'resim'],
  },
  {
    slug: 'image-editor',
    name: 'Temel Resim Düzenleyici',
    description: 'Parlaklık, kontrast, doygunluk, bulanıklık gibi temel resim ayarlamaları.',
    category: 'image',
    icon: 'SlidersHorizontal',
    tags: ['resim', 'düzenle', 'filtre'],
  },

  // ─── FILE TOOLS ────────────────────────────────────────────────────────
  {
    slug: 'image-to-pdf',
    name: 'Resimden PDF\'e',
    description: 'JPG, PNG gibi resimleri tek veya çok sayfalı PDF\'e dönüştürür.',
    category: 'file',
    icon: 'FileImage',
    tags: ['pdf', 'resim', 'dönüştür'],
    featured: true,
  },
  {
    slug: 'pdf-to-image',
    name: 'PDF\'ten Resme',
    description: 'PDF sayfalarını JPG veya PNG formatına dönüştürür.',
    category: 'file',
    icon: 'FileDown',
    tags: ['pdf', 'resim', 'dönüştür'],
  },
  {
    slug: 'pdf-merger',
    name: 'PDF Birleştirici',
    description: 'Birden fazla PDF dosyasını tek bir PDF\'te birleştirir.',
    category: 'file',
    icon: 'FilePlus2',
    tags: ['pdf', 'birleştir', 'merge'],
    featured: true,
  },
  {
    slug: 'pdf-splitter',
    name: 'PDF Bölücü',
    description: 'PDF dosyasını belirli sayfa aralıklarına göre böler.',
    category: 'file',
    icon: 'Scissors',
    tags: ['pdf', 'böl', 'split'],
  },
  {
    slug: 'pdf-compressor',
    name: 'PDF Sıkıştırıcı',
    description: 'PDF dosyalarının boyutunu kalite ayarı yaparak küçültür.',
    category: 'file',
    icon: 'PackageMinus',
    tags: ['pdf', 'sıkıştır', 'compress'],
  },
  {
    slug: 'zip-tool',
    name: 'ZIP Araçları',
    description: 'Dosyaları ZIP formatına sıkıştırır veya ZIP arşivini açar.',
    category: 'file',
    icon: 'Archive',
    tags: ['zip', 'sıkıştır', 'aç', 'arşiv'],
  },
  {
    slug: 'file-encryptor',
    name: 'Dosya Şifreleyici',
    description: 'Dosyaları AES-256 ile şifreler ve şifresini çözer.',
    category: 'file',
    icon: 'Lock',
    tags: ['şifrele', 'aes', 'güvenlik'],
  },
  {
    slug: 'image-to-base64',
    name: 'Resim ↔ Base64',
    description: 'Resim dosyalarını Base64 koduna dönüştürür ve tersine çevirir.',
    category: 'file',
    icon: 'ImageDown',
    tags: ['base64', 'resim', 'encode'],
  },
  {
    slug: 'ocr-tool',
    name: 'OCR Metin Tanıma',
    description: 'Resimlerden Tesseract.js ile metin tanır ve çıkarır.',
    category: 'file',
    icon: 'ScanText',
    tags: ['ocr', 'metin', 'tanı'],
    new: true,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return TOOLS.filter((t) => t.featured);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
