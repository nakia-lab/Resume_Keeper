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
      <body className="font-body antialiased relative overflow-x-hidden min-h-screen">
        {tropicalBg && (
          <div className="fixed inset-0 -z-20 pointer-events-none scale-105 origin-center">
            <Image
              src={tropicalBg.imageUrl}
              alt="Tropical background"
              fill
              className="object-cover opacity-60"
              data-ai-hint={tropicalBg.imageHint}
              priority
            />
          </div>
        )}
        {/* Semi-transparent overlay to ensure readability while showing background */}
        <div className="fixed inset-0 -z-10 bg-background/40 backdrop-blur-sm pointer-events-none" />
        
        <ResumeProvider>
          <div className="flex min-h-screen relative z-10">
            <Navigation />
            <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 lg:p-12">
              <div className="max-w-6xl mx-auto bg-white/20 backdrop-blur-3xl rounded-[3rem] p-6 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-white/60">
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
