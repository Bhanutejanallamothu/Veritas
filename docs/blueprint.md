# **App Name**: Veritas Platform

## Core Features:

- User Authentication: Secure user authentication using Firebase Authentication with role-based access control.
- Vehicle Registration: Allow officers to register vehicle data, including images uploaded to Firebase Storage, into a Firestore database. Optional vehicle-type specific fields available.
- Driver Registration: Enable officers to register driver information, including photo upload and linking to vehicles, securely stored in Firestore.
- Image-Based Search Assistance: Provide an interface for uploading images and displaying mock AI-generated vehicle suggestions with confidence scores, emphasizing human oversight with a prominent disclaimer.
- Role-Based Dashboards: Display role-specific dashboards (Officer, Supervisor, Admin) with appropriate functionalities based on user role stored in Firestore.
- Audit Logging: Log every sensitive action (login, upload, search, view) with user and metadata to Firestore for audit purposes.
- Firebase Security Rules Enforcement: Firebase Security Rules that enforce role-based access and data protection (preventing cross-role access and unauthorized data access).

## Style Guidelines:

- Primary color: Desaturated cool blue (#6699CC) for a professional and trustworthy feel.
- Background color: Very light grey (#F2F2F2) for a clean and neutral backdrop.
- Accent color: Muted grey-blue (#778899) for subtle highlights and interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif, to convey a modern, objective, neutral feel suitable for both headlines and body text.
- Use simple, line-based icons for clarity and ease of understanding.
- Maintain a clean and organized layout with consistent spacing and alignment.
- Use minimal and subtle animations for transitions and feedback, avoiding any unnecessary distractions.