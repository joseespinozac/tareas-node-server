import { Router } from 'express';
import User from '../data/models/user-model.sequelize';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../middleware/auth.middleware';

const UsersRouter = Router();

UsersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

    if (user && (password === user.password)) {
        const token = jwt.sign({ 
                id: user.id, 
                email: user.email, 
                username: user.username, 
                firstname: user.firstname, 
                lastname: user.lastname 
            }, 
            secret, 
            { expiresIn: '1h' });

        res.json({ token: token, user: {
            id: user.id, 
            email: user.email, 
            username: user.username, 
            firstname: user.firstname, 
            lastname: user.lastname 
        } });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
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