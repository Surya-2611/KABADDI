'use client';
import { useState } from 'react';

export default function StudentSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/signup', {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'STUDENT', name })
    });
    if (!res.ok) { setErr('Signup failed'); return; }
    window.location.href = '/student';
  };

  return (
    <main className="container mx-auto p-6 max-w-md">
      <div className="card">
        <h2 className="text-xl font-semibold">Student Signup</h2>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} required />
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          {err && <div className="text-danger">{err}</div>}
          <button className="btn-primary" type="submit">Create account</button>
        </form>
      </div>
    </main>
  );
}


