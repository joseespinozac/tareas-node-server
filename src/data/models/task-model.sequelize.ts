import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario
import Team from './team-model.sequelize'; // Modelo Team

interface ProjectAttributes {
    id: string;
    projectName: string;
    projectBeginDate: string;
    projectEndDate: string;
    projectAssignedTeamId: string; // FK de Teams
    projectDescription: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
    public id!: string;
    public projectName!: string;
    public projectBeginDate!: string;
    public projectEndDate!: string;
    public projectAssignedTeamId!: string;
    public projectDescription!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Project.init(
    {
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            field: 'id',
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
        projectAssignedTeamId: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'project_assigned_team_id',
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
Project.belongsTo(Team, { foreignKey: 'projectAssignedTeamId', as: 'assignedTeam' });

export default Project;
