import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { ClientProviders } from '@/components/client-providers';
import { AppBackground } from '@/components/app-background';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Veritas Platform',
  description: 'Unified Vehicle and Driver Registration and Investigation Assistance Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <ClientProviders>
          <AppBackground />
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
