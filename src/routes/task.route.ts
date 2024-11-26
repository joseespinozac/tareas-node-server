import {Router} from 'express';
import Task from '../data/models/task-model.sequelize';

const TaskRouter = Router();

TaskRouter.post('/', async(req, res) => {

    const newTask = await Task.create(req.body);
    newTask.setCreator(req.body.creatorId);
    newTask.setAssignee(req.body.assignedId);
    newTask.setProject(req.body.projectId);
    newTask.setStatus("1");
    

    res.status(201).json({
        message: 'Task created',
        data: req.body
    });
})

TaskRouter.put('/', async(req, res) => {
    const task_id = parseInt(req.query.taskId as string);
    const task = await Task.findByPk(task_id);
    if(req.body.assignedId) {
        task?.setAssignee(req.body.assignedId);
    }

    if(req.body.statusId) {
        task?.setStatus(req.body.statusId);
    }

    task?.update(req.body);
})

export default TaskRouter;