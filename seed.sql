DROP DATABASE IF EXISTS Employee_Tracker_db;
CREATE DATABASE Employee_Tracker_db;

USE Employee_Tracker_db;

CREATE TABLE departmentTable (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departmentName varchar(30) NOT NULL
);


INSERT INTO departmentTable 
VALUES (2, 'Navy');
INSERT INTO departmentTable 
VALUES (3, 'USS Enterprise');
INSERT INTO departmentTable 
VALUES (4, 'USS Yorktown');

CREATE TABLE roleTable (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id  INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departmentTable(id)
);

INSERT INTO roleTable 
VALUES (2, 'Fleet Admiral', 420000, 2);
INSERT INTO roleTable 
VALUES (3, 'Enterprise Captain', 124000, 3);
INSERT INTO roleTable 
VALUES (4, 'Yorktown Captain', 124000, 4);
INSERT INTO roleTable 
VALUES (5, 'Enterprise Pilot', 42000, 3);

CREATE TABLE EmployeesTable (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roleTable(id),
  FOREIGN KEY (manager_id) REFERENCES EmployeesTable(id)
  
);

INSERT INTO EmployeesTable 
VALUES (2, 'Chester', 'Nimitz', 2, NULL);
INSERT INTO EmployeesTable 
VALUES (3, 'George', 'Murray', 3, 2);
INSERT INTO EmployeesTable 
VALUES (4, 'Elliott', 'Buckmaster', 4, 2);
INSERT INTO EmployeesTable 
VALUES (5, 'Richard', 'Best', 5, 3);
INSERT INTO EmployeesTable 
VALUES (6, 'Wade', 'McClusky jr', 5, 3);

SELECT *
FROM EmployeesTable
INNER JOIN roleTable
ON EmployeesTable.role_id = roleTable.id
INNER JOIN departmentTable
ON roleTable.department_id = departmentTable.id
ORDER BY EmployeesTable.id;