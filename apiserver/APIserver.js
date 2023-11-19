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
// const mysql = require('mysql2');

// // create the connection to database
// const connection = mysql.createConnection({
//     host: 'learningmate.cwfmrnlx2tvp.ap-southeast-1.rds.amazonaws.com',
//     user: 'admin',
//     password: '0909914229za',
//     database: 'learningmate'
//   });

// app.use(cors())

// app.get('/api/scheduleQuery', function (req, res, next) {
//   console.log("schedule query log test");
//   connection.query(
//     'SELECT cs.class_id, c.class_name, d.date_namdent` AS e, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_stu`cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id ORDER BY d.date_id, csd.start_time;'
//     ,
//     function(err, results, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Schedule query error occurred' });
//       } else {
//         res.json(results);
//       }
//     }
//   );
// })

// app.get('/api/checkRole', function (req, res, next) {
//   console.log("Begin check role");
//   // const email = "ramin.such@kmutt.ac.th";
//   const email = req.query.email;
//   console.log(req.query);
//   console.log(email);

//   connection.query(
//     'SELECT role FROM (SELECT role, academic_email FROM student UNION ALL SELECT role, academic_email FROM teacher) AS combined_data WHERE academic_email = ?;',
//     [email], 
//     function(err, results, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Check role error occurred' });
//       } else {
//         console.log(results);
//         res.json(results);
//       }
//     }
//   );
//   console.log("Done check role");
// });

// app.get('/api/getStudentSchedule', function (req, res, next) {
//   console.log("Query Student Schedule");
//   const email = req.query.email;
//   connection.query(
//     'SELECT cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_student` AS `cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
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
// });

// app.get('/api/getTeacherSchedule', function (req, res, next) {
//   console.log("Query Teacher Schedule");
//   const email = req.query.email;
//   connection.query(
//     'SELECT cs.class_id, c.class_name, d.date_name, csd.start_time, csd.end_time FROM `teacher` AS `s` JOIN `class_lecturer` AS `cs` ON cs.teacher_id = s.teacher_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;',
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
// });

// app.get('/api/getTeacherAssignment', function (req, res, next) {
//   console.log("Query Teacher Assignment");
//   const email = req.query.email;
//   connection.query(
//     'SELECT a.class_id, a.assignment_name, a.assignment_publish_date, a.assignment_due_date FROM assignment AS a JOIN class_lecturer AS cl ON cl.class_id = a.class_id JOIN teacher AS t ON t.teacher_id = cl.teacher_id WHERE t.academic_email = ?;',
//     [email],
//     function(err, teacherResults, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Teacher assignment query error occurred' });
//       } else {
//         res.json(teacherResults);
//         console.log("teacher IN");
//       }
//     }
//   );
// });

// app.get('/api/getStudentAssignment', function (req, res, next) {
//   console.log("Query Student Assignment");
//   const email = req.query.email;
//   connection.query(
//     'SELECT a.class_id, a.assignment_name, a.assignment_publish_date, a.assignment_due_date FROM assignment AS a JOIN class_student AS cl ON cl.class_id = a.class_id JOIN student AS t ON t.student_id = cl.student_id WHERE t.academic_email = ?;',
//     [email],
//     function(err, teacherResults, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Teacher assignment query error occurred' });
//       } else {
//         res.json(teacherResults);
//         console.log("teacher IN");
//       }
//     }
//   );
// });

// app.post("/api/createAssignment", (req, res) => {
//   console.log("REQ QUERY = "+req.query)
//   const { classID, assName, dueDate, description } = req.query;

//   console.log(classID)
//   const currentDate = new Date();
//   const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

//   const sql = "INSERT INTO assignment (`class_id`, `assignment_name`, `assignment_publish_date`, `assignment_due_date`, `assignment_desciption`) VALUES (?, ?, ?, ?, ?)";

//   connection.query(sql, [classID, assName, formattedDate, dueDate, description], (err, results) => {
//     if (err) {
//       console.log("Error while inserting a user into the database", err);
//       return res.status(400).json({ message: "Failed to create a new assignment." });
//     }
//     return res.status(201).json({ message: "New assignment successfully created!" });
//   });
// })


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

// app.get('/api/queryIdCard', function (req, res, next) {
//   console.log("query id card");
//   // const email = req.query.email;
//   const email = "ramin.such@kmutt.ac.th"
//   console.log(email);

