import chalk from 'chalk';
import Sequelize from 'sequelize';
import { DATABASE_URI } from '../env';

console.log(chalk.yellow('Opening connection to PostgreSQL'));

const db = new Sequelize(DATABASE_URI, {
  logging: false
});

export default db;
