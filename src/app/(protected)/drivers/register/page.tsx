
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export default function RegisterDriverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
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
    const selectedFile = e.dataTransfer.files?.[0];
     if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you'd handle form submission to the backend here.
      toast({
        title: "Driver Registered",
        description: "The new driver's details have been successfully saved to the system.",
      });
      // Optionally reset form state here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Driver</CardTitle>
        <CardDescription>
          Enter the details of the new driver. All fields marked with <span className="text-destructive">*</span> are mandatory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit}>
            <FormSection title="Personal Information">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name <RequiredIndicator /></Label>
                    <Input id="fullName" placeholder="e.g., Johnathan Doe" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number <RequiredIndicator /></Label>
                    <Input id="licenseNumber" placeholder="e.g., D12345678" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <RequiredIndicator /></Label>
                    <Input id="phone" type="tel" placeholder="e.g., (555) 123-4567" required/>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address <RequiredIndicator /></Label>
                    <Textarea id="address" placeholder="e.g., 123 Main St, Anytown, USA 12345" required/>
                </div>
            </FormSection>

            <FormSection title="Evidence & Media">
                 <div className="space-y-2 md:col-span-2">
                    <Label>Driver Photo <RequiredIndicator /></Label>
                    <div className="flex items-center justify-center w-full">
                        <label 
                            htmlFor="dropzone-file" 
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors",
                                isDragging && "border-primary bg-primary/10"
                            )}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()} // Necessary to allow drop
                        >
                           {filePreview ? (
                                <>
                                    <Image src={filePreview} alt="Driver photo preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 z-10" onClick={(e) => { e.preventDefault(); removeFile(); }}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">PNG or JPG (MAX. 2MB)</p>
                                </div>
                            )}
                            <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                    </div> 
                </div>
            </FormSection>

            <FormSection title="Associations">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="linkedVehicles">Link Vehicles</Label>
                    {/* In a real app this would be an async search select component */}
                </div>
            </FormSection>
          
            <div className="flex justify-end pt-4">
                <Button type="submit">Register Driver</Button>
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
