import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { Server as SocketIOServer } from 'socket.io';
import pinoHttp from 'pino-http';
import pino from 'pino';
import path from 'path';
import fs from 'fs';

import { router as authRouter } from './routes/auth';
import { router as videoRouter } from './routes/videos';
import { router as assignmentRouter } from './routes/assignments';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000', credentials: true }
});

// Ensure storage and data directories exist
const storageRoot = path.resolve(process.cwd(), 'storage');
for (const dir of ['videos', 'assignments', 'submissions', 'evaluations', 'thumbs', 'tmp']) {
  const full = path.join(storageRoot, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
}
const dataRoot = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataRoot)) fs.mkdirSync(dataRoot, { recursive: true });

app.use(pinoHttp({ logger: logger as any }));
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Attach io to request
app.use((req: Request, _res: Response, next: NextFunction) => {
  // @ts-ignore
  req.io = io;
  next();
});

app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

app.use('/auth', authRouter);
app.use('/videos', videoRouter);
app.use('/', assignmentRouter);

io.on('connection', (socket) => {
  socket.on('join', (room: string) => {
    socket.join(room);
  });
});

const port = Number(process.env.PORT || 4000);
server.listen(port, () => logger.info(`API listening on :${port}`));


