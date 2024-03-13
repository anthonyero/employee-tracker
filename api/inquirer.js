const inquirer = require('inquirer');
const {
	validateNonEmpty,
	commandQuestion,
	addDepartmentQuestion,
	addRoleQuestions,
	addEmployeeQuestions,
	updateRoleQuestions
} = require('./questions.js')

const {Pool} = require('pg');

const pool = new Pool(
	{
		user: 'postgres',
		password: 'devP@ssword',
		host: 'localhost',
		database: 'company_db'
	},
	console.log(`Connected to the company_db database`)
);

pool.connect();

// Functions

const viewDepartments = () => {
	console.log(`Made it to viewDepartments`);
	/*
	fetch('http://localhost:3001/api/departments', {
    	method: 'GET'
 	 })
	   .then((res) => res.json())
	   .then((data) => console.info(data)); */
	const sql = `SELECT department.name AS "Department Name", department.id AS "Department ID" FROM department`;

  	pool.query(sql, (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.table(rows);
  		runInquirer(commandQuestion);
  	});

  
  	// .then( ({rows}) => {
  	// 	console.table(rows);
  	// 	runInquirer(commandQuestion);
  	// });

};

const viewRoles = () => {
	console.log(`Made it to viewRoles`);
	const sql = `SELECT role.title AS "Job Title", role.id AS "Role ID", department.name AS "Department", role.salary AS "Salary" FROM role JOIN department ON department.id = role.department_id;`;

  	pool.query(sql, (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.table(rows);
  		runInquirer(commandQuestion);
  	});
};

const viewEmployees = () => {
	console.log(`Made it to viewEmployees`);
	const sql = `SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", employee.manager_id AS "Manager ID" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id;`;
  	
  	pool.query(sql, (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.table(rows);
  		runInquirer(commandQuestion);
  	});
};

const addDepartment = () => {
	console.log(`Made it to addDepartment`);
	inquirer.prompt(addDepartmentQuestion)
	.then((response) => {
		const newDepartment = response.newDepartment;
		const sql = `INSERT INTO department (name) VALUES ($1)`

		pool.query(sql, [newDepartment], (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.info(`A new department, ${newDepartment}, was successfully added`);
  		//viewDepartments(); Helpful for reference but may clutter view
  		runInquirer(commandQuestion);
  	});
	})

};

const addRole = () => {
	console.log(`Made it to addRole`);

	inquirer.prompt(addRoleQuestions)
	.then((response) => {
		const { newJobTitle, newJobSalary, newJobDepartment } = response;
		const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`

		pool.query(sql, [newJobTitle, newJobSalary, newJobDepartment], (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		console.info(`A new role, ${newJobTitle}, was successfully added`);
  		runInquirer(commandQuestion);
  		});
	})

};

const addEmployee = () => {
	console.log(`Made it to addEmployee`);
	inquirer.prompt(addEmployeeQuestions)
	.then((response) => {
		const {newFirstName, newLastName, newEmpRole, newEmpManager} = response;
		// If manager is null, we want to use NULL in SQL
		if (newEmpManager === -99) {
			const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, NULL)`;
			pool.query(sql, [newFirstName, newLastName, newEmpRole], (err, {rows}) => {
				if (err) {
					console.info(`${err.message}`);
					return;
				}
				console.info(`A new employee, ${newFirstName} ${newLastName}, was successfully added`);
				runInquirer(commandQuestion);
			});
		} else {
			const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
			pool.query(sql, [newFirstName, newLastName, newEmpRole, newEmpManager], (err, {rows}) => {
				if (err) {
					console.info(`${err.message}`);
					return;
				}
				console.info(`A new employee, ${newFirstName} ${newLastName}, was successfully added`);
				runInquirer(commandQuestion);
			});
		};
	})
};

const updateEmployeeRole = () => {
	console.log(`Made it to updateEmployeeRole`);
	inquirer.prompt(updateRoleQuestions)
	.then((response) => {
		const {employeeID, roleID} = response;

		const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
		pool.query(sql, [roleID, employeeID], (err, {rows}) => {
			if (err) {
				console.info(`${err.message}`);
				return;
			}
		console.info(`Employee ${employeeID}'s role was successfully updated to ${roleID}`);
		runInquirer(commandQuestion);
		});
	})
};


const exitCommand = () => {
	console.log("To confirm your exit, press 'ctrl + c'");
	return;
}

const switchCommand = (commandObject) => {
	switch (commandObject.command) {
		case "View all departments":
			viewDepartments();
			break;
		case "View all roles": 
			viewRoles();
			break;
		case "View all employees":
			viewEmployees();
			break;
		case "Add a department":
			addDepartment();
			break;
		case "Add a role":
			addRole();
			break;
		case "Add an employee":
			addEmployee();
			break;
		case "Update an employee's role":
			updateEmployeeRole();
			break;
		case "Exit":
			exitCommand();
			break;
	};
};




// Initialization function
const runInquirer = (questionList) => {
	inquirer
	.prompt(questionList)
	.then((response) => {
		console.log(response); // Remove once testing complete
		switchCommand(response);
	})
};

// runInquirer(commandQuestion);

module.exports = {
	commandQuestion,
	runInquirer
}
