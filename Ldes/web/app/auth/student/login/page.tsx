'use client';
import { useState } from 'react';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) { setErr('Invalid credentials'); return; }
    const data = await res.json();
    if (data.role !== 'STUDENT') { setErr('Use tutor login'); return; }
    window.location.href = '/student';
  };

  return (
    <main className="container mx-auto p-6 max-w-md">
      <div className="card">
        <h2 className="text-xl font-semibold">Student Login</h2>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          {err && <div className="text-danger">{err}</div>}
          <button className="btn-primary" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}


