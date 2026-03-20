import Link from 'next/link';
import { Zap, Github, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Metin Araçları',
      links: [
        { label: 'Şifre Üretici', href: '/tools/password-generator' },
        { label: 'Base64 Kodlayıcı', href: '/tools/base64-text' },
        { label: 'Metin Fark Bulucu', href: '/tools/text-diff' },
        { label: 'Lorem Ipsum', href: '/tools/lorem-ipsum' },
      ],
    },
    {
      title: 'Web Geliştirme',
      links: [
        { label: 'JSON Biçimlendirici', href: '/tools/json-formatter' },
        { label: 'QR Kod Üretici', href: '/tools/qr-code' },
        { label: 'Hash Üretici', href: '/tools/hash-generator' },
        { label: 'JWT Çözücü', href: '/tools/jwt-decoder' },
      ],
    },
    {
      title: 'Dosya Araçları',
      links: [
        { label: 'PDF Birleştirici', href: '/tools/pdf-merger' },
        { label: 'Resimden PDF', href: '/tools/image-to-pdf' },
        { label: 'ZIP Araçları', href: '/tools/zip-tool' },
        { label: 'OCR Metin Tanıma', href: '/tools/ocr-tool' },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--border-subtle)] mt-20 bg-space-900/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Kral<span className="text-violet-400">Tools</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Günlük dijital ihtiyaçlarınız için 50+ ücretsiz, tarayıcı tabanlı araç.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white hover:border-[var(--border-default)] transition-all"
              >
                <Github size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white hover:border-[var(--border-default)] transition-all"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-violet-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border-subtle)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} KralTools. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Tarayıcınızda çalışır — verileriniz hiçbir zaman sunucuya gönderilmez
            <Heart size={12} className="text-violet-400 ml-1" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
}
