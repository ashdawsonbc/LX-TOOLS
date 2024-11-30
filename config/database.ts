import { Sequelize } from 'sequelize-typescript';
import { Personnel } from '../models/personnel';  // Import the model (which we will create)

const sequelize = new Sequelize({
  database: 'your_database',
  username: 'your_username',
  password: 'your_password',
  dialect: 'mysql', // Use 'postgres' for PostgreSQL
  host: 'localhost',
  models: [Personnel],  // This will link your models to Sequelize
});

export default sequelize;