//   connection.query(
//     'SELECT `id_card` FROM `student` WHERE academic_email = ?;',
//     [email], 
//     // 'SELECT `id_card` FROM `student` WHERE academic_email = "ramin.such@kmutt.ac.th";',
//     function(err, results, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Query id card error occurred' });
//       } else {
//         res.json(results);
//       }
//     }
//   );
//   console.log("query id card");
// });

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
    'SELECT ac.`class_id`, ac.class_name, ac.assignment_name, ac.assignment_id, ac.assignment_due_date, COUNT(CASE WHEN asu.status > 0 THEN 1 END) as "Submit_Count", COUNT(asu.student_id) as "Assigned_Count" FROM `assignment_submission` as asu LEFT JOIN (SELECT c.`class_id`, a.assignment_id, c.`class_name`, a.`assignment_name`, a.`assignment_due_date` FROM `assignment` as a LEFT JOIN `class` as c ON a.`class_id` = `c`.`class_id`) as ac ON asu.assignment_id = ac.assignment_id GROUP BY ac.`assignment_id` HAVING ac.`class_id` IN (SELECT `class_id` FROM `class_lecturer` WHERE `teacher_id` = (SELECT `teacher_id` FROM `teacher` as t WHERE t.academic_email = ?));;',
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
    'SELECT c.class_id, c.class_name, asm.assignment_name, asm.assignment_publish_date, asm.assignment_due_date, asub.status FROM `assignment_submission` AS asub JOIN `student` AS s ON asub.student_id = s.student_id JOIN `assignment` AS asm ON asm.assignment_id = asub.assignment_id JOIN `class` AS c ON asm.class_id = c.class_id WHERE s.academic_email = ?',
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

app.get("api/getPlanner", (req, res) => {
  const email = req.query.email;

  connection.query(
    'SELECT planner_category, planner_name, planner_detail, start_time FROM planner WHERE academic_email = ?;',
    [email],
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error querying planner.' });
      } else {
        res.json(results);
      }
    }
  );
})

app.delete('/api/deletePlanner', (req, res) => {
  const { plannerName, email } = req.body;
  console.log("plannerName : ========", plannerName)

  const sql = "DELETE FROM planner WHERE planner_name = ? AND academic_email = ?";

  connection.query(sql, [plannerName, email], (err, results) => {
    if (err) {
      console.log("Error while deleting a planner from the database", err);
      return res.status(400).json({ message: "Failed to delete a planner." });
    }
    return res.status(201).json({ message: "Planner successfully deleted!" });
  });
})

app.post('/api/editPlanner', (req, res) => {
  const { plannerName, email, eventType, description, dueDate } = req.body;
  console.log("plannerName : ========", plannerName)

  const sql = "UPDATE planner SET planner_category = ?, planner_detail = ?, start_time = ? WHERE planner_name = ? AND academic_email = ?";

  connection.query(sql, [eventType, description, dueDate, plannerName, email], (err, results) => {
    if (err) {
      console.log("Error while updating a planner from the database", err);
      return res.status(400).json({ message: "Failed to update a planner." });
    }
    return res.status(201).json({ message: "Planner successfully updated!" });
  });
})

app.get("/api/getClass", (req, res) => {
  const email = req.query.email;

  connection.query(
    'SELECT cs.class_id, c.class_name FROM class_student AS cs JOIN student AS s ON s.student_id = cs.student_id JOIN class AS c ON cs.class_id = c.class_id WHERE academic_email = ?;',
    [email],
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error querying classes.' });
      } else {
        res.json(results);
      }
    }
  );
})

app.get('/api/getTodayNotiPlanner', function (req, res, next) {
  console.log("Query Today Noti Planner");
  const email = req.query.email;

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7)
  
  // Format the date as a string with time set to 00:00:00
  const initialDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';
  currentDate.setHours(currentDate.getHours() + 24)
  const endDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';

  connection.query(
    'SELECT p.planner_name FROM planner AS p WHERE p.academic_email = ? AND p.start_time >= ? AND p.start_time < ?;',
    [email, initialDate, endDate],
    function(err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Today noti query error occurred' });
      } else {
        res.json(notiResults);
        console.log("noti IN");
      }
    }
  );
});

app.get('/api/getTodayNotiAssignmentStudent', function (req, res, next) {
  console.log("Query Today Noti Assignment Student");
  const email = req.query.email;

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7)
  
  // Format the date as a string with time set to 00:00:00
  const initialDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';
  currentDate.setHours(currentDate.getHours() + 24)
  const endDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';

  connection.query(
    'SELECT a.class_id, a.assignment_name FROM assignment AS a JOIN class_student AS cs ON cs.class_id = a.class_id JOIN student AS s ON cs.student_id = s.student_id WHERE s.academic_email = ? AND a.assignment_end_date >= ? AND a.assignment_end_date < ?;',
    [email, initialDate, endDate],
    function(err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Today noti query error occurred' });
      } else {
        res.json(notiResults);
        console.log("noti IN");
      }
    }
  );
});

