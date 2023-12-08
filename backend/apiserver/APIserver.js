/*
  This is the API server for the LearningMate application.
*/

/*
  Import the required modules.
*/
var express = require("express");
var cors = require("cors");
var app = express();
const mysql = require("mysql2");

/*
  Create a connection to the database.
*/
const connection = mysql.createConnection({
  host: "learningmate.cwfmrnlx2tvp.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "0909914229za",
  database: "learningmate",
});

/*
  Connect to the database.
*/
app.use(cors());
app.use(express.json());

/*
  This API endpoint is used to query the database for the list of classes that a student is enrolled in.
*/
app.get("/api/scheduleQuery", function (req, res, next) {
  connection.query(
    "SELECT cs.class_id, c.class_name, d.date_namdent` AS e, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_stu`cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id ORDER BY d.date_id, csd.start_time;",
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Schedule query error occurred" });
      } else {
        res.json(results);
      }
    },
  );
});

/*
  This API endpoint is used to query the user's role from the database.
*/
app.get("/api/checkRole", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT role FROM (SELECT role, academic_email FROM student UNION ALL SELECT role, academic_email FROM teacher) AS combined_data WHERE academic_email = ?;",
    [email],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Check role error occurred" });
      } else {
        console.log(results);
        res.json(results);
      }
    },
  );
});

/*
  This API endpoint is used to query the student's schedule from the database.
*/
app.get("/api/getStudentSchedule", function (req, res, next) {
  const email = req.query.email;
  connection.query(
    "SELECT cs.class_id, c.class_name, c.class_period_year, c.class_period_semester, d.date_name, csd.start_time, csd.end_time FROM `student` AS `s` JOIN `class_student` AS `cs` ON cs.student_id = s.student_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;",
    [email],
    function (err, studentResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Student schedule query error occurred" });
      } else {
        res.json(studentResults);
      }
    },
  );
});

/*
  This API endpoint is used to query the teacher's schedule from the database.
*/
app.get("/api/getTeacherSchedule", function (req, res, next) {
  const email = req.query.email;
  connection.query(
    "SELECT cs.class_id, c.class_name, c.class_period_year, c.class_period_semester, d.date_name, csd.start_time, csd.end_time FROM `teacher` AS `s` JOIN `class_lecturer` AS `cs` ON cs.teacher_id = s.teacher_id JOIN `class_schedule` AS `csd` ON cs.class_id = csd.class_id JOIN `date` AS `d` ON d.date_id = csd.date_id JOIN `class` AS `c` ON c.class_id = csd.class_id WHERE s.academic_email = ? ORDER BY d.date_id, csd.start_time;",
    [email],
    function (err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Teacher schedule query error occurred" });
      } else {
        res.json(teacherResults);
      }
    },
  );
});

/*
  This API endpoint is used to query the teacher's assignment from the database.
*/
app.get("/api/getTeacherAssignment", function (req, res, next) {
  const email = req.query.email;
  connection.query(
    'SELECT ac.`class_id`, ac.class_name, ac.assignment_name, ac.assignment_id, ac.assignment_due_date, COUNT(CASE WHEN asu.status > 0 THEN 1 END) as "Submit_Count", COUNT(asu.student_id) as "Assigned_Count" FROM `assignment_submission` as asu LEFT JOIN (SELECT c.`class_id`, a.assignment_id, c.`class_name`, a.`assignment_name`, a.`assignment_due_date` FROM `assignment` as a LEFT JOIN `class` as c ON a.`class_id` = `c`.`class_id`) as ac ON asu.assignment_id = ac.assignment_id GROUP BY ac.`assignment_id` HAVING ac.`class_id` IN (SELECT `class_id` FROM `class_lecturer` WHERE `teacher_id` = (SELECT `teacher_id` FROM `teacher` as t WHERE t.academic_email = ?));;',
    [email],
    function (err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Teacher assignment query error occurred" });
      } else {
        res.json(teacherResults);
      }
    },
  );
});

/*
  This API endpoint is used to query the planner for the user from the database.
*/
app.get("/api/getPlanner", function (req, res, next) {
  const email = req.query.email;
  connection.query(
    "SELECT  `planner_id`, `planner_name`, `planner_category`, `planner_detail`, `start_time` FROM `planner` WHERE `academic_email` = ? ORDER BY start_time ASC;",
    [email],
    function (err, plannerResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Planner query error occurred" });
      } else {
        res.json(plannerResults);
      }
    },
  );
});

