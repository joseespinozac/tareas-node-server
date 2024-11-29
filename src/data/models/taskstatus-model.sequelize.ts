import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario

interface TaskStatusAttributes {
    id: number;
    taskStatusLabel: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TaskStatusCreationAttributes extends Optional<TaskStatusAttributes, 'id'> {}

class TaskStatus extends Model<TaskStatusAttributes, TaskStatusCreationAttributes> implements TaskStatusAttributes {
    public id!: number;
    public taskStatusLabel!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TaskStatus.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        taskStatusLabel: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'taskstatus_label',
        },
    },
    {
        tableName: 'taskstatus',
        sequelize: sequelizeConnection,
        updatedAt: 'taskstatus_updated_at',
        createdAt: 'taskstatus_created_at',
    }
);

export default TaskStatus;