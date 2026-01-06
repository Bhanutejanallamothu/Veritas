"use client";

import { useAuth } from '@/context/auth-context';
import OfficerDashboard from '@/components/dashboard/officer-dashboard';
import SupervisorDashboard from '@/components/dashboard/supervisor-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';

export default function DashboardPage() {
    const { user } = useAuth();

    const renderDashboard = () => {
        switch (user?.role) {
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
    
    const getRoleDescription = () => {
        switch(user?.role) {
            case 'officer': return 'Access your tools for registration and investigation.';
            case 'supervisor': return 'Oversee operations, review activities, and manage records.';
            case 'admin': return 'Manage system users, roles, and configurations.';
            default: return '';
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight font-headline">Welcome, {user?.displayName}</h2>
                <p className="text-muted-foreground">{getRoleDescription()}</p>
            </div>
            {renderDashboard()}
        </div>
    );
}
