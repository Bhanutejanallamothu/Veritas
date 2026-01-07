import { redirect } from 'next/navigation'

export default function ProtectedRootPage() {
  // Redirect to the main dashboard, auth is handled by the layout
  redirect('/dashboard')
}
