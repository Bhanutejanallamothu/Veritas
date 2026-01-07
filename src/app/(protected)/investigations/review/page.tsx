
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInvestigations } from "@/lib/placeholder-data";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function ReviewSearchesPage() {
    const [investigations, setInvestigations] = useState(mockInvestigations);
    const { toast } = useToast();

    const handleMarkAsReviewed = (id: string) => {
        setInvestigations(prev => prev.map(inv => inv.id === id ? {...inv, status: 'Reviewed'} : inv));
        toast({
            title: "Investigation Reviewed",
            description: `Investigation ${id} has been marked as reviewed and logged.`,
        });
    };

    const getStatusBadgeClass = (status: 'Pending Review' | 'Reviewed') => {
        return status === 'Reviewed' ? 'bg-green-800/80 text-green-100' : 'bg-amber-800/80 text-amber-100';
    }

    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Review Investigation Searches</CardTitle>
                <CardDescription>
                    Review AI-assisted searches initiated by officers. All actions are logged.
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Image
                                                src={inv.uploadedImageURL}
                                                alt={`Investigation ${inv.id}`}
                                                width={80}
                                                height={60}
                                                className="rounded-md object-cover bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                                                data-ai-hint="cctv vehicle"
                                            />
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl">
                                          <DialogHeader>
                                            <DialogTitle>Investigation Image: {inv.id}</DialogTitle>
                                          </DialogHeader>
                                            <Image
                                                src={inv.uploadedImageURL.replace('/150/100', '/800/600')} // Request larger image
                                                alt={`Investigation ${inv.id}`}
                                                width={800}
                                                height={600}
                                                className="rounded-md object-contain"
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                <TableCell className="max-w-xs truncate">{inv.reasonForSearch}</TableCell>
                                <TableCell>{inv.uploadedBy}</TableCell>
                                <TableCell>{inv.timestamp.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn("border-transparent", getStatusBadgeClass(inv.status))}>
                                        {inv.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {inv.status !== 'Reviewed' ? (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    Mark as Reviewed
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action will mark the investigation as reviewed and will be logged with your officer ID. Are you sure you want to proceed?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleMarkAsReviewed(inv.id)}>
                                                        Confirm
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    ) : (
                                         <Button variant="outline" size="sm" disabled>
                                            Reviewed
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
