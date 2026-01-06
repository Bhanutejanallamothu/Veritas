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
import { Button } from "@/components/ui/button";
import { mockInvestigations } from "@/lib/placeholder-data";
import Image from "next/image";

export default function ReviewSearchesPage() {
    const investigations = mockInvestigations;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Review Investigation Searches</CardTitle>
                <CardDescription>
                    Review AI-assisted searches initiated by officers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Reason for Search</TableHead>
                            <TableHead>Officer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {investigations.map((inv) => (
                            <TableRow key={inv.id}>
                                <TableCell>
                                    <Image
                                        src={inv.uploadedImageURL}
                                        alt={`Investigation ${inv.id}`}
                                        width={80}
                                        height={60}
                                        className="rounded-md object-cover bg-muted"
                                        data-ai-hint="cctv vehicle"
                                    />
                                </TableCell>
                                <TableCell className="max-w-xs truncate">{inv.reasonForSearch}</TableCell>
                                <TableCell>{inv.uploadedBy}</TableCell>
                                <TableCell>{inv.timestamp.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant={inv.status === 'Reviewed' ? 'secondary' : 'default'}>
                                        {inv.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" disabled={inv.status === 'Reviewed'}>
                                        {inv.status === 'Reviewed' ? 'Reviewed' : 'Mark as Reviewed'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
