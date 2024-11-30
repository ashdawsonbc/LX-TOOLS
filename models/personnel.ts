// src/models/personnel.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path if necessary

class Personnel extends Model {
  public id!: number;
  public name!: string;
  public number!: string;
  public email!: string;
  public jobRole!: string;
}

Personnel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobRole: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Personnel',  // Explicitly set the table name here
});

export { Personnel };
