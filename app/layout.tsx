import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/layout/SiteShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://medinotes.in'),
  title: 'Medinotes Starter | Modern Next.js Academic Portal',
  description: 'Clean Next.js frontend starter template for Medinotes - Medicaps University study companion and academic resource portal.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Medinotes Starter - Academic Resource Portal',
    description: 'Clean Next.js frontend template with responsive layout, instant subject search, and course hubs.',
    url: 'https://medinotes.in',
    siteName: 'Medinotes Starter',
    images: [
      {
        url: '/images/social/medinotes-mascots-open-graph.png',
        width: 1200,
        height: 630,
        alt: 'Medinotes Academic Study Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-100">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
