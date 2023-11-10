import { auth } from '@/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name}!</p>
      <h2>Session Information</h2>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <Link href="/logout">Sign out</Link>
    </div>
  );
}
