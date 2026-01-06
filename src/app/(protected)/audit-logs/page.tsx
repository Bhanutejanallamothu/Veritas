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
import { mockAuditLogs } from "@/lib/placeholder-data";

export default function AuditLogsPage() {
    const logs = mockAuditLogs;

    const getBadgeVariant = (action: string): "default" | "secondary" | "destructive" | "outline" => {
        switch(action) {
            case 'login': return 'default';
            case 'search': return 'secondary';
            case 'upload': return 'outline';
            case 'view': return 'secondary';
            default: return 'default';
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>System Audit Logs</CardTitle>
                <CardDescription>
                    A record of all sensitive actions performed within the system.
                </CardDescription>
            </CardHeader>
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
                                    <Badge variant={getBadgeVariant(log.actionType)} className="capitalize">{log.actionType}</Badge>
                                </TableCell>
                                <TableCell>{log.performedBy}</TableCell>
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
