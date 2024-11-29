import { Router } from 'express';

import TeamsRouter from './team.route';
import UsersRouter from './user.route';
import ProjectsRouter from './project.route';
import TaskRouter from './task.route';
import { authenticateJWT } from '../middleware/auth.middleware';

export interface ResponsePayload {
    message: string;
    data: any;
}

const router = Router();
router.use('/users', UsersRouter); // Login route does not need authentication
router.use('/teams', authenticateJWT, TeamsRouter);
router.use('/projects', authenticateJWT, ProjectsRouter);
router.use('/tasks', authenticateJWT, TaskRouter);

export default router;
