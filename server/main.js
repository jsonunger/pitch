import chalk from 'chalk';
import db from './db';
import { createServer } from 'http';
import buildApp from './app';
const server = createServer();

const createApplication = () => {
  const app = buildApp(db);
  server.on('request', app);
  return null;
};

const startServer = () => {
  const PORT = process.env.PORT || 1337;

  server.listen(PORT, function() {
    console.log(chalk.blue(`Server started on port ${chalk.magenta(PORT)}`));
  });
};

db.sync()
  .then(function() {
    console.log(chalk.green('Sequelize models synced to PostgreSQL'));
    return null;
  })
  .then(createApplication)
  .then(startServer)
  .catch(function(err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
  });
