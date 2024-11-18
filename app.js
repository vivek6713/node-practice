const express = require("express");
const bodyParser = require("body-parser");
const subjectRoutes = require("./routes/subject");
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");
const reportRoutes = require("./routes/report");

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/subject", subjectRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/report", reportRoutes);

// globale error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Unknown Error",
  });
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
