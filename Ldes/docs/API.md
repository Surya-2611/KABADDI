# API Reference

Base URL: `http://localhost:4000`

All responses are JSON. Authenticated endpoints require the JWT httpOnly cookie set by the login/signup endpoints.

## Auth
- POST `/auth/signup`
  - body: `{ email, password, role: 'TUTOR'|'STUDENT', name }`
  - 201 → `{ id, email, role, redirect }`
- POST `/auth/login`
  - body: `{ email, password }`
  - 200 → `{ id, email, role, redirect }`
- POST `/auth/logout`
  - 200 → `{ ok: true }`
- GET `/auth/me`
  - 200 → `{ id, email, role, name }`

## Videos
- POST `/videos` (Tutor)
  - multipart form fields: `file`, `title`, `description`, `skillCategory`, `difficulty`
  - 201 → `{ id }`
- GET `/videos` (Tutor)
  - 200 → `[{ id, title, description }]`
- POST `/videos/:id/assign` (Tutor)
  - body: `{ studentIds: string[], dueAt?: ISOString }`
  - 200 → `{ ok: true, count }`
- GET `/videos/:id/stream`
  - Streams video content with Range support
- GET `/videos/students/:id/videos`
  - 200 → `[{ id, title, description }]` (assigned to student)

## Assignments
- POST `/assignments` (Tutor)
  - body: `{ title, promptText, skillCategory, difficulty, rubric? }`
  - 201 → `{ id }`
- POST `/assignments/:id/assign` (Tutor)
  - body: `{ studentIds: string[], dueAt?: ISOString }`
  - 200 → `{ ok: true, count }`
- POST `/assignment-targets/:id/submissions` (Student)
  - body: `{ answerText, notes? }`
  - 201 → `{ id }`
- POST `/evaluations/:id/override` (Tutor)
  - body: `{ score, feedbackText }`
  - 200 → `{ ok: true }`
- GET `/students/:id/assignments`
  - 200 → targets with embedded `assignment`

## Realtime (Socket.IO events)
- `video:uploaded` `{ videoId, tutorId }`
- `video:assigned` `{ videoId, studentIds }`
- `evaluation:ready` `{ submissionId, evaluationId }`
- `evaluation:overridden` `{ evaluationId }`

## Status codes
- 2xx success, 4xx validation/authorization errors, 5xx server errors
