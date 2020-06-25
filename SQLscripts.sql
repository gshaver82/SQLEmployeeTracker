USE Employee_Tracker_db;
-- INSERT INTO roleTable 
-- VALUES (0, 'yorktown pilot', 420000, 4);
-- SELECT *
-- FROM roleTable;

SELECT *
FROM EmployeesTable
INNER JOIN roleTable
ON EmployeesTable.role_id = roleTable.id
INNER JOIN departmentTable
ON roleTable.department_id = departmentTable.id
ORDER BY EmployeesTable.id;

-- SELECT roleTable.title
-- FROM EmployeesTable
-- RIGHT JOIN roleTable
-- ON EmployeesTable.role_id = roleTable.id
-- where EmployeesTable.id IS NULL;