app.get('/api/getTodayNotiAssignmentTeacher', function (req, res, next) {
  console.log("Query Today Noti Assignment Teacher");
  const email = req.query.email;

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7)
  
  // Format the date as a string with time set to 00:00:00
  const initialDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';
  currentDate.setHours(currentDate.getHours() + 24)
  const endDate = currentDate.toISOString().split('T')[0] + ' 00:00:00';

  connection.query(
    'SELECT a.class_id, a.assignment_name FROM assignment AS a JOIN class_lecturer AS cs ON cs.class_id = a.class_id JOIN teacher AS s ON cs.teacher_id = s.teacher_id WHERE s.academic_email = ? AND a.assignment_publish_date >= ? AND a.assignment_publish_date < ?;',
    [email, initialDate, endDate],
    function(err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Today noti query error occurred' });
      } else {
        res.json(notiResults);
        console.log("noti IN");
      }
    }
  );
});

app.get('/api/getAssignmentID', function (req, res, next) {
  console.log("Query Assignment ID");

  connection.query(
    'SELECT MAX(assignment_id) as maxAssignmentId FROM assignment',
    function(err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Assignment ID query error occurred' });
      } else {
        const maxAssignmentId = notiResults[0].maxAssignmentId;
        console.log(maxAssignmentId);
        res.json({ maxAssignmentId });
      }
    }
  );
});

app.post("/api/generateStatus", (req, res) => {
  const { dataToInsert } = req.body;
  console.log("dataToInsert: ", dataToInsert)

  if (!dataToInsert || !Array.isArray(dataToInsert) || dataToInsert.length === 0) {
    return res.status(400).json({ message: "Invalid request: dataToInsert is missing or not an array." });
  }
  
  const sql = "INSERT INTO assignment_submission (`student_id`, `assignment_id`, `status`, `submission_date`) VALUES ?";

  connection.query(sql, [dataToInsert], (err, results) => {
    if (err) {
      console.log("Error while inserting rows into the database", err);
      return res.status(400).json({ message: "Failed to create new assignments." });
    }
    return res.status(201).json({ message: "New assignments successfully created!" });
  });
});

app.get('/api/getStudent', function (req, res, next) {
  console.log("Query Student Schedule");
  const classID = req.query.classID;
  console.log("ClassID student query: ", classID);
  connection.query(
    'SELECT student_id FROM `class_student` WHERE class_id = ?;',
    [classID],
    function(err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Student query error occurred' });
      } else {
        console.log("success student query");
        res.json(studentResults);
      }
    }
  );
});

app.get('/api/getStudentIdFromEmail', function (req, res, next) {
  console.log("Query Student ID");
  const email = req.query.email;
  console.log("email student query: ", email);
  connection.query(
    'SELECT student_id FROM `student` WHERE academic_email = ?;',
    [email],
    function(err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Student query error occurred' });
      } else {
        console.log("success student query");
        res.json(studentResults);
      }
    }
  );
});

app.get('/api/getAssignmentDueDate', function (req, res, next) {
  console.log("Query Assignment Due Date");
  const assignmentID = req.query.assignmentID;
  console.log("assignmentID: ", assignmentID);
  connection.query(
    'SELECT assignment_due_date FROM `assignment` WHERE assignment_id = ?;',
    [assignmentID],
    function(err, assignmentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Assignment query error occurred' });
      } else {
        console.log("success assignment query");
        res.json(assignmentResults);
      }
    }
  );
});

// app.get('/api/getSpecificAssignmentID', function (req, res, next) {
//   console.log("Query Assignment ID");
//   const assignmentName = req.query.assignmentName;
//   console.log('assignmentName=', assignmentName)

//   connection.query(
//     'SELECT assignment_id FROM assignment WHERE assignment_name = ?',
//     [assignmentName],
//     function(err, notiResults, fields) {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Assignment ID query error occurred' });
//       } else {
//         const assignmentId = notiResults[0].assignment_id;
//         console.log('assignmentID = ', assignmentId);
//         res.json({ assignmentId });
//       }
//     }
//   );
// });

app.post('/api/submitAssignment', (req, res) => {
  const { student_id, assID, formattedCurrentDate, formattedDueDate } = req.body;
  console.log(req.body);
  console.log("studentID : ========", student_id)

  let status = 0; // not submit

  if (formattedDueDate < formattedCurrentDate) {
    status = 2; // late submit
  } else {
    status = 1; // on-time submit
  }

  const sql = "UPDATE assignment_submission SET status = ?, submission_date = ? WHERE student_id = ? AND assignment_id = ?";

  connection.query(sql, [status, formattedCurrentDate, student_id, assID], (err, results) => {
    if (err) {
      console.log("Error while updating a submission from the database", err);
      return res.status(400).json({ message: "Failed to update a submission." });
    }
    return res.status(201).json({ message: "Submission successfully updated!" });
  });
});