/*
  This API endpoint is used to query the student's assignment from the database.
*/
app.get("/api/getStudentAssignment", function (req, res, next) {
  const email = req.query.email;
  connection.query(
    "SELECT c.class_id, c.class_name, asm.assignment_name, asm.assignment_publish_date, asm.assignment_due_date, asub.status FROM `assignment_submission` AS asub JOIN `student` AS s ON asub.student_id = s.student_id JOIN `assignment` AS asm ON asm.assignment_id = asub.assignment_id JOIN `class` AS c ON asm.class_id = c.class_id WHERE s.academic_email = ?",
    [email],
    function (err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Teacher assignment query error occurred" });
      } else {
        res.json(teacherResults);
      }
    },
  );
});

/*
  This API endpoint is used to post the student's assignment submission to the database.
*/
app.post("/api/submitAssignment", (req, res) => {
  const { student_id, assID, formattedCurrentDate, formattedDueDate } =
    req.body;

  let status = 0; // not submit

  if (formattedDueDate < formattedCurrentDate) {
    status = 2; // late submit
  } else {
    status = 1; // on-time submit
  }

  const sql =
    "UPDATE assignment_submission SET status = ?, submission_date = ? WHERE student_id = ? AND assignment_id = ?";

  connection.query(
    sql,
    [status, formattedCurrentDate, student_id, assID],
    (err, results) => {
      if (err) {
        console.log("Error while updating a submission from the database", err);
        return res
          .status(400)
          .json({ message: "Failed to update a submission." });
      }
      return res
        .status(201)
        .json({ message: "Submission successfully updated!" });
    },
  );
});

/*
  This API endpoint is used to query the Assignment ID from the database.
*/
app.get("/api/getAssignmentID", function (req, res, next) {
  connection.query(
    "SELECT MAX(assignment_id) as maxAssignmentId FROM assignment",
    function (err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Assignment ID query error occurred" });
      } else {
        const maxAssignmentId = notiResults[0].maxAssignmentId;
        res.json({ maxAssignmentId });
      }
    },
  );
});

/*
  This API endpoint is used to query Assignment ID and due date from the database.
*/
app.get("/api/getSubjectAssignmentID", function (req, res, next) {
  const assignment_name = req.query.assignment_name;
  connection.query(
    "SELECT assignment_id, assignment_due_date FROM `assignment` WHERE assignment_name = ?;",
    [assignment_name],
    function (err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Student query error occurred" });
      } else {
        res.json(studentResults);
      }
    },
  );
});

/*
  This API endpoint is used to query student list from the database.
*/
app.get("/api/getStudent", function (req, res, next) {
  const classID = req.query.classID;
  connection.query(
    "SELECT student_id FROM `class_student` WHERE class_id = ?;",
    [classID],
    function (err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Student query error occurred" });
      } else {
        res.json(studentResults);
      }
    },
  );
});

/*
  This API endpoint is used to post the student's assignment submission status to the database.
*/
app.post("/api/generateStatus", (req, res) => {
  const { dataToInsert } = req.body;

  if (
    !dataToInsert ||
    !Array.isArray(dataToInsert) ||
    dataToInsert.length === 0
  ) {
    return res.status(400).json({
      message: "Invalid request: dataToInsert is missing or not an array.",
    });
  }

  const sql =
    "INSERT INTO assignment_submission (`student_id`, `assignment_id`, `status`, `submission_date`) VALUES ?";

  connection.query(sql, [dataToInsert], (err, results) => {
    if (err) {
      console.log("Error while inserting rows into the database", err);
      return res
        .status(400)
        .json({ message: "Failed to create new assignments." });
    }
    return res
      .status(201)
      .json({ message: "New assignments successfully created!" });
  });
});

/*
  This API endpoint is used to query classes that student is enrolled in from the database.
*/
app.get("/api/getClass", (req, res) => {
  const email = req.query.email;

  connection.query(
    "SELECT cs.class_id, c.class_name, c.class_period_year, c.class_period_semester FROM class_student AS cs JOIN student AS s ON s.student_id = cs.student_id JOIN class AS c ON cs.class_id = c.class_id WHERE academic_email = ?;",
    [email],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error querying classes." });
      } else {
        res.json(results);
      }
    },
  );
});

/*
  This API endpoint is used to query classes that teacher has reponsed in from the database.
*/
app.get("/api/getClassTeacher", (req, res) => {
  const email = req.query.email;

  connection.query(
    "SELECT cl.class_id, c.class_name, c.class_period_year, c.class_period_semester FROM class_lecturer AS cl JOIN teacher AS t ON t.teacher_id = cl.teacher_id JOIN class AS c ON cl.class_id = c.class_id WHERE academic_email = ? ORDER BY c.class_name ASC;;",
    [email],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error querying classes." });
      } else {
        res.json(results);
      }
    },
  );
});

