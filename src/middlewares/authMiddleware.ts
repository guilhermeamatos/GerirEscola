// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, 'your_jwt_secret_key') as JwtPayload;

    //req.body.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
