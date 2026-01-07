
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Car, User, Search, History, FileClock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const supervisorActions = [
  {
    title: "Image-Based Search",
    description: "Search for vehicles using an image.",
    href: "/investigations/search",
    icon: Search,
    isPrimary: true,
  },
  {
    title: "Review Searches",
    description: "Review pending investigation searches.",
    href: "/investigations/review",
    icon: FileClock,
    isPrimary: true,
  },
  {
    title: "Register Vehicle",
    description: "Add a new vehicle to the registry.",
    href: "/vehicles/register",
    icon: Car,
    isPrimary: false,
  },
  {
    title: "Register Driver",
    description: "Add a new driver to the registry.",
    href: "/drivers/register",
    icon: User,
    isPrimary: false,
  },
   {
    title: "View Audit Logs",
    description: "Access system and user activity logs.",
    href: "/audit-logs",
    icon: FileText,
    isPrimary: false,
  },
   {
    title: "My Search History",
    description: "View your past investigation searches.",
    href: "#", // Placeholder
    icon: History,
    isPrimary: false,
  },
];

export default function SupervisorDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {supervisorActions.map((action) => (
         <Link href={action.href} key={action.title} className={cn(action.isPrimary ? "lg:col-span-2" : "")}>
            <Card className={cn(
                "bg-card/50 hover:bg-muted/50 transition-colors h-full",
                action.isPrimary && "border-primary/50 ring-2 ring-primary/20"
            )}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {action.title}
                    </CardTitle>
                    <action.icon className={cn("h-4 w-4 text-muted-foreground", action.isPrimary && "h-6 w-6")} />
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {action.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
      ))}
    </div>
  );
}
