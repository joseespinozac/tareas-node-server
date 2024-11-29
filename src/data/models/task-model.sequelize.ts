import { DataTypes, HasManyGetAssociationsMixin, HasOneSetAssociationMixin, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import Project from './project-model.sequelize';
import User from './user-model.sequelize';
import TaskStatus from './taskstatus-model.sequelize';
import Comment from './comments-model.sequelize';

interface TaskAttributes {
    id: number;
    name: string;
    description: string;
    beginDate: string;
    endDate: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public beginDate!: string;
    public endDate!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    declare setCreator: HasOneSetAssociationMixin<User, User['id']>;
    declare setAssignee: HasOneSetAssociationMixin<User, User['id']>;
    declare setProject: HasOneSetAssociationMixin<Project, Project['id']>;
    declare setStatus: HasOneSetAssociationMixin<TaskStatus, TaskStatus['id']>;
    declare getComments: HasManyGetAssociationsMixin<Comment>;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            field: 'task_id',
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'task_name',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'task_description',
        },
        beginDate: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'task_begin_date',
        },
        endDate: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'task_end_date',
        },
    },
    {
        tableName: 'task',
        sequelize: sequelizeConnection,
        updatedAt: 'task_updated_at',
        createdAt: 'task_created_at',
    }
);

// Relación: Un proyecto pertenece a un equipo
Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project', onDelete: 'CASCADE' });
Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks', onDelete: 'CASCADE' });

Task.belongsTo(User, { foreignKey: 'creator_id', as: 'creator', onDelete: 'CASCADE' });
User.hasMany(Task, { foreignKey: 'creator_id', as: 'created_tasks', onDelete: 'CASCADE' });

Task.belongsTo(User, { foreignKey: 'assignee_id', as: 'assignee', onDelete: 'CASCADE' });
User.hasMany(Task, { foreignKey: 'assignee_id', as: 'assigned_tasks', onDelete: 'CASCADE' });

Task.belongsTo(TaskStatus, { foreignKey: 'task_status_id', as: 'status', onDelete: 'CASCADE' });
TaskStatus.hasOne(Task, { foreignKey: 'task_status_id', as: 'task', onDelete: 'CASCADE' });
export default Task;
