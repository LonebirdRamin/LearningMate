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

app.get('/api/scheduleQuery', function (req, res, next) {
  console.log("schedule query log test");
  connection.query(
    'SELECT cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_student` AS `cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id ORDER BY d.date_id, csd.start_time;'
    ,
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Schedule query error occurred' });
      } else {
        res.json(results);
      }
    }
  );
})

app.get('/api/queryIdCard', function (req, res, next) {
  console.log("query id card");
  //const email = req.query.email;
  const email = "ramin.such@kmutt.ac.th"
  console.log(email);

  connection.query(
    'SELECT `id_card` FROM `student` WHERE academic_email = ?;',
    [email], 
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Query id card error occurred' });
      } else {
        res.json(results);
      }
    }
  );
  console.log("query id card");
});

app.get('/api/checkRole', function (req, res, next) {
  console.log("check role");
  //const email = "ramin.such@kmutt.ac.th";
  const email = req.query.email;
  console.log(email);

  connection.query(
    'SELECT * FROM (SELECT role, academic_email FROM student UNION ALL SELECT role, academic_email FROM teacher) AS combined_data WHERE academic_email = ?;',
    [email], 
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Check role error occurred' });
      } else {
        res.json(results);
      }
    }
  );
  console.log("check role");
});

// function getStudentSchedule(email, res) {
//   connection.query(
//     'SELECT s.student_name, cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_student` AS `cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
//     [email],
//     function(err, studentResults, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Student schedule query error occurred' });
//       } else {
//         console.log("success student query");
//         res.json(studentResults);
//         console.log("Student In");
//       }
//     }
//   );
// }

// function getTeacherSchedule(email, res) {
//   connection.query(
//     'SELECT s.teacher_name, cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `teacher` AS `s` JOIN `class_lecturer` AS `cs` ON cs.teacher_id = s.teacher_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
//     [email],
//     function(err, teacherResults, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Teacher schedule query error occurred' });
//       } else {
//         res.json(teacherResults);
//         console.log("teacher IN");
//       }
//     }
//   );
// }

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})