const express = require('express');
var cors = require('cors')
const app = express();

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
app.use(express.json())

app.get('/api/queryTest', function (req, res, next) {       //hello => path
  // simple query
  connection.query(
      'SELECT * FROM `department`',
      function(err, results, fields) {
        if (err) {var express = require('express')
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

app.get('/api/scheduleQuery', function (req, res, next) {
  console.log("schedule query log test");
  connection.query(
    'SELECT cs.class_id, c.class_name, d.date_namdent` AS e, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_stu`cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id ORDER BY d.date_id, csd.start_time;'
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

app.get('/api/checkRole', function (req, res, next) {
  console.log("Begin check role");
  // const email = "ramin.such@kmutt.ac.th";
  const email = req.query.email;
  console.log(req.query);
  console.log(email);

  connection.query(
    'SELECT role FROM (SELECT role, academic_email FROM student UNION ALL SELECT role, academic_email FROM teacher) AS combined_data WHERE academic_email = ?;',
    [email], 
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Check role error occurred' });
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
  console.log("Done check role");
});

app.get('/api/getStudentSchedule', function (req, res, next) {
  console.log("Query Student Schedule");
  const email = req.query.email;
  connection.query(
    'SELECT cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_student` AS `cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
    [email],
    function(err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Student schedule query error occurred' });
      } else {
        console.log("success student query");
        res.json(studentResults);
        console.log("Student In");
      }
    }
  );
});

app.get('/api/getTeacherSchedule', function (req, res, next) {
  console.log("Query Teacher Schedule");
  const email = req.query.email;
  connection.query(
    'SELECT cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `teacher` AS `s` JOIN `class_lecturer` AS `cs` ON cs.teacher_id = s.teacher_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
    [email],
    function(err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Teacher schedule query error occurred' });
      } else {
        res.json(teacherResults);
        console.log("teacher IN");
      }
    }
  );
});

app.get('/api/getTeacherAssignment', function (req, res, next) {
  console.log("Query Teacher Assignment");
  const email = req.query.email;
  connection.query(
    'SELECT a.class_id, a.assignment_name, a.assignment_publish_date, a.assignment_due_date FROM assignment AS a JOIN class_lecturer AS cl ON cl.class_id = a.class_id JOIN teacher AS t ON t.teacher_id = cl.teacher_id WHERE t.academic_email = ?;',
    [email],
    function(err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Teacher assignment query error occurred' });
      } else {
        res.json(teacherResults);
        console.log("teacher IN");
      }
    }
  );
});

app.get('/api/getStudentAssignment', function (req, res, next) {
  console.log("Query Student Assignment");
  const email = req.query.email;
  connection.query(
    'SELECT a.class_id, a.assignment_name, a.assignment_publish_date, a.assignment_due_date FROM assignment AS a JOIN class_student AS cl ON cl.class_id = a.class_id JOIN student AS t ON t.student_id = cl.student_id WHERE t.academic_email = ?;',
    [email],
    function(err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Teacher assignment query error occurred' });
      } else {
        res.json(teacherResults);
        console.log("teacher IN");
      }
    }
  );
});

app.post("/api/createAssignment", (req, res) => {
  console.log("REQ QUERY = "+req.query)
  const { classID, assName, dueDate, description } = req.query;
//   const { classID, assName, publishDate, dueDate, description } = {
//     classID: 'CPE334',
//     assName: 'hum dum lab',
//     publishDate: '2023-10-10',
//     dueDate: '2023-11-11',
//     description: 'hum dum'
// };

  console.log(classID)
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  const sql = "INSERT INTO assignment (`class_id`, `assignment_name`, `assignment_publish_date`, `assignment_due_date`, `assignment_desciption`) VALUES (?, ?, ?, ?, ?)";

  connection.query(sql, [classID, assName, formattedDate, dueDate, description], (err, results) => {
    if (err) {
      console.log("Error while inserting a user into the database", err);
      return res.status(400).json({ message: "Failed to create a new assignment." });
    }
    return res.status(201).json({ message: "New assignment successfully created!" });
  });
})


app.listen(5001, function () {
  console.log('CORS-enabled web server listening on port 5001')
})
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
    'SELECT cs.class_id, c.class_name, d.date_namdent` AS e, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_stu`cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id ORDER BY d.date_id, csd.start_time;'
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
  // const email = req.query.email;
  const email = "ramin.such@kmutt.ac.th"
  console.log(email);

  connection.query(
    'SELECT `id_card` FROM `student` WHERE academic_email = ?;',
    [email], 
    // 'SELECT `id_card` FROM `student` WHERE academic_email = "ramin.such@kmutt.ac.th";',
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
  console.log("Begin check role");
  // const email = "ramin.such@kmutt.ac.th";
  const email = req.query.email;
  console.log(req.query);
  console.log(email);

  connection.query(
    'SELECT role FROM (SELECT role, academic_email FROM student UNION ALL SELECT role, academic_email FROM teacher) AS combined_data WHERE academic_email = ?;',
    [email], 
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Check role error occurred' });
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
  console.log("Done check role");
});

app.get('/api/getStudentSchedule', function (req, res, next) {
  console.log("Query Student Schedule");
  const email = req.query.email;
  connection.query(
    'SELECT cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_student` AS `cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
    [email],
    function(err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Student schedule query error occurred' });
      } else {
        console.log("success student query");
        res.json(studentResults);
        console.log("Student In");
      }
    }
  );
});

app.get('/api/getTeacherSchedule', function (req, res, next) {
  console.log("Query Teacher Schedule");
  const email = req.query.email;
  connection.query(
    'SELECT cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `teacher` AS `s` JOIN `class_lecturer` AS `cs` ON cs.teacher_id = s.teacher_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
    [email],
    function(err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Teacher schedule query error occurred' });
      } else {
        res.json(teacherResults);
        console.log("teacher IN");
      }
    }
  );
});

app.get('/api/getTeacherAssignment', function (req, res, next) {
  console.log("Query Teacher Assignment");
  const email = req.query.email;
  connection.query(
    'SELECT a.class_id, a.assignment_name, a.assignment_publish_date, a.assignment_due_date FROM assignment AS a JOIN class_lecturer AS cl ON cl.class_id = a.class_id JOIN teacher AS t ON t.teacher_id = cl.teacher_id WHERE t.academic_email = ?;',
    [email],
    function(err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Teacher assignment query error occurred' });
      } else {
        res.json(teacherResults);
        console.log("teacher IN");
      }
    }
  );
});

app.get('/api/getStudentAssignment', function (req, res, next) {
  console.log("Query Student Assignment");
  const email = req.query.email;
  connection.query(
    'SELECT a.class_id, a.assignment_name, a.assignment_publish_date, a.assignment_due_date FROM assignment AS a JOIN class_student AS cl ON cl.class_id = a.class_id JOIN student AS t ON t.student_id = cl.student_id WHERE t.academic_email = ?;',
    [email],
    function(err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Teacher assignment query error occurred' });
      } else {
        res.json(teacherResults);
        console.log("teacher IN");
      }
    }
  );
});

app.post("/api/createAssignment", (req, res) => {
  const { classID, assName, dueDate, description } = req.body;

  console.log("CLASS ID : ========", classID)
  const currentDate = new Date();
  console.log("Current date: ", currentDate.setHours(currentDate.getHours() + 7));
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  const sql = "INSERT INTO assignment (`class_id`, `assignment_name`, `assignment_publish_date`, `assignment_due_date`, `assignment_desciption`) VALUES (?, ?, ?, ?, ?)";

  connection.query(sql, [classID, assName, formattedDate, dueDate, description], (err, results) => {
    if (err) {
      console.log("Error while inserting a user into the database", err);
      return res.status(400).json({ message: "Failed to create a new assignment." });
    }
    return res.status(201).json({ message: "New assignment successfully created!" });
  });
})

app.post("/api/createPlanner", (req, res) => {
  const { email, eventType, eventName , description, dueDate } = req.body;
  console.log("eventName : ========", eventName)

  const sql = "INSERT INTO planner (`planner_name`, `academic_email`, `planner_category`, `planner_detail`, `start_time`) VALUES (?, ?, ?, ?, ?)";

  connection.query(sql, [eventName, email, eventType, description, dueDate], (err, results) => {
    if (err) {
      console.log("Error while inserting a user into the database", err);
      return res.status(400).json({ message: "Failed to create a new assignment." });
    }
    return res.status(201).json({ message: "New assignment successfully created!" });
  });
})


app.listen(5001, function () {
  console.log('CORS-enabled web server listening on port 5001')
})

app.get('/api/getPlanner', function (req, res, next) {
  console.log("Query Planner");
  const email = req.query.email;
  connection.query(
    'SELECT `planner_name`, `planner_category`, `planner_detail`, `start_time` FROM `planner` WHERE `academic_email` = ?',
    [email],
    function(err, plannerResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Planner query error occurred' });
      } else {
        res.json(plannerResults);
        console.log("Planner IN");
      }
    }
  );
});