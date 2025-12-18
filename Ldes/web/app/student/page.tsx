'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ReactPlayer from 'react-player';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const socket = io(process.env.NEXT_PUBLIC_API_WS_URL || 'http://localhost:4000', { withCredentials: true });

type Video = { id: string; title: string };

export default function StudentDashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    // fetch current user then load assigned videos
    (async () => {
      const meRes = await fetch(API + '/auth/me', { credentials: 'include' });
      if (meRes.ok) {
        const me = await meRes.json();
        const res = await fetch(API + `/videos/students/${me.id}/videos`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      }
    })();
    socket.on('video:assigned', () => {
      // refetch on assignment
      (async () => {
        const meRes = await fetch(API + '/auth/me', { credentials: 'include' });
        if (meRes.ok) {
          const me = await meRes.json();
          const res = await fetch(API + `/videos/students/${me.id}/videos`, { credentials: 'include' });
          if (res.ok) setVideos(await res.json());
        }
      })();
    });
    return () => { socket.off('video:assigned'); };
  }, []);

  return (
    <main className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold">Assigned Videos</h2>
          {videos.length === 0 && <p className="text-onyx-text-secondary mt-2">Assignments will appear here.</p>}
          <ul className="mt-3 space-y-2">
            {videos.map(v => (
              <li key={v.id} className="flex items-center justify-between">
                <span>{v.title}</span>
                <button className="btn-primary" onClick={()=>setCurrent(v.id)}>Play</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold">Player</h2>
          {current ? (
            <div className="mt-3 aspect-video">
              <ReactPlayer url={`${API}/videos/${current}/stream`} controls width="100%" height="100%" />
            </div>
          ) : (
            <p className="text-onyx-text-secondary mt-2">Select a video to play.</p>
          )}
        </div>
      </div>
    </main>
  );
}


