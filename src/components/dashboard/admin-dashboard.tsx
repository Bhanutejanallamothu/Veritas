import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Settings } from 'lucide-react';

const adminActions = [
  {
    title: "User Management",
    description: "Manage users and their roles.",
    href: "/users/manage",
    icon: Users,
  },
  {
    title: "System Overview",
    description: "View system statistics and health.",
    href: "#", // Placeholder
    icon: Settings,
  },
];

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {adminActions.map((action) => (
         <Link href={action.href} key={action.title}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {action.title}
                    </CardTitle>
                    <action.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardDescription className="p-6 pt-0">
                    {action.description}
                </CardDescription>
            </Card>
        </Link>
      ))}
    </div>
  );
}
