import type { Metadata } from 'next';
import './globals.css';
import { ResumeProvider } from '@/context/ResumeContext';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Resume Keeper | Build Your Future',
  description: 'Create and maintain a professional online portfolio with AI assistance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <ResumeProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 lg:p-12">
              <div className="max-w-6xl mx-auto">
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
