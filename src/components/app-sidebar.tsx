"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/context/auth-context";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Shield, LayoutDashboard, Car, User, Search, FileText, Users, LogOut, FileClock } from "lucide-react";
import Image from "next/image";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["officer", "supervisor", "admin"] },
  { href: "/vehicles/register", label: "Register Vehicle", icon: Car, roles: ["officer", "supervisor"] },
  { href: "/drivers/register", label: "Register Driver", icon: User, roles: ["officer", "supervisor"] },
  { href: "/investigations/search", label: "Image Search", icon: Search, roles: ["officer", "supervisor"] },
  { href: "/investigations/review", label: "Review Searches", icon: FileClock, roles: ["supervisor"] },
  { href: "/audit-logs", label: "Audit Logs", icon: FileText, roles: ["supervisor"] },
  { href: "/users/manage", label: "User Management", icon: Users, roles: ["admin"] },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 p-4">
            <Image 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf-6gTmS3DsuKWvwRdYlkbF5ezcQWzxX-TBw&s" 
              alt="Veritas Platform Logo"
              width={100}
              height={100}
              className="h-auto"
            />
        </div>
      </SidebarHeader>
      
      <SidebarMenu className="flex-1 p-2">
        {navItems
          .filter(item => item.roles.includes(user.role))
          .map(item => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                    isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                    asChild
                >
                  <>
                    <item.icon />
                    <span>{item.label}</span>
                  </>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
      
      <SidebarFooter>
        <Button variant="ghost" className="justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground" onClick={logout}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </>
  );
}
