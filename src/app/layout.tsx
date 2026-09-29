import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cùng Làm — Kết nối nguồn lực. Kiến tạo cơ hội.',
  description: 'Mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và thúc đẩy các hoạt động hợp tác thực tế.',
  openGraph: {
    title: 'Cùng Làm — Kết nối nguồn lực. Kiến tạo cơ hội.',
    description: 'Mạng xã hội kết nối nguồn lực, chia sẻ cơ hội và thúc đẩy các hoạt động hợp tác thực tế.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-[#FF2D55] selection:text-white">
        {children}
      </body>
    </html>
  );
}
