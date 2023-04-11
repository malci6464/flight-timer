const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const port = process.env.PORT;

// Create a new Express.js application
const app = express();

// Use the Body Parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a route to handle POST requests to log flight times
app.post("/log-flight-time", (req, res) => {
  console.log("hello!!!!");
  const pilotName = req.body.pilotName;
  const taskName = req.body.taskName;
  const flightTime = req.body.flightTime;

  // Connect to the MySQL database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  // Insert the logged time into the database
  const sql =
    "INSERT INTO new_table (pilot_name, task_name, flight_time) VALUES (?, ?, ?)";
  const values = [pilotName, taskName, flightTime];
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Flight time logged successfully" });
    }
    connection.end();
  });
});

// Start the Express.js server
app.listen(port, () => {
  console.log("API server running");
});
