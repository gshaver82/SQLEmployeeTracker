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
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

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
                AddRole();
            } else if (StartResponse.StartChoice == "Remove role") {
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "quit") {
                exit();
            };
        }).catch(function (error) {
            console.log("An error occured:", error);
        });
};



 async function AddRole() {
    try {
              //this queries for the Departments, then strips the title from the SQL response and stores in array. 
              DeptQuery = await query("SELECT departmentName From departmentTable;");
              let DeptQuerylist = [];
              for (var i = 0; i < DeptQuery.length; i++) {
                DeptQuerylist.push(DeptQuery[i].departmentName);
              }
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Title?",
                    name: "TitleChoice",
                },
                {
                    type: "input",
                    message: "Salary?",
                    name: "SalaryChoice",
                },
                {
                    type: "list",
                    message: "Department?",
                    name: "DeptChoice",
                    choices: DeptQuerylist,
                },
            ]).then( async function (AddRoleResponse) {
                DeptIDObject = await query(`SELECT id
                FROM departmentTable
                WHERE departmentName = "${AddRoleResponse.DeptChoice}";`);
                //turns sql object into int of the id
                let DeptId = parseInt(DeptIDObject[0].id);
                console.log("DeptId-------");
                console.log(DeptId);
                //the next 4 lines of code take the choice from prompt above and retrieves the 
                //appropriate department ID for storing into sql query
                //gets sql role id from the listed role choice
                SQLquery =
                    `INSERT INTO roleTable 
                    VALUES (0, '${AddRoleResponse.TitleChoice}', 
                    ${AddRoleResponse.SalaryChoice}, 
                    ${DeptId});`;
                connection.query(SQLquery);
                console.log("Role Added!");
                mainOrQuit();

            }).catch(function (error) {
                console.log("An error occured:", error);
            });
    } catch (err) {
        console.log(err);
    }
};

async function AddEmployee() {
    try {
        //this queries for the roles, then strips the title from the SQL response and stores in array. 
        rolesQuery = await query("SELECT title from roleTable;");
        let rolesQuerylist = [];
        for (var i = 0; i < rolesQuery.length; i++) {
            rolesQuerylist.push(rolesQuery[i].title);
        }

        //this queries for Employees, then strips the title from the SQL response and stores in array. 
        EmployeeList = await query(`SELECT CONCAT_WS(' ', EmployeesTable.first_name, EmployeesTable.last_name) 
        AS Employee
        FROM EmployeesTable;`);
        let EmployeeQuerylist = [];
        for (var i = 0; i < EmployeeList.length; i++) {
            EmployeeQuerylist.push(EmployeeList[i].Employee);
        }

        // console.log(rolesQuerylist);
        // console.log(EmployeeQuerylist);

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "First name?",
                    name: "FnameChoice",
                },
                {
                    type: "input",
                    message: "Last name?",
                    name: "LnameChoice",
                },
                {
                    type: "list",
                    message: "Role?",
                    name: "RoleChoice",
                    choices: rolesQuerylist,
                },
                {
                    type: "list",
                    message: "Manager?",
                    name: "ManagerChoice",
                    //TODO add option for NULL manager
                    choices: EmployeeQuerylist,
                },
            ]).then(async function (AddEmployeeResponse) {
                //gets sql role id from the listed role choice
                RoleIDObject = await query(`SELECT id
                FROM roleTable
                WHERE title = "${AddEmployeeResponse.RoleChoice}";`);
                //turns sql object into int of the id
                let RoleId = parseInt(RoleIDObject[0].id);
                //gets sql manager id from the listed role choice
                ManagerIDObject = await query(`SELECT id
                FROM EmployeesTable
                WHERE CONCAT_WS(' ', EmployeesTable.first_name, EmployeesTable.last_name) = 
                "${AddEmployeeResponse.ManagerChoice}";`);
                //turns sql object into int of the id             
                let ManagerID = parseInt(ManagerIDObject[0].id);
                //inserts data into sql from variable composed of all data collected
                SQLquery =
                    `INSERT INTO EmployeesTable 
                    VALUES (NULL, '${AddEmployeeResponse.FnameChoice}', '${AddEmployeeResponse.LnameChoice}', 
                    ${RoleId}, ${ManagerID});`;
                connection.query(SQLquery);
                console.log("Employee Added!");
                mainOrQuit();

            }).catch(function (error) {
                console.log("An error occured:", error);
            });
    } catch (err) {
        console.log(err);
    }
};


function viewByManager() {
    SQLquery =
        `SELECT CONCAT_WS(' ', b.first_name, b.last_name) AS ManagerName, CONCAT_WS(' ', a.first_name, a.last_name) AS EmployeeName
        FROM EmployeesTable a, EmployeesTable b
        WHERE b.id = a.manager_id;`;
    connection.query(SQLquery, function (err, data) {
        if (err) throw err;

        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        console.table(data);
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        mainOrQuit();
    });

};

function viewAllRoles() {
    SQLquery =
        `SELECT title
        from roleTable;`
    query(SQLquery, function (err, data) {
        if (err) throw err;
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        console.table(data);
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        mainOrQuit();
    });
};

function viewByDepartment() {
    SQLquery =
        `SELECT departmentTable.departmentName, first_name, last_name
    FROM EmployeesTable
    INNER JOIN roleTable
    ON EmployeesTable.role_id = roleTable.id
    INNER JOIN departmentTable
    ON roleTable.department_id = departmentTable.id
    ORDER BY departmentTable.departmentName; `
    query(SQLquery, function (err, data) {
        if (err) throw err;
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        console.table(data);
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        mainOrQuit();
    });
};

function viewEmployees() {
    SQLquery =
        `SELECT first_name, last_name, roleTable.title, roleTable.salary, departmentTable.departmentName
    FROM EmployeesTable
    INNER JOIN roleTable
    ON EmployeesTable.role_id = roleTable.id
    INNER JOIN departmentTable
    ON roleTable.department_id = departmentTable.id
    ORDER BY EmployeesTable.id; `
    query(SQLquery, function (err, data) {
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