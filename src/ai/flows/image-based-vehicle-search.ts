
'use server';

/**
 * @fileOverview Image-based vehicle search flow.
 *
 * This flow allows officers to upload an image of a vehicle and receive AI-assisted suggestions for potential matches, along with confidence scores.
 *
 * @exports imageBasedVehicleSearch - A function that handles the image-based vehicle search process.
 * @exports ImageBasedVehicleSearchInput - The input type for the imageBasedVehicleSearch function.
 * @exports ImageBasedVehicleSearchOutput - The return type for the imageBasedVehicleSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageBasedVehicleSearchInputSchema = z.object({
  uploadedImageURL: z
    .string()
    .describe(
      "The URL of the uploaded image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'." // Corrected description
    ),
  reasonForSearch: z.string().describe('The reason for the image-based search.'),
});
export type ImageBasedVehicleSearchInput = z.infer<typeof ImageBasedVehicleSearchInputSchema>;

const ImageBasedVehicleSearchOutputSchema = z.object({
  vehicleSuggestions: z.array(
    z.object({
      registrationNumber: z.string().describe('The registration number of the vehicle.'),
      confidenceScore: z.number().describe('The confidence score of the match (0-1).'),
      vehicleImageURL: z.string().describe('URL of the vehicle image for display'),
    })
  ).describe('Array of suggested vehicle matches with confidence scores.'),
  disclaimer: z.string().describe('Disclaimer emphasizing AI assistance only.'),
});
export type ImageBasedVehicleSearchOutput = z.infer<typeof ImageBasedVehicleSearchOutputSchema>;

export async function imageBasedVehicleSearch(input: ImageBasedVehicleSearchInput): Promise<ImageBasedVehicleSearchOutput> {
  return imageBasedVehicleSearchFlow(input);
}

const imageBasedVehicleSearchPrompt = ai.definePrompt({
  name: 'imageBasedVehicleSearchPrompt',
  input: {schema: ImageBasedVehicleSearchInputSchema},
  output: {schema: ImageBasedVehicleSearchOutputSchema},
  prompt: `You are an AI assistant helping law enforcement officers identify vehicles based on uploaded images.

  Analyze the provided image and the reason for the search to suggest potential vehicle matches.

  Return an array of vehicle suggestions with their registration numbers and confidence scores (0-1).

  Reason for Search: {{{reasonForSearch}}}
  Uploaded Image: {{media url=uploadedImageURL}}

  Format your response as a JSON object with a 'vehicleSuggestions' array and a 'disclaimer'.
  Include the vehicleImageURL for each suggested vehicle if available.

  The 'disclaimer' field should contain the following text: 'AI suggestions only. Final judgment lies with the officer.'`,
});

const imageBasedVehicleSearchFlow = ai.defineFlow(
  {
    name: 'imageBasedVehicleSearchFlow',
    inputSchema: ImageBasedVehicleSearchInputSchema,
    outputSchema: ImageBasedVehicleSearchOutputSchema,
  },
  async input => {
    // Mock AI response for the prototype
    const mockAIResults = {
      vehicleSuggestions: [
        {
          registrationNumber: 'ABC-123',
          confidenceScore: 0.85,
          vehicleImageURL: 'https://images.unsplash.com/photo-1645596105558-a6434c16fbc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzaWx2ZXIlMjBzZWRhbnxlbnwwfHx8fDE3Njc2MTIzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          registrationNumber: 'XYZ-789',
          confidenceScore: 0.72,
          vehicleImageURL: 'https://images.unsplash.com/photo-1687088351621-c70a25d92e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxibHVlJTIwdHJ1Y2t8ZW58MHx8fHwxNzY3NzE2NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          registrationNumber: 'DEF-456',
          confidenceScore: 0.60,
          vehicleImageURL: 'https://images.unsplash.com/photo-1641825932091-73f78062d625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxyZWQlMjBoYXRjaGJhY2t8ZW58MHx8fHwxNzY3NjI0NzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
      disclaimer: 'AI suggestions only. Final judgment lies with the officer.',
    };

    // Since this is a prototype, directly return the mock data
    // In a real implementation, this would call the AI model and process the results
    return mockAIResults;

    // const {output} = await imageBasedVehicleSearchPrompt(input);
    // return output!;
  }
);
