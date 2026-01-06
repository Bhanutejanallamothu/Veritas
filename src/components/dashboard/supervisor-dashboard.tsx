import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, User, Search, History, FileClock, FileText } from 'lucide-react';

const supervisorActions = [
  {
    title: "Register Vehicle",
    description: "Add a new vehicle to the registry.",
    href: "/vehicles/register",
    icon: Car,
  },
  {
    title: "Register Driver",
    description: "Add a new driver to the registry.",
    href: "/drivers/register",
    icon: User,
  },
  {
    title: "Image-Based Search",
    description: "Search for vehicles using an image.",
    href: "/investigations/search",
    icon: Search,
  },
  {
    title: "Review Searches",
    description: "Review pending investigation searches.",
    href: "/investigations/review",
    icon: FileClock,
  },
   {
    title: "View Audit Logs",
    description: "Access system and user activity logs.",
    href: "/audit-logs",
    icon: FileText,
  },
   {
    title: "My Search History",
    description: "View your past investigation searches.",
    href: "#", // Placeholder
    icon: History,
  },
];

export default function SupervisorDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {supervisorActions.map((action) => (
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
