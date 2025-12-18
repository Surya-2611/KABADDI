import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Learning Path Dashboard</h1>
        <p className="mt-2 text-onyx-text-secondary">Choose a portal:</p>
        <div className="mt-4 flex gap-3">
          <Link href="/auth/tutor/login" className="btn-primary">Tutor Login</Link>
          <Link href="/auth/student/login" className="btn-primary">Student Login</Link>
        </div>
      </div>
    </main>
  );
}


