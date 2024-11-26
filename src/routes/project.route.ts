import { Router } from 'express';
import Project from '../data/models/project-model.sequelize';
import { ResponsePayload } from '.';
import Task from '../data/models/task-model.sequelize';
import { Team } from '../data/models';
import User from '../data/models/user-model.sequelize';

const ProjectsRouter = Router();

ProjectsRouter.post('/', async(req, res) => {
    const newProject = await Project.create(req.body);
    await newProject.setTeam(req.body.teamId);
    res.status(201).json({
        message: 'Project created',
        data: newProject
    });
});

ProjectsRouter.get('/', async(_req, res) => {
    const projectId = parseInt(_req.query.project_id as string);
    const project = await Project.findByPk(projectId,
        {include: [
            {model: Task, as: 'tasks', include: ['status', 'creator', 'assignee']},
            {model: Team, as: 'team', include: ['owner',]} 
        ]}
    );

    const team = await project?.getTeam();

    const members = await team?.getUsers();

    res.status(200).json({
        message: 'Project found',
        data: {
            ...project?.toJSON(),
            members: members
            
        }
    } as ResponsePayload);
    
})

export default ProjectsRouter;