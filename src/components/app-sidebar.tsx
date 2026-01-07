"use client";

import Link from "next/link";
import { useAuth, UserRole } from "@/context/auth-context";
import { SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, Car, User, Search, FileText, Users, LogOut, FileClock } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSidebar } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


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

const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <Image 
        src="https://ik.imagekit.io/bhanuteja110/ChatGPT%20Image%20Jan%206,%202026,%2011_09_33%20PM.png" 
        alt="Veritas Platform Logo"
        width={40}
        height={40}
        className="h-auto rounded-full"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-sidebar-foreground whitespace-pre"
      >
        Veritas Platform
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <Image 
        src="https://ik.imagekit.io/bhanuteja110/ChatGPT%20Image%20Jan%206,%202026,%2011_09_33%20PM.png" 
        alt="Veritas Platform Logo"
        width={40}
        height={40}
        className="h-auto rounded-full"
      />
    </Link>
  );
};


export default function AppSidebar() {
  const { user, logout } = useAuth();
  const { open } = useSidebar();

  if (!user) return null;

  const userLinks = navItems.filter(item => item.roles.includes(user.role));

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-2 py-4">
                {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="mt-8 flex flex-col gap-2">
            {userLinks.map((link, idx) => (
                <SidebarLink key={idx} link={{
                    href: link.href,
                    label: link.label,
                    icon: <link.icon className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />
                }} />
            ))}
            </div>
        </div>
        <div>
            <SidebarLink
            link={{
                label: user.displayName,
                href: "#",
                icon: (
                  <Avatar className="h-7 w-7 flex-shrink-0 rounded-full">
                    <AvatarImage
                        src={`https://avatar.vercel.sh/${user.email}.png`}
                    />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                ),
            }}
            />
             <div onClick={logout} className="cursor-pointer">
                <SidebarLink
                    link={{
                        label: "Logout",
                        href: "/login",
                        icon: <LogOut className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
                    }}
                />
            </div>
        </div>
    </SidebarBody>
  );
}
