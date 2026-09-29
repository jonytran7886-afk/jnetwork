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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J-Network — Kết nối nguồn lực. Kiến tạo cơ hội.',
    description: 'Mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và thúc đẩy các hoạt động hợp tác thực tế.',
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
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-[#FF2D55] selection:text-white">
        {children}
      </body>
    </html>
  );
}
