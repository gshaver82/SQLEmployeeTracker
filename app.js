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
                
                const ManagerTable = async () => {
                    const data = await EmployeeSql();
                    const FinalSqlTable = await ManagerSql(data);
                    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
                    console.log(FinalSqlTable);
                    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
                    return FinalSqlTable;
                }
                ManagerTable();
                mainOrQuit();
                // viewByManager();
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

async function EmployeeSql(){
return 1;
};
async function ManagerSql(data){
return data +2;
};





function AddEmployee() {

};

//neither of these are working

function viewByManager() {
    SQLquery =
        `SELECT EmployeesTable.id, first_name, last_name, roleTable.title, roleTable.salary, departmentTable.departmentName
    FROM EmployeesTable
    INNER JOIN roleTable
    ON EmployeesTable.role_id = roleTable.id
    INNER JOIN departmentTable
    ON roleTable.department_id = departmentTable.id
    ORDER BY EmployeesTable.id; `;
<<<<<<< Updated upstream
    connection.query(SQLquery, function (err, data) {
        if (err) throw err;
        console.log("inside first query data is ");
        console.log(data);
        for (i = 0; i < data.length; i++) {
            console.log("inside for loop data[i].id is");
            console.log(data[i].id);


            ManagerQuery =
                `SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
                FROM employeesTable
                where id =(
                SELECT manager_id
                FROM employeesTable
                where id = 5);`;

            //${data[i].id}

            connection.query(ManagerQuery, function (err, managerData) {
                if (err) throw err;
                console.log("nested query \n i is");
                console.log(i);
                console.log(data[i]);
                // console.log(managerData);
                // data[i].manager = managerData.FullName;
                // data[i].manager = managerData;

                // console.log(data[i].manager);
                
            });
        }
        // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        // console.table(data);
        // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        mainOrQuit();
    });

};


=======
    await query(SQLquery, async function (err, data) {
        if (err) throw err;
        console.log("inside first query data length is " + data.length);
    });
    console.log('just outside  first awaitquery');
    await processArray(data);

    mainOrQuit();
};

async function processArray(data) {
    let i = 0;
    for (const item of data) {
        console.log("inside for loop data[i].id is");
        console.log(data[i].id);
        ManagerQuery =
            `SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
        FROM employeesTable
        where id =(
        SELECT manager_id
        FROM employeesTable
        where id = ${data[i].id});`;

        console.log("ManagerQuery");

        //------------------------

        // await query(ManagerQuery, function (err, managerData) {
        //     if (err) throw err;
        //     console.log("nested query i is" + i);
        //     console.log("managers name is " + managerData[0].FullName);
        //     // console.log(managerData);
        //     data[i].manager = managerData[0].FullName;
        //     console.log(data[i]);  
        // });

        //------------------------

        i++;
        console.log('end of for loop');
    }
    console.log('end of processArray');
}

// async function ManagerQueryFunction(ManagerQuery, data) {
//     await query(ManagerQuery, function (err, managerData) {
//         if (err) throw err;
//         console.log("nested query \n i is" + i);
//         // console.log(managerData);
//         // data[i].manager = managerData.FullName;
//         // data[i].manager = managerData;
//         // console.log(data[i].manager);  
//         console.log(managerData[0].FullName);
//         console.log(data[i]);
//     });

// };



// for (i = 0; i < data.length; i++) {
//     console.log("inside for loop data[i].id is");
//     console.log(data[i].id);
//     ManagerQuery =
//         `SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
//         FROM employeesTable
//         where id =(
//         SELECT manager_id
//         FROM employeesTable
//         where id = 5);`;
//     //${data[i].id}

//     connection.query(ManagerQuery, function (err, managerData) {
//         if (err) throw err;
//         console.log("nested query \n i is");
//         console.log(i);
//         console.log(data[i]);
//         // console.log(managerData);
//         // data[i].manager = managerData.FullName;
//         // data[i].manager = managerData;
//         // console.log(data[i].manager);                
//     });
// }
>>>>>>> Stashed changes


// function viewByManager() {
//     // try {
//         SQLquery =
//             `SELECT EmployeesTable.id, first_name, last_name, roleTable.title, roleTable.salary, departmentTable.departmentName
//     FROM EmployeesTable
//     INNER JOIN roleTable
//     ON EmployeesTable.role_id = roleTable.id
//     INNER JOIN departmentTable
//     ON roleTable.department_id = departmentTable.id
//     ORDER BY EmployeesTable.id; `;
//         data = QueryFunction(SQLquery);
//         console.log("line 154 data");
//         console.log(data);
//         console.log("just outside for loop");
//         for (i = 0; i < data.length; i++) {
//             console.log("inside for loop");
//             console.log(data[i].id);
//             ManagerQuery =
//                 `SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
//             FROM employeesTable
//             where id =(
//             SELECT manager_id
//             FROM employeesTable
//             where id = ${data[i].id});`;
//             managerData = ManagerQueryFunction(ManagerQuery);
//             data[i].manager = managerData;
//             console.log("nested query");
//             console.log(data[i].manager);
//         }
//         console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
//         console.table(data);
//         console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
//         mainOrQuit();
//     // } catch (err) {
//     //     console.log(err);
//     // }
// };

// function QueryFunction() {
//     query(SQLquery, function (err, data) {
//         if (err) throw err;
//         console.log("inside first query line 184 data");
//         console.log(data);
//         return data;
//     });

// };

// function ManagerQueryFunction() {
//     query(ManagerQuery, function (err, managerData) {
//         if (err) throw err;
//         return managerData;
//     });

// };





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