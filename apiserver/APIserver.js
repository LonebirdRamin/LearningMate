var express = require('express')
var cors = require('cors')
var app = express()

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'learningmate.cwfmrnlx2tvp.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: '0909914229za',
    database: 'learningmate'
  });

app.use(cors())

app.get('/api/queryTest', function (req, res, next) {       //hello => path
  // simple query
  connection.query(
      'SELECT * FROM `department`',
      function(err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.json(results);
        }
      }
);
})

app.get('/api/insertRegisUser', function (req, res, next) {       //hello => path
  // Assuming you receive data to insert in the request body
  const dataToInsert = {
    attribute1: req.body.attribute1,
    attribute2: req.body.attribute2,
    attribute3: req.body.attribute3
  };

  // simple query
  connection.query(
      'INSERT * FROM `department`',
      function(err, results, fields) {
          //console.log(results); // results contains rows returned by server
          //console.log(fields); // fields contains extra meta data about results, if available
          res.json(results);
  }
);
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})