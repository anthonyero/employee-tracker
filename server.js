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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

