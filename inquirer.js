const inquirer = require('inquirer');

const validateNonEmpty = (promptName) => {
	if (promptName) {
		return true;
	} else {
		throw new Error(`Please select a ${promptName}`);
	}
}

const questions = [
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


const runInquirer = () => {
	inquirer
	.prompt(questions)
	.then((response) => {
		console.log(response);
	})

}




module.exports = {
	questions,
	runInquirer
}

runInquirer();