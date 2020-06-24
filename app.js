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
                    "add Employee",
                    "Remove Employee",
                    "Update Employee role",
                    "Update Employee manager",
                    "View all roles",
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
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "add Employee") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "Remove Employee") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "Update Employee role") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "Update Employee manager") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "View all roles") {
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

function viewByDepartment() {
    connection.query("SELECT * FROM EmployeesTable;", function (err, data) {
        if (err) throw err;
        console.table(data);
        mainOrQuit();
    });
};

function viewEmployees() {
    query =  
    `SELECT *
    FROM EmployeesTable
    INNER JOIN roleTable
    ON EmployeesTable.role_id = roleTable.id
    INNER JOIN departmentTable
    ON roleTable.department_id = departmentTable.id
    ORDER BY EmployeesTable.id;`
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.table(data);
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