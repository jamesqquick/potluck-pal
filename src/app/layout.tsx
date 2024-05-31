import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

import { Be_Vietnam_Pro } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Potluck Pal',
  metadataBase: new URL('https://potluckpal.app/'),
  description:
    'The best site to host your potluck, or find one to join. Potlucks for Devs is a community of developers who love to eat and share food.',
  openGraph: {
    images: [
      {
        url: '/logo-wide.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={beVietnamPro.className}>
      <body className=" overflow-x-hidden">
        <ClerkProvider>
          <Toaster position="top-center" toastOptions={{ duration: 30000 }} />
          <div className=" bg-white max-w-7xl mx-auto px-8">
            <Navbar />
            <div className="min-h-[60vh]">{children}</div>
            <Footer />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
