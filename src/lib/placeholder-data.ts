import type { User } from '@/context/auth-context';

export const mockUsers: User[] = [
    { uid: 'officer-001', email: 'officer.doe@gov.local', displayName: 'OFC. Jane Doe', role: 'officer' },
    { uid: 'officer-002', email: 'officer.roe@gov.local', displayName: 'OFC. John Roe', role: 'officer' },
    { uid: 'supervisor-001', email: 'supervisor.smith@gov.local', displayName: 'SUP. John Smith', role: 'supervisor' },
    { uid: 'admin-001', email: 'admin.ray@gov.local', displayName: 'ADM. Alex Ray', role: 'admin' },
];

export type Investigation = {
    id: string;
    uploadedImageURL: string;
    uploadedBy: string;
    reasonForSearch: string;
    timestamp: Date;
    status: 'Pending Review' | 'Reviewed';
};

export const mockInvestigations: Investigation[] = [
    { id: 'inv-001', uploadedImageURL: 'https://picsum.photos/seed/cctv1/150/100', uploadedBy: 'OFC. Jane Doe', reasonForSearch: 'Vehicle seen leaving the scene of a robbery.', timestamp: new Date('2023-10-26T10:00:00Z'), status: 'Reviewed' },
    { id: 'inv-002', uploadedImageURL: 'https://picsum.photos/seed/cctv2/150/100', uploadedBy: 'OFC. John Roe', reasonForSearch: 'Suspicious vehicle reported in a residential area.', timestamp: new Date('2023-10-27T11:30:00Z'), status: 'Pending Review' },
    { id: 'inv-003', uploadedImageURL: 'https://picsum.photos/seed/cctv3/150/100', uploadedBy: 'OFC. Jane Doe', reasonForSearch: 'Vehicle matching description of a missing person case.', timestamp: new Date('2023-10-28T14:00:00Z'), status: 'Pending Review' },
];

export type AuditLog = {
    id: string;
    actionType: 'login' | 'upload' | 'search' | 'view';
    performedBy: string;
    timestamp: Date;
    details: string;
}

export const mockAuditLogs: AuditLog[] = [
    { id: 'log-001', actionType: 'login', performedBy: 'OFC. Jane Doe', timestamp: new Date('2023-10-28T14:05:00Z'), details: 'User logged in.' },
    { id: 'log-002', actionType: 'search', performedBy: 'OFC. Jane Doe', timestamp: new Date('2023-10-28T14:00:00Z'), details: 'Performed image-based search for investigation INV-003.' },
    { id: 'log-003', actionType: 'view', performedBy: 'SUP. John Smith', timestamp: new Date('2023-10-28T09:00:00Z'), details: 'Viewed audit logs.' },
    { id: 'log-004', actionType: 'upload', performedBy: 'OFC. John Roe', timestamp: new Date('2023-10-27T11:30:00Z'), details: 'Uploaded image for investigation INV-002.' },
];

export const vehicleTypes = ['two-wheeler', 'car', 'auto', 'taxi', 'bus', 'truck', 'commercial', 'government'];
export const vehicleStatuses = ['active', 'flagged', 'inactive'];
