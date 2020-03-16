const mysql = require('mysql');
const chalk = require('chalk');



connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Jxrfhbrec24@',
    database: 'team_profiledb',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }

    console.log(chalk.green(`Connected to db. ThreadID: ${connection.threadId}`));
})

module.exports = connection;