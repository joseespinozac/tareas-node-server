import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, HasManyGetAssociationsMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Adjust the path as necessary
import User, { UserCreationAttributes } from './user-model.sequelize';
import Project from './project-model.sequelize';

export interface TeamAttributes {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    declare getUsers: BelongsToManyGetAssociationsMixin<User>;
    declare setUsers: BelongsToManySetAssociationsMixin<User, User['id']>;
    declare addUsers: BelongsToManyAddAssociationsMixin<User, User['id']>;
    declare addUser: BelongsToManyAddAssociationMixin<User, User['id']>
    declare createUser: BelongsToManyCreateAssociationMixin<User>;
    declare removeUser: BelongsToManyRemoveAssociationMixin<User, User['id']>;
    declare removeUsers: BelongsToManyRemoveAssociationsMixin<User, User['id']>;
    declare hasUser: BelongsToManyHasAssociationMixin<User, User['id']>;
    declare hasUsers: BelongsToManyHasAssociationsMixin<User, User['id']>;
    declare countUsers: BelongsToManyCountAssociationsMixin;

    declare getOwner: HasOneGetAssociationMixin<User>;
    declare setOwner: HasOneSetAssociationMixin<User, User['id']>;

    declare getProjects: HasManyGetAssociationsMixin<Project>;
    
    // setComments: Sequelize.HasManySetAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // addComments: Sequelize.HasManyAddAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // addComment: Sequelize.HasManyAddAssociationMixin<CommentInstance, CommentInstance['id']>;
    // createComment: Sequelize.HasManyCreateAssociationMixin<CommentAttributes, CommentInstance>;
    // removeComment: Sequelize.HasManyRemoveAssociationMixin<CommentInstance, CommentInstance['id']>;
    // removeComments: Sequelize.HasManyRemoveAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // hasComment: Sequelize.HasManyHasAssociationMixin<CommentInstance, CommentInstance['id']>;
    // hasComments: Sequelize.HasManyHasAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // countComments: Sequelize.HasManyCountAssociationsMixin;
}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: 'team_id',
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'team_name', 
        },
        description: {
            type: new DataTypes.TEXT(),
            allowNull: false,
            field: 'team_description', 
        },
    },
    {
        tableName: 'team',
        updatedAt: 'team_updated_at',
        createdAt: 'team_created_at',
        sequelize: sequelizeConnection
    }
);

// This way owner_id will be added to the Team table, 
// and you can include the owner when querying the Team model
Team.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });
User.hasMany(Team, { as: 'ownerTeam', foreignKey: 'owner_id' });


Team.hasMany(Project, { foreignKey: 'project_team_id', as: 'projects' });
Project.belongsTo(Team, { foreignKey: 'project_team_id', as: 'team' });

export default Team;