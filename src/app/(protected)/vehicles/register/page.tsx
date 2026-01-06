"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { vehicleStatuses, vehicleTypes } from "@/lib/placeholder-data";
import { Upload } from "lucide-react";

export default function RegisterVehiclePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Vehicle</CardTitle>
        <CardDescription>
          Enter the details of the new vehicle. All fields are required unless marked optional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input id="registrationNumber" placeholder="e.g., ABC-123" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select>
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
            <Label htmlFor="color">Color</Label>
            <Input id="color" placeholder="e.g., Metallic Blue" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Make and Model</Label>
            <Input id="model" placeholder="e.g., Toyota Camry 2022" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operatingArea">Operating Area (Optional)</Label>
            <Input id="operatingArea" placeholder="e.g., Downtown District" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select>
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
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="identifyingMarks">Identifying Marks</Label>
            <Textarea id="identifyingMarks" placeholder="e.g., Dent on the rear bumper, custom sticker on windshield..." />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Vehicle Images</Label>
             <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or GIF (MAX. 5MB each)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" multiple />
                </label>
            </div> 
          </div>
           <div className="space-y-2 md:col-span-2">
            <Label htmlFor="linkedDrivers">Link Drivers (Optional)</Label>
            <Input id="linkedDrivers" placeholder="Search by driver name or license number" />
            {/* In a real app this would be an async search select component */}
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button>Register Vehicle</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
