import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config'; // Adjust the path as necessary

interface TeamAttributes {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: 'team_id',
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'team_name', 
        },
        description: {
            type: new DataTypes.TEXT(),
            allowNull: false,
            field: 'team_description', 
        },
    },
    {
        tableName: 'team',
        updatedAt: 'team_updated_at',
        createdAt: 'team_created_at',
        sequelize: sequelizeConnection
    }
);

export default Team;