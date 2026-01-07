
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { vehicleStatuses, vehicleTypes } from "@/lib/placeholder-data";
import { Upload, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {children}
        </div>
    </div>
);

const RequiredIndicator = () => <span className="text-destructive ml-1">*</span>

export default function RegisterVehiclePage() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [model, setModel] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [color, setColor] = useState('');
  const [identifyingMarks, setIdentifyingMarks] = useState('');
  const [status, setStatus] = useState('');
  const [operatingArea, setOperatingArea] = useState('');
  const [linkedDrivers, setLinkedDrivers] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);

    const newPreviews: string[] = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === selectedFiles.length) {
          setFilePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFiles = Array.from(e.dataTransfer.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);

    const newPreviews: string[] = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === selectedFiles.length) {
          setFilePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you'd handle form submission to the backend here.
      toast({
        title: "Vehicle Registered",
        description: "The new vehicle has been successfully saved to the system.",
      });
      // Reset form state
      setRegistrationNumber('');
      setModel('');
      setVehicleType('');
      setColor('');
      setIdentifyingMarks('');
      setStatus('');
      setOperatingArea('');
      setLinkedDrivers('');
      setFiles([]);
      setFilePreviews([]);
  }

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle>Register New Vehicle</CardTitle>
        <CardDescription>
          Enter the details of the new vehicle. All fields marked with <span className="text-destructive">*</span> are mandatory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormSection title="Vehicle Identity">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number <RequiredIndicator /></Label>
              <Input id="registrationNumber" placeholder="e.g., ABC-123" required value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Make and Model <RequiredIndicator /></Label>
              <Input id="model" placeholder="e.g., Toyota Camry 2022" required value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
          </FormSection>

          <FormSection title="Physical Characteristics">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type <RequiredIndicator /></Label>
              <Select required value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color <RequiredIndicator /></Label>
              <Input id="color" placeholder="e.g., Metallic Blue" required value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
             <div className="space-y-2 md:col-span-2">
              <Label htmlFor="identifyingMarks">Identifying Marks</Label>
              <Textarea id="identifyingMarks" placeholder="e.g., Dent on the rear bumper, custom sticker on windshield..." value={identifyingMarks} onChange={(e) => setIdentifyingMarks(e.target.value)} />
            </div>
          </FormSection>
          
          <FormSection title="Operational Information">
            <div className="space-y-2">
              <Label htmlFor="status">Status <RequiredIndicator /></Label>
              <Select required value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleStatuses.map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingArea">Operating Area</Label>
              <Input id="operatingArea" placeholder="e.g., Downtown District" value={operatingArea} onChange={(e) => setOperatingArea(e.target.value)} />
            </div>
          </FormSection>

          <FormSection title="Evidence & Media">
            <div className="space-y-2 md:col-span-2">
              <Label>Vehicle Images</Label>
               <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="dropzone-file" 
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors",
                        isDragging && "border-primary bg-primary/10"
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()} // Necessary to allow drop
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, or GIF (MAX. 5MB each)</p>
                      </div>
                      <Input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*"/>
                  </label>
              </div>
              {filePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {filePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <Image src={preview} alt={`Vehicle image ${index + 1}`} width={200} height={150} className="rounded-md object-cover w-full h-full" />
                      <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormSection>

          <FormSection title="Associations">
             <div className="space-y-2 md:col-span-2">
                <Label htmlFor="linkedDrivers">Link Drivers</Label>
                <Input id="linkedDrivers" placeholder="e.g., John Doe (D12345), Jane Smith (D67890)" value={linkedDrivers} onChange={(e) => setLinkedDrivers(e.target.value)} />
                <p className="text-xs text-muted-foreground">
                    Link registered drivers to this vehicle. You can add multiple drivers, separated by commas.
                </p>
            </div>
          </FormSection>
          
          <div className="flex justify-end pt-4">
            <Button type="submit">Register Vehicle</Button>
          </div>
        </form>
      </CardContent>
       <CardFooter>
          <p className="text-xs text-muted-foreground">
              All submitted information is logged and subject to audit under departmental policy.
          </p>
      </CardFooter>
    </Card>
  );
}

    