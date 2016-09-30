import chalk from 'chalk';
import startDb from './db';
import { createServer } from 'http';
import app from './app';
const server = createServer();

const createApplication = () => server.on('request', app);

const startServer = () => {
    const PORT = process.env.PORT || 1337;

    server.listen(PORT, function() {
      console.log(chalk.blue(`Server started on port ${chalk.magenta(PORT)}`));
    });
};

startDb
  .then(createApplication)
  .then(startServer)
  .catch(function (err) {
      console.error(chalk.red(err.stack));
      process.kill(1);
  });
