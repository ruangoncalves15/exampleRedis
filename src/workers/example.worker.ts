import { exampleQueue } from '../configs/bull.config';

exampleQueue.process(async (job) => {
    console.log('Processando job:', job.data);
    return "COMPLETED"
});

exampleQueue.process('example-task', async (job) => {
    console.log('Processando job [example-task]:', job.data);
    return;
});

exampleQueue.on('completed', (job) => {
    console.log(`Job ${job.id} completed!`);
});