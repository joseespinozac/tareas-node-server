import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Ajusta la ruta según sea necesario

interface RoleAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: 'role_id',
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'role_name',
        },
    },
    {
        tableName: 'role',
        sequelize: sequelizeConnection,
        updatedAt: 'role_updated_at',
        createdAt: 'role_created_at',
    }
);

export default Role;