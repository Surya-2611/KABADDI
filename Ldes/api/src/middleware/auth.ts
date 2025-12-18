import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type JwtClaims = { id: string; role: 'TUTOR' | 'STUDENT' };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try {
    const claims = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret') as JwtClaims;
    // @ts-ignore
    req.user = claims;
    next();
  } catch {
    return res.status(401).json({ error: 'invalid_token' });
  }
}

export function requireRole(role: 'TUTOR' | 'STUDENT') {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user as JwtClaims | undefined;
    if (!user) return res.status(401).json({ error: 'unauthorized' });
    if (user.role !== role) return res.status(403).json({ error: 'forbidden' });
    next();
  };
}


