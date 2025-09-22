import { Request, Response, NextFunction } from 'express';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized - Invalid token' });
    }

    try {
      const decoded = jwt.verify(token, config.nextAuthSecret!);
      (req as any).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized - Invalid token' });
    }
  } else {
    const token = await getToken({ req, secret: config.nextAuthSecret });

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    (req as any).user = token;
    next();
  }
};

export const protectBearer = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized - Bearer token required' });
  }

  const userId = authHeader.split(' ')[1];
  if (!userId) {
    return res.status(401).json({ message: 'Not authorized - Invalid token' });
  }

  (req as any).userId = userId;
  next();
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user && (req as any).user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};