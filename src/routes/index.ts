import { Router } from 'express';
import exampleRoute from './example.route';

const router = Router();

router.use('/filas', exampleRoute);

export default router;
