const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');
const connection = require('./config/connection')
const startScreen = ['View all Employees', 'View all Employees by Department', 'View all Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department', 'Exit']
const allEmployeeQuery = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
FROM employee e
LEFT JOIN role r 
ON r.id = e.role_id 
LEFT JOIN department d 
ON d.id = r.department_id
LEFT JOIN employee m ON m.id = e.manager_id
ORDER BY e.id;`
const addEmployeeQuestions = ['What is the first name?', 'What is the last name?', 'What is their role?', 'Who is their manager?']
// const roleQuery = 'SELECT * from role; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN role r ON r.id = e.role_id INNER JOIN department d ON d.id = r.department_id WHERE department_name = "Management"'
const roleQuery = 'SELECT * from role; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employee e'
//const mgrQuery = 'SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employee e INNER JOIN role r ON r.id = e.role_id INNER JOIN department d ON d.id = r.department_id WHERE department_name = "CEO";'




const startApp = () => {
    inquirer.prompt({
        name: 'menuChoice',
        type: 'list',
        message: 'Select an option',
        choices: startScreen

    }).then((answer) => {
        switch (answer.menuChoice) {
            case 'View all Employees':
                showAll();
                break;
            case 'View all Employees by Department':
                showByDept();
                break;
            case 'View all Employees by Manager':
                showByManager();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'View all Departments':
                viewDept();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Remove Department':
                removeDept();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}



const showAll = () => {
    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(' ');
        console.table(chalk.yellow('All Employees'), results)
        startApp();
    })

}

const showByDept = () => {
    console.log("showByDept");
    const deptQuery = 'SELECT * FROM department';
    connection.query(deptQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'deptChoice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name)
                    return choiceArray;
                },
                message: 'Select a Department to view:'
            }
        ]).then((answer) => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].department_name === answer.deptChoice) {
                    chosenDept = results[i];
                }
            }

            const query = 'SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.department_name AS "Department", r.salary AS "Salary" FROM employee e INNER JOIN role r ON r.id = e.role_id INNER JOIN department d ON d.id = r.department_id WHERE ?;';
            connection.query(query, { department_name: chosenDept.department_name }, (err, res) => {
                if (err) throw err;
                console.log(' ');
                console.table(chalk.yellow(`All Employees by Department: ${chosenDept.department_name}`), res)
                startApp();
            })
        })
    })
}

const showByManager = () => {

    let mgrQuery = `SELECT * from employee`
    connection.query(mgrQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'mgr_choice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.id);
                    return choiceArray;

                },
                message: 'Select a Manager:'
            }
        ]).then((answer) => {
            console.log(answer);
            const mgrQuery2 = `SELECT employee.id, employee.first_name, employee.last_name, department_name AS department,
             role.title FROM employee LEFT JOIN role on role.id = manager_id LEFT JOIN department ON department.id = 
             role.department_id WHERE manager_id = ?`


            // connection.query(mgrQuery2, [answer.mgr_choice], (err, results) => {
            //     if (err) throw err;
            //     console.log(' ');
            //     console.table(chalk.yellow('Employees by Manager'), results);
            //     startApp();
            connection.query(mgrQuery2, [answer.mgr_choice], (err, res) => {
                console.log("connection Query2", res)
                if (err) throw err;
                console.log(' ');
                console.table(chalk.yellow(`All Employees by Manager: `), res)
                startApp();
            })
        })
    })
}

const addEmployee = () => {
    connection.query(roleQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'fName',
                type: 'input',
                message: addEmployeeQuestions[0]

            },
            {
                name: 'lName',
                type: 'input',
                message: addEmployeeQuestions[1]
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.title);
                    return choiceArray;
                },
                message: addEmployeeQuestions[2]

            },
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: addEmployeeQuestions[3]

            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?,
                (SELECT id FROM role WHERE title = ? ),
                (SELECT id FROM(SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ? ) AS tmptable))`, [answer.fName, answer.lName, answer.role, answer.manager]
            )
            startApp();
        })
    })


}

const removeEmployee = () => {
    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(' ');
        console.table(chalk.yellow('All Employees'), results)
        inquirer.prompt([
            {
                name: 'IDtoRemove',
                type: 'input',
                message: 'Enter the Employee ID of the person to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM employee where ? `, { id: answer.IDtoRemove })
            startApp();
        })
    })
}

const updateRole = () => {
    const query = `SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee; SELECT title FROM role`
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'empl',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'newRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee
    SET role_id = (SELECT id FROM role WHERE title = ? )
    WHERE id = (SELECT id FROM(SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?) AS tmptable)`, [answer.newRole, answer.empl], (err, results) => {
                if (err) throw err;
                startApp();
            })
        })


    })

}

const viewRoles = () => {
    let query = `SELECT title AS "Title" FROM role`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log(' ');
        console.table(chalk.yellow('All Roles'), results);
        startApp();
    })

}

const addRole = () => {
    const addRoleQuery = `SELECT * FROM role; SELECT * FROM department`
    connection.query(addRoleQuery, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('List of current Roles:'), results[0]);

        inquirer.prompt([
            {
                name: 'newTitle',
                type: 'input',
                message: 'Enter the new Title:'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'Enter the salary for the new Title:'
            },
            {
                name: 'dept',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the Department for this new Title:'
            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO role(title, salary, department_id)
    VALUES
        ("${answer.newTitle}", "${answer.newSalary}",
            (SELECT id FROM department WHERE department_name = "${answer.dept}")); `
            )
            startApp();

        })
    })

}

removeRole = () => {
    query = `SELECT * FROM role`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'removeRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.title);
                    return choiceArray;
                },
                message: 'Select a Role to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM role WHERE ? `, { title: answer.removeRole });
            startApp();

        })

    })

}


const viewDept = () => {
    query = `SELECT department_name AS "Departments" FROM department`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('All Departments'), results)
        startApp();
    })
}

const addDept = () => {
    query = `SELECT department_name AS "Departments" FROM department`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('List of current Departments'), results);

        inquirer.prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'Enter the name of the Department to add:'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO department(department_name) VALUES( ?)`, answer.newDept)
            startApp();
        })
    })
}

const removeDept = () => {
    query = `SELECT * FROM department`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'dept',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the department to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM department WHERE ? `, { department_name: answer.dept })
            startApp();
        })
    })

}

startApp();
