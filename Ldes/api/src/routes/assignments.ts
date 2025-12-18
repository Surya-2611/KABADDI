import { Router } from 'express';
import { PrismaClient, SkillCategory, Difficulty, Status } from '@prisma/client';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { requireAuth, requireRole } from '../middleware/auth.js';

const prisma = new PrismaClient();
export const router = Router();

const storageRoot = path.resolve(process.cwd(), 'storage');

const createSchema = z.object({
  title: z.string().min(1),
  promptText: z.string().min(1),
  skillCategory: z.enum(['AI', 'CYBERSECURITY', 'WEB_DEV', 'DATA_SCIENCE']),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  rubric: z.record(z.string(), z.number().min(0).max(1)).optional()
});

router.post('/assignments', requireAuth, requireRole('TUTOR'), async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string };
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);
  const { title, promptText, skillCategory, difficulty, rubric } = parsed.data;

  const assignmentId = crypto.randomUUID();
  const dir = path.join(storageRoot, 'assignments', assignmentId);
  fs.mkdirSync(dir, { recursive: true });
  const promptPath = path.join(dir, 'prompt.md');
  fs.writeFileSync(promptPath, promptText, 'utf-8');
  const rubricJson = JSON.stringify(rubric || { clarity: 0.3, accuracy: 0.4, completeness: 0.3 });

  const created = await prisma.assignment.create({
    data: {
      id: assignmentId,
      tutorId: user.id,
      title,
      promptPath,
      skillCategory: skillCategory as SkillCategory,
      difficulty: difficulty as Difficulty,
      rubricJson
    }
  });

  // @ts-ignore
  req.io.emit('assignment:created', { assignmentId: created.id });
  res.status(201).json({ id: created.id });
});

const assignSchema = z.object({ studentIds: z.array(z.string()), dueAt: z.string().datetime().optional() });
router.post('/assignments/:id/assign', requireAuth, requireRole('TUTOR'), async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string };
  const assignment = await prisma.assignment.findUnique({ where: { id: String(req.params.id) } });
  if (!assignment) return res.status(404).end();
  if (assignment.tutorId !== user.id) return res.status(403).end();
  const parsed = assignSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);
  const { studentIds, dueAt } = parsed.data;

  const created = await prisma.$transaction(studentIds.map((sid) => prisma.assignmentTarget.create({
    data: { assignmentId: assignment.id, assignedToStudentId: sid, dueAt: dueAt ? new Date(dueAt) : null }
  })));

  res.json({ ok: true, count: created.length });
});

const submissionSchema = z.object({ answerText: z.string().min(1), notes: z.string().optional() });

router.post('/assignment-targets/:id/submissions', requireAuth, requireRole('STUDENT'), async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string };
  const target = await prisma.assignmentTarget.findUnique({ where: { id: String(req.params.id) } });
  if (!target) return res.status(404).end();
  if (target.assignedToStudentId !== user.id) return res.status(403).end();
  const parsed = submissionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);
  const { answerText, notes } = parsed.data;

  const submissionId = crypto.randomUUID();
  const dir = path.join(storageRoot, 'submissions', submissionId);
  fs.mkdirSync(dir, { recursive: true });
  const answerPath = path.join(dir, 'answer.txt');
  fs.writeFileSync(answerPath, answerText, 'utf-8');

  const submission = await prisma.submission.create({
    data: { id: submissionId, assignmentTargetId: target.id, studentId: user.id, answerPath, notes }
  });

  // trigger AI evaluation stub
  setTimeout(async () => {
    const score = Math.min(100, Math.max(50, Math.round(answerText.length % 100)));
    const evaluation = await prisma.aIEvaluation.create({
      data: {
        submissionId: submission.id,
        score,
        rubricBreakdownJson: JSON.stringify({ clarity: score * 0.3, accuracy: score * 0.4, completeness: score * 0.3 }),
        feedbackText: 'Automated feedback: consider adding more details to your explanation.',
        modelName: 'stub-model',
        latencyMs: 1000
      }
    });
    await prisma.assignmentTarget.update({ where: { id: target.id }, data: { status: 'EVALUATED' as Status } });
    // @ts-ignore
    req.io.emit('evaluation:ready', { submissionId: submission.id, evaluationId: evaluation.id });
  }, 500);

  res.status(201).json({ id: submission.id });
});

const overrideSchema = z.object({ score: z.number().min(0).max(100), feedbackText: z.string().min(1) });
router.post('/evaluations/:id/override', requireAuth, requireRole('TUTOR'), async (req, res) => {
  // @ts-ignore
  const user = req.user as { id: string };
  const evaluation = await prisma.aIEvaluation.findUnique({ where: { id: String(req.params.id) } });
  if (!evaluation) return res.status(404).end();
  const parsed = overrideSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);
  const { score, feedbackText } = parsed.data;
  const updated = await prisma.aIEvaluation.update({ where: { id: evaluation.id }, data: { score, feedbackText, isOverridden: true, overriddenByTutorId: user.id } });
  // @ts-ignore
  req.io.emit('evaluation:overridden', { evaluationId: updated.id });
  res.json({ ok: true });
});

router.get('/students/:id/assignments', requireAuth, async (req, res) => {
  // students can see own only
  // @ts-ignore
  const user = req.user as { id: string; role: string };
  const studentId = String(req.params.id);
  if (user.role !== 'TUTOR' && user.id !== studentId) return res.status(403).end();
  const targets = await prisma.assignmentTarget.findMany({ where: { assignedToStudentId: studentId }, include: { assignment: true } });
  res.json(targets);
});


