import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TPQ Al-Hasanah - Taman Pendidikan Al-Qur\'an',
  description: 'Membentuk Generasi Qur\'ani yang Berakhlaqul Karimah, Cerdas, dan Mandiri di Bojongsoang, Bandung.',
  keywords: ['TPQ Al-Hasanah', 'Taman Pendidikan Al-Quran', 'Bojongsoang', 'Bandung', 'Iqra', 'Tajwid', 'Tahfidz'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
