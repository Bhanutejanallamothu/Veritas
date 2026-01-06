"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function RegisterDriverPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Driver</CardTitle>
        <CardDescription>
          Enter the details of the new driver. All fields are required unless marked optional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="e.g., Johnathan Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input id="licenseNumber" placeholder="e.g., D12345678" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="e.g., (555) 123-4567" />
          </div>
           <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="e.g., 123 Main St, Anytown, USA 12345" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Driver Photo</Label>
             <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG or JPG (MAX. 2MB)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
          </div>
           <div className="space-y-2 md:col-span-2">
            <Label htmlFor="linkedVehicles">Link Vehicles (Optional)</Label>
            <Input id="linkedVehicles" placeholder="Search by vehicle registration number" />
            {/* In a real app this would be an async search select component */}
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button>Register Driver</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
