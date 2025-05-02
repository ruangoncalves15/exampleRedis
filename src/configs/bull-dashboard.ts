// src/configs/bull-dashboard.ts
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { exampleQueue } from './bull.config';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
    queues: [new (require('@bull-board/api/bullAdapter').BullAdapter)(exampleQueue)],
    serverAdapter,
});

export { serverAdapter };
