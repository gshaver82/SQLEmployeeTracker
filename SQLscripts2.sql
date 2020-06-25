USE Employee_Tracker_db;
-- CREATE TABLE EmployeesTable (
--   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   first_name varchar(30) NOT NULL,
--   last_name varchar(30) NOT NULL,
--   role_id INTEGER NOT NULL,
--   manager_id INTEGER,
--   FOREIGN KEY (role_id) REFERENCES roleTable(id),
--   FOREIGN KEY (manager_id) REFERENCES EmployeesTable(id)  
-- );

SELECT id
FROM roleTable
WHERE title = "Fleet Admiral";



-- SELECT id
-- FROM EmployeesTable
-- WHERE CONCAT_WS(' ', EmployeesTable.first_name, EmployeesTable.last_name) = "Richard Best";

-- SELECT CONCAT_WS(' ', EmployeesTable.first_name, EmployeesTable.last_name)
--             FROM EmployeesTable;



-- SELECT CONCAT_WS(' ', b.first_name, b.last_name) AS ManagerName, CONCAT_WS(' ', a.first_name, a.last_name) AS EmployeeName
-- FROM EmployeesTable a, EmployeesTable b
-- WHERE b.id = a.manager_id;