// app.get('/api/getPersonalInfo', function (req, res, next) {
//   console.log("Query Personal Info");
//   const { email, role } = req.query;
//   console.log("email: ", email);
//   console.log("role:", role)

//   if (role == 'student') {
//     connection.query(
//       'SELECT s.student_name, s.student_id, d.degree_name, dept.department_name FROM student AS s JOIN degree AS d ON d.degree_id = s.degree_id JOIN department AS dept ON s.department_id = dept.department_id WHERE s.academic_email = ?;',
//       [email],
//       function(err, studentResults, fields) {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Student query error occurred' });
//         } else {
//           console.log("success student query");
//           res.json(studentResults);
//         }
//       }
//     );
//   } else {
//     connection.query(
//       'SELECT s.teacher_name, s.teacher_id, dept.department_name FROM teacher AS s JOIN department AS dept ON s.department_id = dept.department_id WHERE s.academic_email = ?;',
//       [email],
//       function(err, teacherResults, fields) {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Teacher query error occurred' });
//         } else {
//           console.log("success teacher query");
//           res.json(teacherResults);
//         }
//       }
//     );
//   }
// });

app.get('/api/getActivityList', function (req, res, next) {
  console.log("Query Activity List");
  const email = req.query.email;
  console.log("email: ", email);

  connection.query(
    'SELECT a.activity_name, a.activity_hour FROM `activity_attendants` as aa LEFT JOIN `activity` as a ON a.activity_id = aa.activity_id WHERE aa.student_id = (SELECT s.student_id FROM student as s WHERE s.academic_email = ?);',
    [email],
    function(err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Activity query error occurred' });
      } else {
        console.log("success activity list query");
        res.json(studentResults);
      }
    }
  );
});

app.get('/api/getActivitySummary', function (req, res, next) {
  console.log("Query Activity Summary");
  const email = req.query.email;
  console.log("email: ", email);

  connection.query(
    'SELECT SUM(a.activity_hour) as "totalHours" FROM `activity_attendants` as aa LEFT JOIN `activity` as a ON a.activity_id = aa.activity_id WHERE aa.student_id = (SELECT s.student_id FROM student as s WHERE s.academic_email = ?);',
    [email],
    function(err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Activity summary query error occurred' });
      } else {
        console.log("success activity summary query");
        res.json(studentResults);
      }
    }
  );
});

app.get('/api/getPersonalInfoStudent', function (req, res) {
  console.log("Query Student Personal Info");
  const email = req.query;
  consolelog("Email = ", email);

  connection.query(
    'SELECT s.student_id, s.student_name, s.gender, s.academic_year, s.room, f.faculty_name, d.department_name, de.degree_name, s.date_of_birth, t.teacher_name, s.id_card, s.personal_email FROM `student` as s JOIN `teacher` as t ON s.teacher_id = t.teacher_id JOIN `department` as d ON s.department_id = d.department_id JOIN `faculty` as f ON d.faculty_id = f.faculty_id JOIN `degree` as de ON s.degree_id = de.degree_id WHERE s.academic_email = ?;',
    [email],
    function(err, result) {
      if(err) {
        console.error(err);
        res.status(500).json({ error: 'Student Personal Info Query error occerred'});
      } else {
        console.log("Success Student Personal Info query");
        res.json(result);
      }
    }
  )
})

app.get('/api/getPersonalInfoTeacher', function (req, res) {
  console.log("Query Teacher Personal Info");
  const email = req.query;
  console.log("Email = ", email);

  connection.query(
    'SELECT t.teacher_id, t.teacher_name, t.gender, f.faculty_name, d.department_name, t.date_of_birth, t.id_card, t.personal_email FROM `teacher` as t JOIN `department` as d ON t.department_id = d.department_id JOIN `faculty` as f ON d.faculty_id = f.faculty_id WHERE t.academic_email = ?;',
    [email],
    function(err, result) {
      if(err) {
        console.error(err);
        res.status(500).json({ error: 'Teacher Personal Info Query error occurred'});
      } else {
        console.log("Success Teacher Personal Info query");
        res.json(result);
      }
    }
  )
})

app.get('/api/getGrades', function (req, res) {
  console.log("Query Student Grades");
  const email = req.query.email;
  console.log("Email = ", email);

  connection.query(
    'SELECT c.class_id, c.class_name, cs.grade, c.class_credit, c.class_period_year, c.class_period_semester FROM class AS c JOIN class_student AS cs ON cs.class_id = c.class_id JOIN student AS s ON s.student_id = cs.student_id WHERE s.academic_email = ?;',
    [email],
    function(err, result) {
      if(err) {
        console.error(err);
        res.status(500).json({ error: 'Get student grades query error occurted'});
      } else {
        console.log("Success student grades query");
        res.json(result);
      }
    }
  )
})


app.listen(5001, function () {
  console.log('CORS-enabled web server listening on port 5001')
})