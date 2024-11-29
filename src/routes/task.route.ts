import {Router} from 'express';
import Task from '../data/models/task-model.sequelize';
import Comment from '../data/models/comments-model.sequelize';

const TaskRouter = Router();

TaskRouter.post('/', async(req, res) => {

    const newTask = await Task.create(req.body);
    await newTask.setCreator(req.body.creatorId);
    await newTask.setAssignee(req.body.assignedId);
    await newTask.setProject(req.body.projectId);
    await newTask.setStatus(1);
    

    res.status(201).json({
        message: 'Task created',
        data: newTask
    });
})

TaskRouter.put('/', async(req, res) => {
    const task_id = parseInt(req.query.taskId as string);
    const task = await Task.findByPk(task_id);
    if(req.body.assignedId) {
        await task?.setAssignee(req.body.assignedId);
    }

    if(req.body.statusId) {
        await task?.setStatus(req.body.statusId);
    }

    await task?.update(req.body);
    res.status(200).json({
        message: 'Task updated',
        data: task
    });
})

TaskRouter.delete('/', async(req, res) => {
    const task_id = parseInt(req.query.taskId as string);
    const task = await Task.findByPk(task_id);
    if(task) {
        await task.destroy();
        res.status(200).json({
            message: 'Task deleted',
            data: task
        });
    }
    
    
})


TaskRouter.post('/comment', async(req, res) => {

    const body = req.body;

    const task = await Task.findByPk(body.taskId);
    if(task) {
        const comment = await Comment.create(body);
        comment.setOwner(body.ownerId);
        comment.setTask(body.taskId);
        res.status(201).json({
            message: 'Comment created',
            data: comment
        });
    }
})

TaskRouter.get('/comments', async(req, res) => {
    const task_id = parseInt(req.query.taskId as string);
    const task = await Task.findByPk(task_id);
    if(task) {
        const comments = await task.getComments({
            include: ['owner']
        });
        res.status(200).json({
            message: 'Comments found',
            data: comments
        });
    }
})

export default TaskRouter;