/*
  This API endpoint is used to post new planner to the database.
*/
app.post("/api/createPlanner", (req, res) => {
  const { email, eventType, eventName, description, dueDate } = req.body;

  const sql =
    "INSERT INTO planner (`planner_name`, `academic_email`, `planner_category`, `planner_detail`, `start_time`) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [eventName, email, eventType, description, dueDate],
    (err, results) => {
      if (err) {
        console.log("Error while inserting a user into the database", err);
        return res
          .status(400)
          .json({ message: "Failed to create a new assignment." });
      }
      return res
        .status(201)
        .json({ message: "New assignment successfully created!" });
    },
  );
});

/*
  This API endpoint is used to update the planner in the database.
*/
app.post("/api/editPlanner", (req, res) => {
  const { plannerName, plannerId, email, eventType, description, dueDate } =
    req.body;

  const sql =
    "UPDATE planner SET planner_name = ?, planner_category = ?, planner_detail = ?, start_time = ? WHERE planner_id = ? AND academic_email = ?";

  connection.query(
    sql,
    [plannerName, eventType, description, dueDate, plannerId, email],
    (err, results) => {
      if (err) {
        console.log("Error while updating a planner from the database", err);
        return res.status(400).json({ message: "Failed to update a planner." });
      }
      return res.status(201).json({ message: "Planner successfully updated!" });
    },
  );
});

/*
  This API endpoint is used to delete a planner from the database.
*/
app.delete("/api/deletePlanner", (req, res) => {
  const { plannerId, email } = req.body;

  const sql = "DELETE FROM planner WHERE planner_id = ? AND academic_email = ?";

  connection.query(sql, [plannerId, email], (err, results) => {
    if (err) {
      console.log("Error while deleting a planner from the database", err);
      return res.status(400).json({ message: "Failed to delete a planner." });
    }
    return res.status(201).json({ message: "Planner successfully deleted!" });
  });
});

/*
  This API endpoint is used to query planner notifications from the database.
*/
app.get("/api/getTodayNotiPlanner", function (req, res, next) {
  const email = req.query.email;
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  // Format the date as a string with time set to 00:00:00
  const initialDate = currentDate.toISOString().split("T")[0] + " 00:00:00";
  currentDate.setHours(currentDate.getHours() + 24);
  const endDate = currentDate.toISOString().split("T")[0] + " 00:00:00";

  connection.query(
    "SELECT p.planner_name FROM planner AS p WHERE p.academic_email = ? AND p.start_time >= ? AND p.start_time < ?;",
    [email, initialDate, endDate],
    function (err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Today noti query error occurred" });
      } else {
        res.json(notiResults);
      }
    },
  );
});

/*
  This API endpoint is used to query student's assignment notifications from the database.
*/
app.get("/api/getTodayNotiAssignmentStudent", function (req, res, next) {
  const email = req.query.email;
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  // Format the date as a string with time set to 00:00:00
  const initialDate = currentDate.toISOString().split("T")[0] + " 00:00:00";
  currentDate.setHours(currentDate.getHours() + 24);
  const endDate = currentDate.toISOString().split("T")[0] + " 00:00:00";

  connection.query(
    "SELECT a.class_id, a.assignment_name FROM assignment AS a JOIN class_student AS cs ON cs.class_id = a.class_id JOIN student AS s ON cs.student_id = s.student_id WHERE s.academic_email = ? AND a.assignment_end_date >= ? AND a.assignment_end_date < ?;",
    [email, initialDate, endDate],
    function (err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Today noti query error occurred" });
      } else {
        res.json(notiResults);
      }
    },
  );
});

/*
  This API endpoint is used to query teacher's assignment notifications from the database.
*/
app.get("/api/getTodayNotiAssignmentTeacher", function (req, res, next) {
  const email = req.query.email;
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  // Format the date as a string with time set to 00:00:00
  const initialDate = currentDate.toISOString().split("T")[0] + " 00:00:00";
  currentDate.setHours(currentDate.getHours() + 24);
  const endDate = currentDate.toISOString().split("T")[0] + " 00:00:00";

  connection.query(
    "SELECT a.class_id, a.assignment_name FROM assignment AS a JOIN class_lecturer AS cs ON cs.class_id = a.class_id JOIN teacher AS s ON cs.teacher_id = s.teacher_id WHERE s.academic_email = ? AND a.assignment_publish_date >= ? AND a.assignment_publish_date < ?;",
    [email, initialDate, endDate],
    function (err, notiResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Today noti query error occurred" });
      } else {
        res.json(notiResults);
      }
    },
  );
});

