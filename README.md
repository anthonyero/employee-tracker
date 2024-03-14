# Employee Tracker

## Description 

A command-line **content management system** application to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

**Features include**:

- Allows users to build and access a company database, structured using the schema database file provided
- Provides query functionality to:
	- **View all departments** within the company database
	- **View all roles** within the company database
	- **View all employees** within the company database
	- **Add a new department** to the company database
	- **Add a new role** to the company database
	- **Add a new employee** to the company database
	- **Update an employee's role** in the company database
- Prompts employ validation to prevent character type and response length errors before query submission


This exercise was provided by Northwestern University and edX through the Coding boot camp. Submitted as fulfillment of the Module 12 exercise during the December, 2023 - June, 2024 cohort.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)
- [Credits](#credits)
- [License](#license)

## Installation

- Prerequisites:
    - Download and install [Node.js](https://nodejs.org/en)
    - Download and install [PostgreSQL](https://www.postgresql.org/)

1. Download this repository's contents to your local machine utilizing the green `Code` button. 
    - The "Download ZIP" option is sufficient for installation. Ensure that you extract the folder's contents.
2. Open the downloaded directory in your preferred command-line interface. 
    - Possible options including "Terminal" on Mac, "Git Bash" on Windows, or VSCode.
3. Within the downloaded directory, run the following command: 
    > npm install 
    - This will install the Node.js packages "Inquirer" and "pg" and their dependencies which are detailed in the `package.json` file.

## Usage

**For first-time users:**

1. Initiate a PostgreSQL shell session and run the `schema.sql` file in the "db" directory. Within the shell session, run the file using the following command: `\i schema.sql;`
	- Optionally: Run the `seed.sql` file to seed the `company_db` database. This file is provided with sample data.
	- Users can provide their own seed file or insert their own values into the datbase.
2. In `inquirer.js`, located within the "api" directory, update the `pool` variable by inputting your credentials. In particular, your user name and your password for your Postgres session.

3. Initiate the application by using the following command:
> node index.js

4. Navigate the interface utilzing your keyboard's arrow keys and using the "enter/return" button to make your selections.

5. Follow prompt instructions to submit information that adheres to the database's constraints regarding response type and response length.

6. To exit the application, select the "Exit" command and confirm your exit using `ctrl + c`.

**For returning users:**

1. Initiate the application by using the following command:
> node index.js

2. Follow steps 4-6 as detailed above.

**Troubleshooting:**

When adding roles, adding employees, or updating an employee's role, users may encounter an error if they provide values that reference departments/roles that are not within the respective tables. The error will indicate the operation cannot be completed due to a value being `undefined`. This may cause the application to crash and will require initiating the application again. 

## Links

- [Link to a walkthrough video](https://drive.google.com/file/d/1iarA-Eai9TSrqhk5VbEZu8SVtuVktq9f/view?usp=sharing)

- [Link to the GitHub repository](https://github.com/anthonyero/employee-tracker)


The relevant JavaScript and SQL files are located within this repository. 

JavaScript files include comments detailing changes implemented within them. Further justifications can also be found within the repository's "Issues" tab.

Please refer to the commit history and branches within the repository for a tracked history of changes.

## Credits

This application utilzes `Node.js`, `PostgreSQL`, and the `inquirer` and `pg` npm packages.


## License

N/A

![Employee Tracker Demo Gif](/assets/images/employee-tracker-demo.gif)