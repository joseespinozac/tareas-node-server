import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario
import User from './user-model.sequelize'; // Modelo User
import Project from './project-model.sequelize'; // Modelo Project

class FavoriteProject extends Model {
    public userId!: string;
    public projectId!: string;
}

FavoriteProject.init(
    {
        userId: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            field: 'user_id',
        },
        projectId: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            field: 'project_id',
        },
    },
    {
        tableName: 'favoriteprojects',
        sequelize: sequelizeConnection,
        timestamps: false,
    }
);

// Relación: Un usuario puede tener muchos proyectos favoritos
User.belongsToMany(Project, { through: FavoriteProject, foreignKey: 'user_id', timestamps: false });

// Relación: Un proyecto puede ser marcado como favorito por muchos usuarios
Project.belongsToMany(User, { through: FavoriteProject, foreignKey: 'project_id', timestamps: false });

export default FavoriteProject;