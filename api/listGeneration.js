const {Pool} = require('pg');

const departments = [];
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

const retrieveDepartmentValues = () => {
	const sql = `SELECT * FROM department;`;
	pool.query(sql, (err, {rows}) => {
  		if (err) {
  			console.info(`${err.message}`);
  			return;
  		}
  		//console.log(rows);
  		const values = [];
  		for (let i = 0; i < rows.length; i++){
  			values.push(rows[i]["name"])
  		}
  		console.log(values)
  		return values;
	})
}


//viewDepartments();
let test = retrieveDepartmentValues();
console.log(test);