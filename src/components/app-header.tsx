
"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useSidebar } from "./ui/sidebar";
import { Menu } from "lucide-react";

const pathToTitle: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/vehicles/register': 'Register Vehicle',
    '/drivers/register': 'Register Driver',
    '/investigations/search': 'Image-Based Search',
    '/investigations/review': 'Review Searches',
    '/audit-logs': 'Audit Logs',
    '/users/manage': 'User Management',
};

function getTitleFromPath(path: string): string {
    return pathToTitle[path] || "Veritas Platform";
}


export default function AppHeader() {
  const pathname = usePathname();
  const title = React.useMemo(() => getTitleFromPath(pathname), [pathname]);
  const { setOpen, open } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-transparent px-4 md:px-6">
        <div className="flex items-center gap-4">
             <Menu
                className="text-neutral-800 dark:text-neutral-200 cursor-pointer md:hidden"
                onClick={() => setOpen(!open)}
            />
            <h1 className="text-lg font-semibold md:text-xl font-headline">{title}</h1>
        </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
