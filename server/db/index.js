import db from './db';
import chalk from 'chalk';
import './models';

const startDb = db.sync();

startDb.then(function () {
  console.log(chalk.green('Sequelize models synced to PostgreSQL'));
})
.catch(err => console.error(err.stack));

export default startDb;
