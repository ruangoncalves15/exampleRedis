import { Request, Response, NextFunction } from 'express';

export function exampleAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['x-api-key'];

    if (token !== '123456') {
        res.status(403).json({ error: 'Acesso negado' });
        return;
    }

    next();
}
