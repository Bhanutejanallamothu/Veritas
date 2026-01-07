"use client";

import { useAuth } from '@/context/auth-context';
import OfficerDashboard from '@/components/dashboard/officer-dashboard';
import SupervisorDashboard from '@/components/dashboard/supervisor-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, BrainCircuit, Database, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SystemStatusBar = () => (
    <Card className="mb-6 bg-card/50">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-semibold">System Status:</span>
                    <span className="text-foreground font-bold">Operational</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Last Sync:</span>
                    <span className="text-foreground font-bold">2 mins ago</span>
                </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
                 <div className="flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4" />
                    <span>AI Search Engine:</span>
                    <span className="text-foreground font-bold text-green-400">Online</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Total Records:</span>
                    <span className="text-foreground font-bold">14,822 Vehicles | 8,971 Drivers</span>
                </div>
            </div>
        </CardContent>
    </Card>
);

const DashboardHeader = ({ role, userName }: { role: string, userName: string }) => {
    return (
         <div>
            <h2 className="text-2xl font-bold tracking-tight font-headline">
                {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
                <span>{userName}</span>
                <Separator orientation="vertical" className="h-4"/>
                <span className="text-xs">Authorized Access &middot; {role.charAt(0).toUpperCase() + role.slice(1)} Role</span>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const { user } = useAuth();

    const renderDashboard = () => {
        if (!user) return <p>Loading user data...</p>;
        
        switch (user.role) {
            case 'officer':
                return <OfficerDashboard />;
            case 'supervisor':
                return <SupervisorDashboard />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return <p>No role assigned. Please contact an administrator.</p>;
        }
    };
    
    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-6">
           <DashboardHeader role={user.role} userName={user.displayName} />
           <SystemStatusBar />
           {renderDashboard()}
        </div>
    );
}
