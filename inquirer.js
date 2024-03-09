const inquirer = require('inquirer');

// Functions
const validateNonEmpty = (promptName) => {
	if (promptName) {
		return true;
	} else {
		throw new Error(`Please select a ${promptName}`);
	}
};

const viewDepartments = () => {

};

const viewRoles = () => {

};

const viewEmployees = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const addEmployee = () => {

};

const updateEmployeeRole = () => {

};


// 
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
			"Update an employee role"],
		validate: validateNonEmpty("command")
	}
];


// Initialization function
const runInquirer = (questionList) => {
	inquirer
	.prompt(questionList)
	.then((response) => {
		console.log(response);
	})

}

runInquirer(commandQuestion);

module.exports = {
	commandQuestion,
	runInquirer
}
