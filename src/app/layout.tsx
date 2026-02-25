import type { Metadata } from 'next';
import './globals.css';
import { ResumeProvider } from '@/context/ResumeContext';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Resume Keeper | Build Your Future',
  description: 'Create and maintain a professional online portfolio with AI assistance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tropicalBg = PlaceHolderImages.find(img => img.id === 'tropical-bg');

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background relative overflow-x-hidden min-h-screen">
        {tropicalBg && (
          <div className="fixed inset-0 -z-10 opacity-[0.15] pointer-events-none">
            <Image
              src={tropicalBg.imageUrl}
              alt="Tropical background"
              fill
              className="object-cover"
              data-ai-hint={tropicalBg.imageHint}
              priority
            />
          </div>
        )}
        <ResumeProvider>
          <div className="flex min-h-screen relative z-10">
            <Navigation />
            <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 lg:p-12">
              <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border border-white/40">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </ResumeProvider>
      </body>
    </html>
  );
}
