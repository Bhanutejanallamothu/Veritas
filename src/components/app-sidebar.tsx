"use client";

import Link from "next/link";
import { useAuth, UserRole } from "@/context/auth-context";
import { SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, Car, User, Search, FileText, Users, LogOut, FileClock } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
  section: 'general' | 'registration' | 'investigation' | 'oversight';
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["officer", "supervisor", "admin"], section: 'general' },
  
  { href: "/vehicles/register", label: "Register Vehicle", icon: Car, roles: ["officer", "supervisor"], section: 'registration' },
  { href: "/drivers/register", label: "Register Driver", icon: User, roles: ["officer", "supervisor"], section: 'registration' },
  
  { href: "/investigations/search", label: "Image Search", icon: Search, roles: ["officer", "supervisor"], section: 'investigation' },
  
  { href: "/investigations/review", label: "Review Searches", icon: FileClock, roles: ["supervisor"], section: 'oversight' },
  { href: "/audit-logs", label: "Audit Logs", icon: FileText, roles: ["supervisor", "admin"], section: 'oversight' },
  { href: "/users/manage", label: "User Management", icon: Users, roles: ["admin"], section: 'oversight' },
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
        width={42}
        height={42}
        className="h-auto rounded-full"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
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
        width={42}
        height={42}
        className="h-auto rounded-full"
      />
    </Link>
  );
};

const Section = ({ title, open, children }: { title: string, open: boolean, children: React.ReactNode }) => (
    <div className="flex flex-col gap-2">
        <AnimatePresence>
        {open && (
             <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-muted-foreground px-2 pt-4 pb-1"
            >
                {title}
            </motion.p>
        )}
        </AnimatePresence>
        {!open && <Separator className="my-2" />}
        {children}
    </div>
);


export default function AppSidebar() {
  const { user, logout } = useAuth();
  const { open } = useSidebar();

  if (!user) return null;

  const userLinks = navItems.filter(item => item.roles.includes(user.role));
  
  const sections = {
      general: userLinks.filter(l => l.section === 'general'),
      registration: userLinks.filter(l => l.section === 'registration'),
      investigation: userLinks.filter(l => l.section === 'investigation'),
      oversight: userLinks.filter(l => l.section === 'oversight'),
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch(role) {
        case 'admin': return 'destructive';
        case 'supervisor': return 'default';
        case 'officer': return 'secondary';
    }
  }

  return (
    <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-2 py-4">
                {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="mt-4 flex flex-col gap-2">
                {sections.general.length > 0 && (
                    <Section title="MENU" open={open}>
                        {sections.general.map((link, idx) => <SidebarLink key={idx} link={{...link, icon: <link.icon/>}} />)}
                    </Section>
                )}
                {sections.registration.length > 0 && (
                    <Section title="REGISTRATION" open={open}>
                        {sections.registration.map((link, idx) => <SidebarLink key={idx} link={{...link, icon: <link.icon/>}} />)}
                    </Section>
                )}
                {sections.investigation.length > 0 && (
                    <Section title="INVESTIGATION" open={open}>
                        {sections.investigation.map((link, idx) => <SidebarLink key={idx} link={{...link, icon: <link.icon/>}} />)}
                    </Section>
                )}
                 {sections.oversight.length > 0 && (
                    <Section title="OVERSIGHT" open={open}>
                        {sections.oversight.map((link, idx) => <SidebarLink key={idx} link={{...link, icon: <link.icon/>}} />)}
                    </Section>
                )}
            </div>
        </div>
        <div>
             <AnimatePresence>
                {open && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-2 pb-2 flex flex-col items-start"
                    >
                        <p className="text-sm font-medium">{user.displayName}</p>
                        <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize text-xs mt-1">
                            {user.role}
                        </Badge>
                     </motion.div>
                )}
            </AnimatePresence>

            <SidebarLink
                link={{
                    label: "Profile",
                    href: "#",
                    icon: (
                      <Avatar className="h-7 w-7 flex-shrink-0">
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
                        icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                    }}
                />
            </div>
        </div>
    </SidebarBody>
  );
}
