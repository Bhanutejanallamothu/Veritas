import { redirect } from 'next/navigation';

export default function Home() {
  // The logic is now handled in the ProtectedLayout and root page logic
  // This page can redirect to the primary entry point of the app.
  redirect('/dashboard');
}
