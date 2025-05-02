import { Router } from 'express';
import { exampleAuthMiddleware } from '../middleware/exampleAuth';
import { handleExamplePost } from '../controllers/example.controller';

const router = Router();

router.post('/example/create', exampleAuthMiddleware, handleExamplePost);

export default router;
