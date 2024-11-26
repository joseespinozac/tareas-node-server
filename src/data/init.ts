import sequelizeConnection from './config';
import { Team } from './models'
import Comment from './models/comments-model.sequelize';
import FavoriteProject from './models/favorite-projects-model.sequelize';
import Project from './models/project-model.sequelize';
import Task from './models/task-model.sequelize';
import TaskStatus from './models/taskstatus-model.sequelize';
import TeamMember from './models/team-member-model.sequelize';
import User, { UserCreationAttributes } from './models/user-model.sequelize'
import Role from './models/user-role-model.sequelize';

const dbInit = async() => {

    // Sync all models
        
    await Role.sync(),
    await User.sync(),
    await Team.sync(),
    await Project.sync(),
    await TeamMember.sync(),
    await FavoriteProject.sync(),
    await TaskStatus.sync(),
    await Task.sync(),
    
    await Comment.sync(),
    
    await sequelizeConnection.sync(),

    (() => {
        const initialUsers: UserCreationAttributes[] = [
            {
                username: 'user01',
                email: 'user01@hotmail.com',
                password: 'password',
                firstname: 'firstname01',
                lastname: 'lastname01',
            },
            {
                username: 'user02',
                email: 'user02@hotmail.com',
                password: 'password',
                firstname: 'firstname02',
                lastname: 'lastname02',
            },
            {
                username: 'user03',
                email: 'user03@hotmail.com',
                password: 'password',
                firstname: 'firstname03',
                lastname: 'lastname03',
            },
            {
                username: 'user04',
                email: 'user04@hotmail.com',
                password: 'password',
                firstname: 'firstname04',
                lastname: 'lastname04',
            }
        ];
      
        User.bulkCreate(initialUsers, { ignoreDuplicates: true });
      })();
}



export default dbInit; 