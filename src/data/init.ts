import sequelizeConnection from './config';
import { Team } from './models'
import User from './models/user-model.sequelize'

const dbInit = async() => {
    // Disable foreign key checks
    await sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0');

    // Delete all tables
    await Promise.all([
        sequelizeConnection.query('DROP TABLE IF EXISTS teammember'),
        Team.drop(),
        User.drop(),
    ]);

    // Enable foreign key checks
    await sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 1');

    // Sync all models
     Promise.all([
        Team.sync({ alter: true }),
        User.sync({ alter: true }),
        sequelizeConnection.sync(),
    ]);
}

export default dbInit; 