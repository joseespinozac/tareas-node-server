import { Router, Request, Response } from 'express';
import { Team } from '../data/models';
import { TeamCreationAttributes } from '../data/models/team-model.sequelize';
import User from '../data/models/user-model.sequelize';
import { ResponsePayload } from '.';
import { Op } from 'sequelize';
import sequelizeConnection from '../data/config';
const TeamsRouter = Router();

TeamsRouter.post('/', async(req, res) => {

    console.log(req.body);

    const newTeam = await Team.create(req.body);

    const membersId = req.body.membersId as number[];
    const ownerId = req.body.ownerId as number;

    if (membersId && membersId.length > 0) {
        await newTeam.addUsers(membersId);     
    }

    if(ownerId) {
        await newTeam.setOwner(ownerId);
    }

    res.status(201).json({
        message: 'Team created',
        data: newTeam
    } as ResponsePayload);
    
});

TeamsRouter.get('/owned', async(_req, res) => {
    const user = await User.findByPk(_req.query.owner_id as string);
    const teams = await user?.getOwnerTeam({
        include: [
            { model: User }, 'owner', 'projects']
    });
    res.status(200).json(
        {
            message: 'Teams owned by user found',
            data: teams
        } as ResponsePayload
    );
});

TeamsRouter.get('/collab' , async(req, res) => {
    const user = await User.findByPk(req.query.user_id as string);

    console.log(req.query.user_id);
    
    const teams = await user?.getTeams({
        include: [User, 'owner', 'projects'],
        where: {
            owner_id: {
                [Op.ne]: user?.id
            }
        }
    });
    res.status(200).json(
        {
            message: 'Teams where user is assigned found',
            data: teams
        } as ResponsePayload
    );
})

TeamsRouter.put('/', async(req: Request, res: Response) => {

    const team_id = parseInt(req.query.team_id as string);
    const team = await Team.findByPk(team_id);
    if(!team) {
        res.status(404).json({ message: 'Team not found' });
        return
    }        

    try {
        if(req.body.membersId) {
            await team.setUsers(req.body.membersId);
        }

        await team.update(req.body);
    } catch (error) {
    
    }

    res.status(200).json({ message: 'Team updated', data: team } as ResponsePayload);
})

TeamsRouter.delete('/', async(req, res) => {
    const team_id: number[] = (req.query.team_id! as string).split(',').map(Number);

    for (const id of team_id) {
        const team = await Team.findByPk(id);
        if(!team) {
            res.status(404).json({ message: 'Team not found' });
            return
        }

        await team.destroy();
    }

    res.status(200).json({ message: 'Team deleted' } as ResponsePayload);
});

export default TeamsRouter;