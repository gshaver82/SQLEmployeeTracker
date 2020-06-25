USE Employee_Tracker_db;

SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
                FROM employeesTable
                where id =(
                SELECT manager_id
                FROM employeesTable
                where id = 5);

-- SELECT *
-- FROM EmployeesTable
-- INNER JOIN roleTable
-- ON EmployeesTable.role_id = roleTable.id
-- INNER JOIN departmentTable
-- ON roleTable.department_id = departmentTable.id
-- ORDER BY EmployeesTable.id; 

-- SELECT first_name, last_name, roleTable.title
--   FROM employeesTable
--   INNER JOIN roleTable ON roleTable.id = employeesTable.role_id
--   INNER JOIN departmentTable ON departmentTable.id = roleTable.department_id
--   WHERE manager_id IS NOT NULL;
  
  

-- SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
-- FROM employeesTable
-- where id =(
-- SELECT manager_id
-- FROM employeesTable
-- where id = 6);
  
--   this selects all employees who are under the same manager as the one specified
  
-- SELECT CONCAT_WS(' ', first_name, last_name) AS FullName
-- FROM employeesTable
-- where manager_id =
-- (SELECT manager_id
-- FROM employeesTable
-- where first_name = 'George');