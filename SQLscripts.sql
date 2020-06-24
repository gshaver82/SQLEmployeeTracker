USE Employee_Tracker_db;


SELECT *
FROM EmployeesTable
INNER JOIN roleTable
ON EmployeesTable.role_id = roleTable.id
INNER JOIN departmentTable
ON roleTable.department_id = departmentTable.id
ORDER BY EmployeesTable.id; 


