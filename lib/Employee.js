class Employee {
    constructor(id, first_name, last_name, title, department, salary, manager){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
       }
}
module.exports = Employee;