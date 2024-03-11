-- department TABLE
INSERT INTO department (name) -- Do not have to include id which is SERIAL
VALUES 	('Marketing'),
		('Sales'),
		('Information Technology'),
		('Customer Service'),
		('Human Resources');

-- role TABLE
INSERT INTO role (title, salary, department_id)
VALUES 	('Designer', 65000, 1),
		('Video Editor', 50000, 1),
		('Company Representative', 95000, 2),
		('Sales Consultant', 75000, 2),
		('Data Analyst', 65000, 3),
		('Data Manager', 85000, 3),
		('Customer Service Rep', 45000, 4),
		('Customer Service Manager', 80000, 4),
		('Talent Aquisition', 75000, 5),
		('Human Resources Officer', 70000, 5);

	-- Join department and role
		-- SELECT role.title, role.salary, department.name FROM role JOIN department ON department.id = role.department_id;
		-- SELECT role.title AS "Job Title", role.salary AS "Salary", department.name AS "Department" FROM role JOIN department ON department.id = role.department_id;

-- employee TABLE
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES	('Andrew', 'Warhol', 1, NULL),
		('Christian', 'Nolan', 2, NULL),
		('Will', 'Gates', 3, NULL),
		('Jordie', 'Belfort', 4, 3),
		('Al', 'Turing', 5, NULL),
		('Isa', 'Newton', 6, NULL),
		('Bob', 'Helper', 7, NULL), -- Cannot list a manager if that employee is named after; produces error
		('Troy', 'Ayudante', 8, NULL),
		('Harvey', 'Houdini', 9, NULL),
		('Prima', 'Human', 10, NULL);

	-- Triple join
		-- SELECT employee.first_name, employee.last_name, role.title, department.name FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id; 
		-- SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", employee.manager_id AS "Manager ID" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id; 
