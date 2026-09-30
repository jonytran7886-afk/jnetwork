import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jnetwork.ai.studio'),
  title: 'J-Network — Kết nối nguồn lực. Kiến tạo cơ hội.',
  description: 'Mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và thúc đẩy các hoạt động hợp tác thực tế.',
  other: {
    'zalo-platform-site-verification': 'RTIvSBF7Q5LEykD_ZkCnT7ZEWMkKk54rDpan',
  },
  openGraph: {
    title: 'J-Network — Kết nối nguồn lực. Kiến tạo cơ hội.',
    description: 'Mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và thúc đẩy các hoạt động hợp tác thực tế.',
    url: 'https://jnetwork.ai.studio',
    siteName: 'J-Network',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85',
        secureUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'J-Network — Kết nối nguồn lực. Kiến tạo cơ hội.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J-Network — Kết nối nguồn lực. Kiến tạo cơ hội.',
    description: 'Mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và thúc đẩy các hoạt động hợp tác thực tế.',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta
          key="zalo-verify"
          property="zalo-platform-site-verification"
          content="RTIvSBF7Q5LEykD_ZkCnT7ZEWMkKk54rDpan"
        />
        {/* OpenGraph Image Tags explicitly rendered for all Social Crawlers (Zalo, Facebook, Telegram, LinkedIn) */}
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85"
        />
        <meta
          property="og:image:secure_url"
          content="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:image:alt"
          content="J-Network — Kết nối nguồn lực. Kiến tạo cơ hội."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85"
        />
        <link
          rel="image_src"
          href="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-[#FF2D55] selection:text-white">
        {children}
      </body>
    </html>
  );
}
