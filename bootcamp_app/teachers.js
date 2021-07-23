// a Pool will manage multiple client connections
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '$1
ORDER BY teacher;
`;

// store all potentially malicious values in an array.
const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

// pool.query is a function that accepts an SQL query as a JavaScript string. Using the ` (backtick), we can write a multi line string like this to make our SQL look nicer. The function then returns a promise that contains our result when the query is successful.
pool.query(queryString, values)
// once the .then(res => {}) gets executed, we're not dealing with SQL or the database any more, we're just dealing with JavaScript objects.
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.teacher} was assisting in the ${row.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));