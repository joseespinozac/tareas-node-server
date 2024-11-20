import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import User from './user-model.sequelize';
import Team from './team-model.sequelize';

// Define the attributes for the TeamMember model
interface TeamMemberAttributes {
    user_id: number;
    team_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the creation attributes for the TeamMember model
interface TeamMemberCreationAttributes extends TeamMemberAttributes {}

// Define the TeamMember model class
class TeamMember extends Model<TeamMemberAttributes, TeamMemberCreationAttributes> implements TeamMemberAttributes {
    public user_id!: number;
    public team_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TeamMember.init(
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: User,
                key: 'user_id',
            }
        },
        team_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: Team,
                key: 'team_id',
            }
        },
    },
    {
        sequelize: sequelizeConnection, // This should be replaced with your actual Sequelize instance
        tableName: 'team_member',
        updatedAt: 'team_member_updated_at',
        createdAt: 'team_member_created_at',
    }
);

User.belongsToMany(Team, { through: TeamMember, foreignKey: 'team_id', foreignKeyConstraint: true });
Team.belongsToMany(User, { through: TeamMember, foreignKey: 'user_id', foreignKeyConstraint: true }); 

export default TeamMember;
