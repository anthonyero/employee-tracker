const express = require('express');
const path = require('path');
const {Pool} = require('pg');

const PORT = 3001;
const app = express();

// Express middleware
app.use(express.static('./api/inquirer.js'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.get('/', (req, res) => 
    res.send('<p>Please initiate the Inquirer</p>')
);

// View Departments
app.get('/api/departments', (req, res) => {
  const sql = `SELECT * FROM department`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(rows)
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// View Roles
app.get('/api/roles', (req, res) => {
  const sql = `SELECT role.title AS "Job Title", role.id AS "Role ID", role.salary AS "Salary", department.name AS "Department" FROM role JOIN department ON department.id = role.department_id;`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(rows)
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// View Employeees
app.get('/api/employees', (req, res) => {
  const sql = `SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", employee.manager_id AS "Manager ID" FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id;`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(rows)
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Add Department
app.post('/api/add-department', (req, res) => {
	const {name} = req.body;

	if (name) {
		pool.query(`INSERT INTO department (name) VALUES ($1)`, [name], (err, { rows }) => {
			if (err) {
				console.log(err);
			}
			console.log('Added a new department')
			res.json({
				message: 'success',
				data: 'A new department was added to the "department" table'
			});
		});
	} else {
		res.status(500).json('Error in adding department')
	};
});

// Add Role
app.post('/api/add-role', (req, res) => {
	const {title, salary, department_id} = req.body;

	if (title && salary && department_id) {
		pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [title, salary, department_id], (err, { rows }) => {
			if (err) {
				console.log(err);
			}
			console.log('Added a new role')
			res.json({
				message: 'success',
				data: 'A new role was added to the "role" table'
			});
		});
	} else {
		res.status(500).json('Error in adding role')
	};
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

