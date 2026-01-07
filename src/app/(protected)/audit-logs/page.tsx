
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAuditLogs, mockUsers } from "@/lib/placeholder-data";
import { FileText, LogIn, Search, Upload, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const actionIcons: Record<string, React.ReactElement> = {
    login: <LogIn className="h-3 w-3" />,
    upload: <Upload className="h-3 w-3" />,
    search: <Search className="h-3 w-3" />,
    view: <FileText className="h-3 w-3" />,
};

const AuditFilters = () => (
    <div className="flex items-center gap-4 p-4 mb-4 border-b">
        <div className="flex-1">
             <Input placeholder="Filter by details..." />
        </div>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Officer" />
            </SelectTrigger>
            <SelectContent>
                {mockUsers.map(user => <SelectItem key={user.uid} value={user.displayName}>{user.displayName}</SelectItem>)}
            </SelectContent>
        </Select>
         <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Action" />
            </SelectTrigger>
            <SelectContent>
                 <SelectItem value="login">Login</SelectItem>
                 <SelectItem value="upload">Upload</SelectItem>
                 <SelectItem value="search">Search</SelectItem>
                 <SelectItem value="view">View</SelectItem>
            </SelectContent>
        </Select>
        <Input type="date" className="w-[180px]" />
        <Button>Filter</Button>
    </div>
);


export default function AuditLogsPage() {
    const logs = mockAuditLogs;

    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>System Audit Logs</CardTitle>
                <CardDescription>
                    A record of all sensitive actions performed within the system. Unauthorized access is prohibited.
                </CardDescription>
            </CardHeader>
            <AuditFilters />
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>Performed By</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>
                                    <Badge variant="outline" className="capitalize flex items-center gap-1.5 w-fit">
                                        {actionIcons[log.actionType]}
                                        {log.actionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="flex items-center gap-2 font-medium">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    {log.performedBy}
                                </TableCell>
                                <TableCell>{log.timestamp.toLocaleString()}</TableCell>
                                <TableCell>{log.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
