import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, User, Search, History } from 'lucide-react';

const officerActions = [
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
    title: "My Search History",
    description: "View your past investigation searches.",
    href: "#", // Placeholder
    icon: History,
  },
];

export default function OfficerDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {officerActions.map((action) => (
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
