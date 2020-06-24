const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");




StartPrompt()


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
                secondlevelfunction();
            } else if (StartResponse.StartChoice == "View Employees by department") {
                secondlevelfunction();
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
                return;
            };
        }).catch(function (error) {
            console.log("An error occured:", error);
        });
};



