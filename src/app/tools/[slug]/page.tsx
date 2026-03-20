import { notFound } from 'next/navigation';
import { getToolBySlug, TOOLS } from '@/data/tools';
import ToolLayout from '@/components/ui/ToolLayout';
import dynamic from 'next/dynamic';

// Dynamically import all tool components
const toolComponents: Record<string, ReturnType<typeof dynamic>> = {
  'text-case-converter': dynamic(() => import('@/components/tools/TextCaseConverter'), { ssr: false }),
  'word-counter': dynamic(() => import('@/components/tools/WordCounter'), { ssr: false }),
  'text-reverser': dynamic(() => import('@/components/tools/TextReverser'), { ssr: false }),
  'password-generator': dynamic(() => import('@/components/tools/PasswordGenerator'), { ssr: false }),
  'base64-text': dynamic(() => import('@/components/tools/Base64Text'), { ssr: false }),
  'url-encoder': dynamic(() => import('@/components/tools/UrlEncoder'), { ssr: false }),
  'markdown-to-html': dynamic(() => import('@/components/tools/MarkdownToHtml'), { ssr: false }),
  'html-to-markdown': dynamic(() => import('@/components/tools/HtmlToMarkdown'), { ssr: false }),
  'text-diff': dynamic(() => import('@/components/tools/TextDiff'), { ssr: false }),
  'duplicate-remover': dynamic(() => import('@/components/tools/DuplicateRemover'), { ssr: false }),
  'lorem-ipsum': dynamic(() => import('@/components/tools/LoremIpsum'), { ssr: false }),
  'text-shuffler': dynamic(() => import('@/components/tools/TextShuffler'), { ssr: false }),
  'text-to-speech': dynamic(() => import('@/components/tools/TextToSpeech'), { ssr: false }),
  'slug-generator': dynamic(() => import('@/components/tools/SlugGenerator'), { ssr: false }),
  'json-formatter': dynamic(() => import('@/components/tools/JsonFormatter'), { ssr: false }),
  'xml-formatter': dynamic(() => import('@/components/tools/XmlFormatter'), { ssr: false }),
  'css-formatter': dynamic(() => import('@/components/tools/CssFormatter'), { ssr: false }),
  'html-formatter': dynamic(() => import('@/components/tools/HtmlFormatterTool'), { ssr: false }),
  'js-formatter': dynamic(() => import('@/components/tools/JsFormatter'), { ssr: false }),
  'qr-code': dynamic(() => import('@/components/tools/QrCodeGenerator'), { ssr: false }),
  'unit-converter': dynamic(() => import('@/components/tools/UnitConverter'), { ssr: false }),
  'timestamp-converter': dynamic(() => import('@/components/tools/TimestampConverter'), { ssr: false }),
  'regex-tester': dynamic(() => import('@/components/tools/RegexTester'), { ssr: false }),
  'hash-generator': dynamic(() => import('@/components/tools/HashGenerator'), { ssr: false }),
  'url-parser': dynamic(() => import('@/components/tools/UrlParser'), { ssr: false }),
  'http-status-codes': dynamic(() => import('@/components/tools/HttpStatusCodes'), { ssr: false }),
  'uuid-generator': dynamic(() => import('@/components/tools/UuidGenerator'), { ssr: false }),
  'jwt-decoder': dynamic(() => import('@/components/tools/JwtDecoder'), { ssr: false }),
  'cron-builder': dynamic(() => import('@/components/tools/CronBuilder'), { ssr: false }),
  'css-gradient': dynamic(() => import('@/components/tools/CssGradient'), { ssr: false }),
  'image-resize': dynamic(() => import('@/components/tools/ImageResize'), { ssr: false }),
  'image-compress': dynamic(() => import('@/components/tools/ImageCompress'), { ssr: false }),
  'image-crop': dynamic(() => import('@/components/tools/ImageCrop'), { ssr: false }),
  'image-format-converter': dynamic(() => import('@/components/tools/ImageFormatConverter'), { ssr: false }),
  'color-palette': dynamic(() => import('@/components/tools/ColorPalette'), { ssr: false }),
  'color-picker': dynamic(() => import('@/components/tools/ColorPicker'), { ssr: false }),
  'contrast-checker': dynamic(() => import('@/components/tools/ContrastChecker'), { ssr: false }),
  'favicon-generator': dynamic(() => import('@/components/tools/FaviconGenerator'), { ssr: false }),
  'image-watermark': dynamic(() => import('@/components/tools/ImageWatermark'), { ssr: false }),
  'image-editor': dynamic(() => import('@/components/tools/ImageEditor'), { ssr: false }),
  'image-to-pdf': dynamic(() => import('@/components/tools/ImageToPdf'), { ssr: false }),
  'pdf-to-image': dynamic(() => import('@/components/tools/PdfToImage'), { ssr: false }),
  'pdf-merger': dynamic(() => import('@/components/tools/PdfMerger'), { ssr: false }),
  'pdf-splitter': dynamic(() => import('@/components/tools/PdfSplitter'), { ssr: false }),
  'pdf-compressor': dynamic(() => import('@/components/tools/PdfCompressor'), { ssr: false }),
  'zip-tool': dynamic(() => import('@/components/tools/ZipTool'), { ssr: false }),
  'file-encryptor': dynamic(() => import('@/components/tools/FileEncryptor'), { ssr: false }),
  'image-to-base64': dynamic(() => import('@/components/tools/ImageToBase64'), { ssr: false }),
  'ocr-tool': dynamic(() => import('@/components/tools/OcrTool'), { ssr: false }),
};

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: 'Araç Bulunamadı' };
  return {
    title: `${tool.name} — KralTools`,
    description: tool.description,
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const ToolComponent = toolComponents[params.slug];
  if (!ToolComponent) notFound();

  return (
    <ToolLayout tool={tool}>
      <ToolComponent />
    </ToolLayout>
  );
}
