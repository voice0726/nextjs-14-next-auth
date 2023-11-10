import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Nextjs and next-auth demo application</h1>
        <Link href="/login"> Signin to dashboard</Link>
      </div>
    </main>
  );
}
