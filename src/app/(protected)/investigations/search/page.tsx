"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, FileQuestion, Loader2, AlertTriangle } from "lucide-react";
import { imageBasedVehicleSearch, type ImageBasedVehicleSearchOutput } from "@/ai/flows/image-based-vehicle-search";

export default function ImageSearchPage() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ImageBasedVehicleSearchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !reason) {
        setError("An image and a reason for the search are required.");
        return;
    }
    setLoading(true);
    setError(null);
    setResults(null);

    try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result as string;
            const response = await imageBasedVehicleSearch({
                uploadedImageURL: base64Image,
                reasonForSearch: reason,
            });
            setResults(response);
        };
        reader.onerror = () => {
            setError("Failed to read the image file.");
        }
    } catch (err) {
      setError("An unexpected error occurred during the search.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>New Image-Based Search</CardTitle>
          <CardDescription>
            Upload an image and provide a reason to initiate an AI-assisted search.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Evidence Image</Label>
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                      {filePreview ? (
                          <Image src={filePreview} alt="Uploaded image preview" layout="fill" objectFit="contain" className="rounded-lg p-2"/>
                      ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-muted-foreground">Image from CCTV, mobile, etc.</p>
                          </div>
                      )}
                      <Input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
              </div> 
            </div>
            <div className="space-y-2">
              <Label htmlFor="reasonForSearch">Reason for Search (Mandatory)</Label>
              <Textarea id="reasonForSearch" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., Vehicle involved in a reported incident at 5th and Main St." required />
            </div>
             {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !file || !reason} className="w-full">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...</> : "Initiate Search"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold font-headline">Search Results</h2>
        {loading && (
          <div className="space-y-4">
            <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                     <Skeleton className="h-24 w-32 rounded-md" />
                     <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                     </div>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                     <Skeleton className="h-24 w-32 rounded-md" />
                     <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                     </div>
                </CardContent>
            </Card>
          </div>
        )}

        {!loading && !results && (
            <Card className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6 border-dashed">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Results will appear here</h3>
                <p className="mt-1 text-sm text-muted-foreground">Complete the form to start a search.</p>
            </Card>
        )}
        
        {results && (
            <div className="space-y-4">
                <Alert variant="default" className="bg-primary/10 border-primary/20">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-semibold text-primary">Assistive Results Only</AlertTitle>
                    <AlertDescription className="text-primary/90">{results.disclaimer}</AlertDescription>
                </Alert>
                {results.vehicleSuggestions.map((suggestion, index) => (
                    <Card key={index}>
                        <CardContent className="p-4 flex items-center space-x-4">
                            <Image 
                                src={`https://picsum.photos/seed/${suggestion.registrationNumber}/200/150`} 
                                alt={`Vehicle ${suggestion.registrationNumber}`} 
                                width={128} height={96}
                                data-ai-hint="vehicle side"
                                className="rounded-md object-cover bg-muted"
                            />
                            <div className="flex-1">
                                <p className="font-mono text-lg font-semibold">{suggestion.registrationNumber}</p>
                                <p className="text-sm text-muted-foreground">Confidence Score: <span className="font-bold text-foreground">{(suggestion.confidenceScore * 100).toFixed(0)}%</span></p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
