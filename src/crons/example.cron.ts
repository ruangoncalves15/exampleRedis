import cron from 'node-cron';
import { exampleQueue } from '../configs/bull.config';
import { env } from '../configs/envs.config';

export async function scheduleJobOnce(): Promise<void> {
    await exampleQueue.add('example-task', { timestamp: Date.now() });
}

cron.schedule(env.EXAMPLE_CRON, async () => {
    console.log('[CRON] Agendando job para exampleQueue');
    await scheduleJobOnce();
});




