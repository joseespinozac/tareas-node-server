import { DataTypes, HasOneSetAssociationMixin, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario
import User from './user-model.sequelize';
import Task from './task-model.sequelize';

interface CommentAttributes {
    id: number;
    commentText: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: number;
    public commentText!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    declare setOwner: HasOneSetAssociationMixin<User, User['id']>;
    declare setTask: HasOneSetAssociationMixin<Task, Task['id']>;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            field: 'comment_id',
        },
        commentText: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'comment_text',
        },
    },
    {
        tableName: 'comment',
        sequelize: sequelizeConnection,
        updatedAt: 'comment_updated_at',
        createdAt: 'comment_created_at',
    }
);

// Relación: Comentarios pertenecen a un usuario
Comment.belongsTo(User, { foreignKey: 'comment_owner_id', as: 'owner' });
User.hasMany(Comment, { foreignKey: 'comment_owner_id', as: 'comments' });
// Relación: Comentarios pertenecen a una tarea
Comment.belongsTo(Task, { foreignKey: 'comment_task_id', as: 'task' });
Task.hasMany(Comment, { foreignKey: 'comment_task_id', as: 'comments' });
export default Comment;