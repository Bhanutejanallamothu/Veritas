"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

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
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold md:text-xl font-headline">{title}</h1>
        </div>
      
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.displayName} />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
