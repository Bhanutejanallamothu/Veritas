"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider, useTheme } from 'next-themes';
import Squares from '@/components/ui/Squares';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata: Metadata = {
//   title: 'Veritas Platform',
//   description: 'Unified Vehicle and Driver Registration and Investigation Assistance Platform',
// };

function AppLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  return (
    <div className="relative">
      {isDark && (
        <Squares
          className="absolute inset-0 -z-10 w-full h-full"
          squareSize={26}
          borderColor="rgba(153, 153, 153, 0.2)"
          hoverFillColor="rgba(34, 34, 34, 0.5)"
        />
      )}
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Veritas Platform</title>
        <meta name="description" content="Unified Vehicle and Driver Registration and Investigation Assistance Platform" />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
