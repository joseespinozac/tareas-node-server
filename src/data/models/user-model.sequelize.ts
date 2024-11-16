import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import Team from './team-model.sequelize';
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstname: string,
    lastname: string,
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public firstname!: string;
    public lastname!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: 'user_id',
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: 'user_username',
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: 'user_email',
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'user_password',
        },
        firstname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'user_firstname',
        },
        lastname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'user_lastname',
        },
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection, // passing the `sequelize` instance is required
        updatedAt: 'user_updated_at',
        createdAt: 'user_created_at',
    }
);

User.belongsToMany(Team, { through: 'teammember', foreignKey: 'user_id', timestamps: false });
Team.belongsToMany(User, { through: 'teammember', foreignKey: 'team_id', timestamps: false }); 

export default User;