
import express, { Application, Request, Response, NextFunction } from 'express';
import routes from '../src/routes';
import { serverAdapter } from '../src/configs/bull-dashboard';
import './server';
import '../src/workers/example.worker';
import '../src/crons/example.cron';


const app: Application = express();

app.use(express.json());
app.use(routes);
app.use('/admin/queues', serverAdapter.getRouter());

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

export default app;

