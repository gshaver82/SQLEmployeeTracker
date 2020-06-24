const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
var mysql = require("mysql");
const { exit } = require("process");
// const path = require("path");
// const fs = require("fs");
const cTable = require('console.table');
// temp = [
//     {
//         name: 'foo',
//         age: 10
//     }, {
//         name: 'bar',
//         age: 20
//     }
// ];
// console.table(temp);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1Redsql",
    database: "Employee_Tracker_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    // console.log("connected as id " + connection.threadId);
    console.log("\nWelcome to the Midway battle employee tracker\n");
    StartPrompt()
});




function StartPrompt() {
    inquirer
        .prompt([

            {
                type: "list",
                message: "What would you like to do?",
                name: "StartChoice",
                choices: [
                    "View all Employees",
                    "View Employees by department",
                    "View Employees by manager",
                    "View all roles",
                    "add Employee",
                    "Remove Employee",
                    "Update Employee role",
                    "Update Employee manager",
                    "Add role",
                    "Remove role",
                    "quit"
                ],
            }
        ]).then(function (StartResponse) {
            if (StartResponse.StartChoice == "View all Employees") {
                viewEmployees();
            } else if (StartResponse.StartChoice == "View Employees by department") {
                viewByDepartment();
            } else if (StartResponse.StartChoice == "View Employees by manager") {
                viewByManager();
            } else if (StartResponse.StartChoice == "View all roles") {
                viewAllRoles();
            } else if (StartResponse.StartChoice == "add Employee") {
                AddEmployee();
            } else if (StartResponse.StartChoice == "Remove Employee") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "Update Employee role") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "Update Employee manager") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "Add role") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "Remove role") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "quit") {
                exit();
            };
        }).catch(function (error) {
            console.log("An error occured:", error);
        });
};


function AddEmployee() {

};

//neither of these are working

// function viewByManager() {
//     query =
//         `SELECT EmployeesTable.id, first_name, last_name, roleTable.title, roleTable.salary, departmentTable.departmentName
//     FROM EmployeesTable
//     INNER JOIN roleTable
//     ON EmployeesTable.role_id = roleTable.id
//     INNER JOIN departmentTable
//     ON roleTable.department_id = departmentTable.id
//     ORDER BY EmployeesTable.id; `
//     connection.query(query, function (err, data) {
//         if (err) throw err;
//         console.log("inside first query");
//         for (i = 0; i < data.length; i++) {
//             console.log("inside for loop");
//             console.log(data[i].id);
//             ManagerQuery =
//                 `SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
//                 FROM employeesTable
//                 where id =(
//                 SELECT manager_id
//                 FROM employeesTable
//                 where id = ${data[i].id});`
//             connection.query(ManagerQuery, function (err, managerData) {
//                 if (err) throw err;
//                 data[i].manager = managerData;
//                 console.log("nested query");
//                 console.log(data[i].manager);
//             });
//         }
//         // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
//         // console.table(data);
//         // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
//         mainOrQuit();
//     });
// };

async function viewByManager() {
    try {
        query =
            `SELECT EmployeesTable.id, first_name, last_name, roleTable.title, roleTable.salary, departmentTable.departmentName
    FROM EmployeesTable
    INNER JOIN roleTable
    ON EmployeesTable.role_id = roleTable.id
    INNER JOIN departmentTable
    ON roleTable.department_id = departmentTable.id
    ORDER BY EmployeesTable.id; `
        connection.query(query, function (err, data) {
            if (err) throw err;
            console.log("inside first query");
            for (i = 0; i < data.length; i++) {
                console.log("inside for loop");
                console.log(data[i].id);
                ManagerQuery =
                    `SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
                FROM employeesTable
                where id =(
                SELECT manager_id
                FROM employeesTable
                where id = ${data[i].id});`

                connection.query(ManagerQuery, function (err, managerData) {
                    if (err) throw err;
                    data[i].manager = managerData;
                    console.log("nested query");
                    console.log(data[i].manager);
                });

            }
            // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
            // console.table(data);
            // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");

        });
        mainOrQuit();
    } catch (err) {
        console.log(err);
    }

};






function viewAllRoles() {
    query =
        `SELECT title
        from roleTable;`
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        console.table(data);
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        mainOrQuit();
    });
};

function viewByDepartment() {
    query =
        `SELECT departmentTable.departmentName, first_name, last_name
    FROM EmployeesTable
    INNER JOIN roleTable
    ON EmployeesTable.role_id = roleTable.id
    INNER JOIN departmentTable
    ON roleTable.department_id = departmentTable.id
    ORDER BY departmentTable.departmentName; `
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        console.table(data);
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        mainOrQuit();
    });
};

function viewEmployees() {
    query =
        `SELECT first_name, last_name, roleTable.title, roleTable.salary, departmentTable.departmentName
    FROM EmployeesTable
    INNER JOIN roleTable
    ON EmployeesTable.role_id = roleTable.id
    INNER JOIN departmentTable
    ON roleTable.department_id = departmentTable.id
    ORDER BY EmployeesTable.id; `
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        console.table(data);
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        mainOrQuit();
    });
};

function mainOrQuit() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "StartChoice",
                choices: [
                    "Go back to main menu",
                    "quit"
                ],
            }
        ]).then(function (StartResponse) {
            if (StartResponse.StartChoice == "Go back to main menu") {
                StartPrompt();
            } else if (StartResponse.StartChoice == "quit") {
                exit();
            };
        }).catch(function (error) {
            console.log("An error occured:", error);
        });
};