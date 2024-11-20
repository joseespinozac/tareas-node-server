import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario
import User from './user-model.sequelize';
import Task from './team-model.sequelize';

interface CommentAttributes {
    id: string;
    commentOwnerId: string; // FK de User
    commentText: string;
    commentTaskId: string; // FK de Task
    createdAt?: Date;
    updatedAt?: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: string;
    public commentOwnerId!: string;
    public commentText!: string;
    public commentTaskId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init(
    {
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            field: 'id',
        },
        commentOwnerId: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'comment_owner_id',
        },
        commentText: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'comment_text',
        },
        commentTaskId: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'comment_task_id',
        },
    },
    {
        tableName: 'comments',
        sequelize: sequelizeConnection,
        updatedAt: 'comment_updated_at',
        createdAt: 'comment_created_at',
    }
);

// Relación: Comentarios pertenecen a un usuario
Comment.belongsTo(User, { foreignKey: 'commentOwnerId', as: 'owner' });

// Relación: Comentarios pertenecen a una tarea
Comment.belongsTo(Task, { foreignKey: 'commentTaskId', as: 'task' });

export default Comment;