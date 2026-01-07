"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import AppHeader from '@/components/app-header';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function ProtectedLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex h-screen w-full">
            <div className="w-64 border-r p-4 hidden md:block">
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

  return (
    <div
      className={cn(
        "rounded-lg flex flex-col md:flex-row w-full flex-1 h-screen mx-auto overflow-hidden"
      )}
    >
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-4 sm:p-6 lg:p-8">
                {children}
            </div>
          </main>
      </div>
    </div>
  );
}


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <SidebarProvider open={open} setOpen={setOpen}>
            <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
        </SidebarProvider>
    );
}
