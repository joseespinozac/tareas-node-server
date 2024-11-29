import { DataTypes, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario
import Team from './team-model.sequelize'; // Modelo Team

interface ProjectAttributes {
    id: number;
    projectName: string;
    projectBeginDate: string;
    projectEndDate: string;
    projectDescription: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
    public id!: number;
    public projectName!: string;
    public projectBeginDate!: string;
    public projectEndDate!: string;
    public projectDescription!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    declare setTeam: HasOneSetAssociationMixin<Team, Team['id']>;
    declare getTeam: HasOneGetAssociationMixin<Team>;
}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            field: 'project_id',
            autoIncrement: true,
        },
        projectName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'project_name',
        },
        projectBeginDate: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'project_begin_date',
        },
        projectEndDate: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'project_end_date',
        },
        projectDescription: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: 'project_description',
        },
    },
    {
        tableName: 'projects',
        sequelize: sequelizeConnection,
        updatedAt: 'project_updated_at',
        createdAt: 'project_created_at',
    }
);

// Relación: Un proyecto pertenece a un equipo


export default Project;

// Team.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });
// User.hasOne(Team, { as: 'ownerTeam', foreignKey: 'owner_id' });