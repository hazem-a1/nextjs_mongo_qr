import Link from 'next/link';
import { getCurrentUser } from './api/auth/auth';

export default async function Home() {
  const user = await getCurrentUser();
  
  return (
    <div>
      <h1>Welcome to QR Start</h1>
      {user ? (
        <Link href="/links">Go to Dashboard</Link>
      ) : (
        <Link href="/api/auth/signin">Sign In</Link>
      )}
    </div>
  );
}
