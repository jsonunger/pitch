'use strict';
var chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// sequelize syncing its models to the postgreSQL database.
var startDb = require('./db');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    server.on('request', app);
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;
    var IP = process.env.IP || 'localhost';

    server.listen(PORT, IP, function () {
        console.log(chalk.blue(`Server started at ${chalk.magenta(`http://${IP}:${PORT}`)}`));
    });

};

startDb
.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
