import { Router } from 'express';
import { PrismaClient, SkillCategory, Difficulty } from '@prisma/client';
import { z } from 'zod';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { requireAuth, requireRole } from '../middleware/auth.js';

const prisma = new PrismaClient();
export const router = Router();

const storageRoot = path.resolve(process.cwd(), 'storage');
const upload = multer({ dest: path.join(storageRoot, 'tmp') });

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  skillCategory: z.enum(['AI', 'CYBERSECURITY', 'WEB_DEV', 'DATA_SCIENCE']),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
});

router.post('/', requireAuth, requireRole('TUTOR'), upload.single('file'), async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string };
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);
  if (!req.file) return res.status(400).json({ error: 'file_required' });

  const mime = req.file.mimetype;
  if (!['video/mp4', 'video/quicktime'].includes(mime)) return res.status(400).json({ error: 'invalid_type' });

  const videoId = crypto.randomUUID();
  const tutorDir = path.join(storageRoot, 'videos', user.id, videoId);
  fs.mkdirSync(tutorDir, { recursive: true });
  const ext = mime === 'video/mp4' ? '.mp4' : '.mov';
  const finalPath = path.join(tutorDir, `source${ext}`);
  fs.renameSync(req.file.path, finalPath);

  const sizeBytes = fs.statSync(finalPath).size;
  const checksum = crypto.createHash('sha256').update(fs.readFileSync(finalPath)).digest('hex');

  const { title, description, skillCategory, difficulty } = parsed.data;
  const video = await prisma.video.create({
    data: {
      id: videoId,
      tutorId: user.id,
      title,
      description,
      skillCategory: skillCategory as SkillCategory,
      difficulty: difficulty as Difficulty,
      filePath: finalPath,
      sizeBytes: sizeBytes,
      checksum
    }
  });

  // @ts-ignore
  req.io.emit('video:uploaded', { videoId: video.id, tutorId: user.id });
  res.status(201).json({ id: video.id });
});

// list recent videos (tutor's own)
router.get('/', requireAuth, requireRole('TUTOR'), async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string };
  const items = await prisma.video.findMany({ where: { tutorId: user.id }, orderBy: { createdAt: 'desc' }, take: 20, select: { id: true, title: true, description: true } });
  res.json(items);
});

router.get('/:id/stream', requireAuth, async (req, res) => {
  const video = await prisma.video.findUnique({ where: { id: String(req.params.id) } });
  if (!video) return res.status(404).end();
  const filePath = video.filePath;
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

const assignSchema = z.object({ studentIds: z.array(z.string()), dueAt: z.string().datetime().optional() });
router.post('/:id/assign', requireAuth, requireRole('TUTOR'), async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string };
  const video = await prisma.video.findUnique({ where: { id: String(req.params.id) } });
  if (!video) return res.status(404).end();
  if (video.tutorId !== user.id) return res.status(403).end();
  const parsed = assignSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);

  const { studentIds, dueAt } = parsed.data;
  const created = await prisma.$transaction(studentIds.map((sid) => prisma.videoAssignment.create({
    data: { videoId: video.id, assignedByTutorId: user.id, assignedToStudentId: sid, dueAt: dueAt ? new Date(dueAt) : null }
  })));

  // @ts-ignore
  req.io.emit('video:assigned', { videoId: video.id, studentIds });
  res.json({ ok: true, count: created.length });
});

// list assigned videos for a student
router.get('/students/:id/videos', requireAuth, async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string; role: string };
  const studentId = String(req.params.id);
  if (user.role !== 'TUTOR' && user.id !== studentId) return res.status(403).end();
  const assignments = await prisma.videoAssignment.findMany({
    where: { assignedToStudentId: studentId },
    include: { video: { select: { id: true, title: true, description: true } } },
    orderBy: { assignedAt: 'desc' }
  });
  const videos = assignments.map(a => a.video);
  res.json(videos);
});