/*
  This API endpoint is used to post new assignment into the database.
*/
app.post("/api/createAssignment", (req, res) => {
  const { classID, assName, dueDate, description } = req.body;
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const sql =
    "INSERT INTO assignment (`class_id`, `assignment_name`, `assignment_publish_date`, `assignment_due_date`, `assignment_desciption`) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [classID, assName, formattedDate, dueDate, description],
    (err, results) => {
      if (err) {
        console.log("Error while inserting a user into the database", err);
        return res
          .status(400)
          .json({ message: "Failed to create a new assignment." });
      }
      return res
        .status(201)
        .json({ message: "New assignment successfully created!" });
    },
  );
});

/*
  This API endpoint is used to query student's personal information from the database.
*/
app.get("/api/getStudentPersonalInfo", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT s.student_id, s.student_name, s.gender, s.academic_year, s.room, f.faculty_name, d.department_name, de.degree_name, s.date_of_birth, t.teacher_name, s.id_card, s.personal_email FROM `student` as s JOIN `teacher` as t ON s.teacher_id = t.teacher_id JOIN `department` as d ON s.department_id = d.department_id JOIN `faculty` as f ON d.faculty_id = f.faculty_id JOIN `degree` as de ON s.degree_id = de.degree_id WHERE s.academic_email = ?;",
    [email],
    function (err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Student query error occurred" });
      } else {
        res.json(studentResults);
      }
    },
  );
});

/*
  This API endpoint is used to query activity summary from the database.
*/
app.get("/api/getActivitySummary", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    'SELECT SUM(a.activity_hour) as "totalHours" FROM `activity_attendants` as aa LEFT JOIN `activity` as a ON a.activity_id = aa.activity_id WHERE aa.student_id = (SELECT s.student_id FROM student as s WHERE s.academic_email = ?);',
    [email],
    function (err, studentResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Activity summary query error occurred" });
      } else {
        res.json(studentResults);
      }
    },
  );
});

/*
  This API endpoint is used to query list of activities from the database.
*/
app.get("/api/getActivityList", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT a.activity_name, a.activity_hour FROM `activity_attendants` as aa LEFT JOIN `activity` as a ON a.activity_id = aa.activity_id WHERE aa.student_id = (SELECT s.student_id FROM student as s WHERE s.academic_email = ?) ORDER BY a.activity_name;",
    [email],
    function (err, studentResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Activity query error occurred" });
      } else {
        res.json(studentResults);
      }
    },
  );
});

/*
  This API endpoint is used to query teacher's personal information from the database.
*/
app.get("/api/getTeacherPersonalInfo", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT t.teacher_id, t.teacher_name, t.gender, f.faculty_name, d.department_name, t.date_of_birth, t.id_card, t.personal_email FROM `teacher` as t JOIN `department` as d ON t.department_id = d.department_id JOIN `faculty` as f ON d.faculty_id = f.faculty_id WHERE t.academic_email = ?;",
    [email],
    function (err, teacherResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Teacher query error occurred" });
      } else {
        res.json(teacherResults);
      }
    },
  );
});

/*
  This API endpoint is used to query the grades of a student from the database.
*/
app.get("/api/getGrades", function (req, res) {
  const email = req.query.email;

  connection.query(
    "SELECT c.class_id, c.class_name, cs.grade, c.class_credit, c.class_period_year, c.class_period_semester FROM class AS c JOIN class_student AS cs ON cs.class_id = c.class_id JOIN student AS s ON s.student_id = cs.student_id WHERE s.academic_email = ? AND cs.grade IS NOT NULL ORDER BY c.class_id;",
    [email],
    function (err, result) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Get student grades query error occurted" });
      } else {
        res.json(result);
      }
    },
  );
});

/*
  This API endpoint is used to query the current semester for a student from the database.
*/
app.get("/api/getCurrentSemesterForStudent", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT c.class_period_year, c.class_period_semester FROM class AS c JOIN class_student AS cs ON c.class_id = cs.class_id JOIN student AS s ON s.student_id = cs.student_id WHERE s.academic_email = ? ORDER BY c.class_period_year DESC, c.class_period_semester DESC LIMIT 1;",
    [email],
    function (err, semesterResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Current semester query error occurred" });
      } else {
        res.json(semesterResults);
      }
    },
  );
});

/*
  This API endpoint is used to post the announcement of a class to the database.
*/
app.post("/api/postAnnouncement", (req, res) => {
  const { classID, announcement } = req.body;

  const sql = "UPDATE class SET class_announcement = ? WHERE class_id = ?;";

  connection.query(sql, [announcement, classID], (err, results) => {
    if (err) {
      console.log("Error while updating class announcement", err);
      return res
        .status(400)
        .json({ message: "Failed to update class announcement." });
    }
    return res
      .status(201)
      .json({ message: "New announcement has been posted!" });
  });
});

