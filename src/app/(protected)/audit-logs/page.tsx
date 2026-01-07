
"use client";

import { useState, useEffect, useMemo } from "react";
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
import { FileText, LogIn, Search, Upload, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const actionIcons: Record<string, React.ReactElement> = {
    login: <LogIn className="h-3 w-3" />,
    upload: <Upload className="h-3 w-3" />,
    search: <Search className="h-3 w-3" />,
    view: <FileText className="h-3 w-3" />,
};

type AuditFiltersProps = {
    details: string;
    setDetails: (value: string) => void;
    officer: string;
    setOfficer: (value: string) => void;
    action: string;
    setAction: (value: string) => void;
    date: string;
    setDate: (value: string) => void;
    clearFilters: () => void;
};

const AuditFilters = ({ details, setDetails, officer, setOfficer, action, setAction, date, setDate, clearFilters }: AuditFiltersProps) => (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 mb-4 border-b">
        <div className="w-full">
             <Input placeholder="Filter by details..." value={details} onChange={(e) => setDetails(e.target.value)} />
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4">
            <Select value={officer} onValueChange={setOfficer}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Officer" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Officers</SelectItem>
                    {mockUsers.map(user => <SelectItem key={user.uid} value={user.displayName}>{user.displayName}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={action} onValueChange={setAction}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Action" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="upload">Upload</SelectItem>
                    <SelectItem value="search">Search</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                </SelectContent>
            </Select>
            <Input type="date" className="w-full sm:w-[180px]" value={date} onChange={(e) => setDate(e.target.value)} />
            <Button variant="outline" onClick={clearFilters} className="gap-1.5">
                <X className="h-4 w-4" />
                Clear
            </Button>
        </div>
    </div>
);


export default function AuditLogsPage() {
    const [logs, setLogs] = useState(mockAuditLogs);
    
    const [detailsFilter, setDetailsFilter] = useState("");
    const [officerFilter, setOfficerFilter] = useState("all");
    const [actionFilter, setActionFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");

    const filteredLogs = useMemo(() => {
        return mockAuditLogs.filter(log => {
            const detailsMatch = detailsFilter === "" || log.details.toLowerCase().includes(detailsFilter.toLowerCase());
            const officerMatch = officerFilter === "all" || log.performedBy === officerFilter;
            const actionMatch = actionFilter === "all" || log.actionType === actionFilter;
            const dateMatch = dateFilter === "" || log.timestamp.toISOString().slice(0, 10) === dateFilter;
            
            return detailsMatch && officerMatch && actionMatch && dateMatch;
        });
    }, [detailsFilter, officerFilter, actionFilter, dateFilter]);
    
    const clearFilters = () => {
        setDetailsFilter("");
        setOfficerFilter("all");
        setActionFilter("all");
        setDateFilter("");
    }

    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>System Audit Logs</CardTitle>
                <CardDescription>
                    A record of all sensitive actions performed within the system. Unauthorized access is prohibited.
                </CardDescription>
            </CardHeader>
            <AuditFilters 
                details={detailsFilter}
                setDetails={setDetailsFilter}
                officer={officerFilter}
                setOfficer={setOfficerFilter}
                action={actionFilter}
                setAction={setActionFilter}
                date={dateFilter}
                setDate={setDateFilter}
                clearFilters={clearFilters}
            />
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
                        {filteredLogs.map((log) => (
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
                         {filteredLogs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No logs found matching your criteria.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
