import { Request, Response, NextFunction } from 'express';
import { getSession } from 'next-auth/react';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  (req as any).user = session.user;
  next();
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user && (req as any).user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};