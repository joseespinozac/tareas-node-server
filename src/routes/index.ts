import { Router } from 'express';
import TeamsRouter from './team.route';
import UsersRouter from './user.route';
import ProjectsRouter from './project.route';
import TaskRouter from './task.route';


export interface ResponsePayload {
    message: string;
    data: any;
}

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/users', UsersRouter)
router.use('/projects', ProjectsRouter);
router.use('/tasks', TaskRouter)

export default router;