/*
  This API endpoint is used to query the announcement of a class from the database.
*/
app.get("/api/queryAnnouncement", function (req, res, next) {
  const classID = req.query.classID;

  connection.query(
    "SELECT class_announcement FROM `class` WHERE class_id = ?;",
    [classID],
    function (err, announcementResults, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Announcement query error occurred" });
      } else {
        res.json(announcementResults);
      }
    },
  );
});

/*
  This API endpoint is used to query the current semester for the teacher from the database.
*/
app.get("/api/getCurrentSemesterForTeacher", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT c.class_period_year, c.class_period_semester FROM class AS c JOIN class_lecturer AS cl ON c.class_id = cl.class_id JOIN teacher AS t ON t.teacher_id = cl.teacher_id WHERE t.academic_email = ? ORDER BY c.class_period_year DESC, c.class_period_semester DESC LIMIT 1;",
    [email],
    function (err, semesterResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Current semester query error occurred" });
      } else {
        res.json(semesterResults);
      }
    },
  );
});

/*
  This API endpoint is used to delete an assignment from the database.
*/
app.delete("/api/deleteAssignment", (req, res) => {
  const assName = req.query.assName;

  const sql =
    "DELETE FROM assignment_submission WHERE assignment_id IN (SELECT assignment_id FROM assignment WHERE assignment_name = ?);";

  connection.query(sql, [assName], (err, results) => {
    if (err) {
      console.log(
        "Error while deleting an assignment from the table assignment_submission in the database",
        err,
      );
      return res
        .status(400)
        .json({ message: "Failed to delete an assignment." });
    }

    // Send the response for the assignment_submission deletion
    res.status(201).json({
      message:
        "Assignment successfully deleted from the table assignment_submission!",
    });

    // Perform the second query to delete from the 'assignment' table
    const sql2 = "DELETE FROM assignment WHERE assignment_name = ?;";

    connection.query(sql2, [assName], (err2, results2) => {
      if (err2) {
        console.log(
          "Error while deleting an assignment from the table assignment in the database",
          err2,
        );
      } else {
        // Send a response for the 'assignment' table deletion if it was successful
        console.log(
          "Assignment successfully deleted from the table assignment!",
        );
      }
    });
  });
});

/*
  This API endpoint is used to edit an assignment information from the database.
*/
app.post("/api/editAssignment", (req, res) => {
  const { classID, assName, dueDate, description, assNameOld } = req.body;

  const sql =
    "UPDATE assignment SET assignment_name = ?, assignment_due_date = ?, assignment_desciption = ? WHERE assignment_name = ? AND class_id = ?";

  connection.query(
    sql,
    [assName, dueDate, description, assNameOld, classID],
    (err, results) => {
      if (err) {
        console.log(
          "Error while updating an assignment from the database",
          err,
        );
        return res
          .status(400)
          .json({ message: "Failed to update an assignment." });
      }
      return res
        .status(201)
        .json({ message: "Assignment successfully updated!" });
    },
  );
});

/*
  This API endpoint is used to query distinct semester and year list for student from the database.
*/
app.get("/api/getSemesterYear", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT DISTINCT(c.class_period_year) , c.class_period_semester FROM `student` AS s JOIN `class_student` AS cs ON s.student_id = cs.student_id JOIN `class` AS c ON cs.class_id = c.class_id WHERE s.academic_email = ? ORDER BY c.class_period_year DESC, c.class_period_semester DESC;",
    [email],
    function (err, semesterListResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "List of semester query error occurred" });
      } else {
        res.json(semesterListResults);
      }
    },
  );
});

/*
  This API endpoint is used to query distinct semester and year list for teacher from the database.
*/
app.get("/api/getSemesterYearTeacher", function (req, res, next) {
  const email = req.query.email;

  connection.query(
    "SELECT DISTINCT c.class_period_year, c.class_period_semester FROM class AS c JOIN class_lecturer AS cl ON c.class_id = cl.class_id JOIN teacher AS t ON cl.teacher_id = t.teacher_id WHERE t.academic_email = ?;",
    [email],
    function (err, semesterListResults, fields) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "List of semester query error occurred" });
      } else {
        res.json(semesterListResults);
      }
    },
  );
});

/*
  Start the server on port 5001
*/
app.listen(5001, function () {
  console.log("CORS-enabled web server listening on port 5001");
});
