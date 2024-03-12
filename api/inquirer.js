const inquirer = require('inquirer');
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
const validateNonEmpty = (promptName) => {
	if (promptName) {
		return true;
	} else {
		throw new Error(`Please select a ${promptName}`);
	}
};

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
};

const addDepartment = () => {
	console.log(`Made it to addDepartment`);
};

const addRole = () => {
	console.log(`Made it to addRole`);
};

const addEmployee = () => {
	console.log(`Made it to addEmployee`);
};

const updateEmployeeRole = () => {
	console.log(`Made it to updateEmployeeRole`);
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
		case "Update an employee role":
			updateEmployeeRole();
			break;
		case "Exit":
			exitCommand();
			break;
	};
};

// Command Question
const commandQuestion = [
	{
		type: "list",
		message: "Please provide a command:",
		name: "command",
		choices: [
			"View all departments",
			"View all roles",
			"View all employees",
			"Add a department",
			"Add a role",
			"Add an employee",
			"Update an employee role",
			"Exit"],
		validate: validateNonEmpty("command")
	}
];


// Initialization function
const runInquirer = (questionList) => {
	inquirer
	.prompt(questionList)
	.then((response) => {
		console.log(response); // Remove once testing complete
		switchCommand(response);
	})

}

runInquirer(commandQuestion);

module.exports = {
	commandQuestion,
	runInquirer
}
