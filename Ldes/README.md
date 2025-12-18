# Learning Path Dashboard for Enhancing Skills

An AI-powered education platform with tutor and student roles, local-first storage, secure auth, video uploads/streaming, AI-assisted assignments with instant evaluation, learning paths, and analytics.

## Monorepo layout
- `api/` Node.js + Express API (SQLite via Prisma, file uploads, Socket.IO)
- `web/` Next.js frontend (Deep Onyx Rouge theme)
- `storage/` Local files (videos, assignments, submissions, evaluations)
- `data/` SQLite database file

## Quick start

### Prerequisites
- Node.js 20+
- FFmpeg (optional for thumbnails/transcoding)

### Backend (API)
```bash
cd api
npm install
npx prisma generate
npx prisma migrate dev --name init
# Windows PowerShell
$env:JWT_SECRET = "change_me"
$env:FRONTEND_ORIGIN = "http://localhost:3000"
# optional
$env:PORT = "4000"
npm run dev
```
API runs at `http://localhost:4000`.

### Frontend (Web)
```bash
cd web
npm install
# Windows PowerShell
$env:NEXT_PUBLIC_API_URL = "http://localhost:4000"
$env:NEXT_PUBLIC_API_WS_URL = "http://localhost:4000"
npm run dev
```
Web runs at `http://localhost:3000`.

## Features implemented (MVP)
- Auth: signup/login, JWT httpOnly cookie, RBAC (tutor/student)
- Videos: tutor uploads MP4/MOV; stream with Range support; assign to students
- Assignments: create, assign, student submit; AI evaluation stub with realtime updates; tutor override endpoint
- Realtime: Socket.IO events for uploads, assignments, evaluations
- Frontend: role-based login and signup pages; tutor upload UI; student dashboard with assigned videos and player

## Theme (Deep Onyx Rouge)
- Backgrounds: `#0B0F14`, `#121824`, `#161C26`
- Text: `#EAECEF` primary, `#A9B1BD` secondary
- Accent: Rouge `#C23B50` → `#E1526D` subtle gradient on buttons/cards

## Scripts
- API: `npm run dev`, `npm run build`, `npm start`, `npm run migrate`
- Web: `npm run dev`, `npm run build`, `npm start`

## Storage
- `storage/videos/{tutorId}/{videoId}/source.mp4|mov`
- `storage/assignments/{assignmentId}/prompt.md`
- `storage/submissions/{submissionId}/answer.txt`
- `storage/evaluations/{evaluationId}/report.json` (reserved)

## Next steps
- Tutor UI to assign videos to students and compose assignments
- Student assignments UI with submission and feedback view
- AI chatbot panels and analytics dashboards
- Learning paths with badges and certificates
