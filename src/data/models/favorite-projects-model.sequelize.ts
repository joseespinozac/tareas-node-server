import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario
import User from './user-model.sequelize'; // Modelo User
import Project from './project-model.sequelize'; // Modelo Project


interface FavoriteProjectAttributes {
    userId: number;
    projectId: number;
}

interface FavoriteProjectCreationAttributes extends FavoriteProjectAttributes {}

class FavoriteProject extends Model<FavoriteProjectAttributes, FavoriteProjectCreationAttributes> implements FavoriteProjectAttributes {
    public userId!: number;
    public projectId!: number;
}

FavoriteProject.init(
    {
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            field: 'user_id',
        },
        projectId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            field: 'project_id',
        },
    },
    {
        tableName: 'favorite_project',
        sequelize: sequelizeConnection,
        updatedAt: 'favorite_project_updated_at',
        createdAt: 'favorite_project_created_at',
    }
);

// Relación: Un usuario puede tener muchos proyectos favoritos
User.belongsToMany(Project, { through: FavoriteProject, foreignKey: 'user_id'});

// Relación: Un proyecto puede ser marcado como favorito por muchos usuarios
Project.belongsToMany(User, { through: FavoriteProject, foreignKey: 'project_id'});

export default FavoriteProject;
