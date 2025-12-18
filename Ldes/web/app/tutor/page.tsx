'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_WS_URL || 'http://localhost:4000', { withCredentials: true });

export default function TutorDashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillCategory, setSkillCategory] = useState('AI');
  const [difficulty, setDifficulty] = useState('BEGINNER');
  const [file, setFile] = useState<File | null>(null);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    socket.on('video:uploaded', (evt) => setLog((l) => [`Video uploaded: ${evt.videoId}`, ...l]));
    socket.on('evaluation:ready', (evt) => setLog((l) => [`Evaluation ready: ${evt.evaluationId}`, ...l]));
    return () => {
      socket.off('video:uploaded');
      socket.off('evaluation:ready');
    };
  }, []);

  const uploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    form.append('title', title);
    form.append('description', description);
    form.append('skillCategory', skillCategory);
    form.append('difficulty', difficulty);
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000') + '/videos', { method: 'POST', credentials: 'include', body: form });
    if (!res.ok) alert('Upload failed');
  };

  return (
    <main className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold">Upload Video</h2>
          <form onSubmit={uploadVideo} className="mt-4 grid gap-3">
            <label>Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} />
            <label>Description</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} />
            <label>Skill Category</label>
            <select value={skillCategory} onChange={e=>setSkillCategory(e.target.value)}>
              <option>AI</option>
              <option>CYBERSECURITY</option>
              <option>WEB_DEV</option>
              <option>DATA_SCIENCE</option>
            </select>
            <label>Difficulty</label>
            <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
              <option>BEGINNER</option>
              <option>INTERMEDIATE</option>
              <option>ADVANCED</option>
            </select>
            <label>File (MP4/MOV)</label>
            <input type="file" accept="video/mp4,video/quicktime" onChange={e=>setFile(e.target.files?.[0]||null)} />
            <button className="btn-primary w-fit" type="submit">Upload</button>
          </form>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold">Activity</h2>
          <ul className="mt-3 space-y-2">
            {log.map((l, i) => <li key={i} className="text-onyx-text-secondary">{l}</li>)}
          </ul>
        </div>
      </div>
    </main>
  );
}


