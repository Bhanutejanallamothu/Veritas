"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import AppHeader from '@/components/app-header';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/login') {
      router.replace('/login');
    }
  }, [user, loading, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full">
        <div className="hidden w-64 border-r p-4 md:block">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
        <div className="flex-1">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </header>
          <main className="p-8">
            <Skeleton className="h-96 w-full" />
          </main>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
      <AuthGuard>
        <SidebarProvider open={open} setOpen={setOpen}>
            <div className="flex h-screen w-full">
                <Sidebar>
                    <AppSidebar />
                </Sidebar>
                <div className="flex flex-1 flex-col">
                    <AppHeader />
                    <main className="flex-1 overflow-y-auto">
                        <div className="p-4 sm:p-6 lg:p-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
      </AuthGuard>
    );
}
