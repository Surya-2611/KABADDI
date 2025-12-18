import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth.js';

const prisma = new PrismaClient();
export const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['TUTOR', 'STUDENT']),
  name: z.string().min(1)
});

router.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);
  const { email, password, role, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'email_exists' });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, passwordHash, role: role as Role, name } });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '2h' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });
  res.status(201).json({ id: user.id, email: user.email, role: user.role, redirect: user.role === 'TUTOR' ? '/tutor' : '/student' });
});

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json(parsed.error);
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'invalid_credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '2h' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });
  res.json({ id: user.id, email: user.email, role: user.role, redirect: user.role === 'TUTOR' ? '/tutor' : '/student' });
});

router.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

router.get('/me', requireAuth, async (req, res) => {
  // @ts-ignore
  const { id } = req.user as { id: string };
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, role: true, name: true } });
  res.json(user);
});


