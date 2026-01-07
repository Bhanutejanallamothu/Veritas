
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const adminActions = [
  {
    title: "User Management",
    description: "Manage users and their roles.",
    href: "/users/manage",
    icon: Users,
    isPrimary: true,
  },
  {
    title: "System Overview",
    description: "View system statistics and health.",
    href: "#", // Placeholder
    icon: Settings,
    isPrimary: false,
  },
];

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {adminActions.map((action) => (
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
