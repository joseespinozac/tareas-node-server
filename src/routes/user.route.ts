import { Router } from 'express';
import User from '../data/models/user-model.sequelize';
import { Op } from 'sequelize';

const UsersRouter = Router();

UsersRouter.get('/', (_req, res) => {
    res.status(200).send({ message: 'GET request to the homepage' });
});

UsersRouter.get('/:search', (req, res) => {
    User.findAll({
        where: {
            username: {
                [Op.like]: `%${req.params.search}%` 
            }
        }
    }).then(users => {
        res.status(200).send(users);
    });
});

export default UsersRouter;