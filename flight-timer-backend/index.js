const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// JWT secret key
const secretKey = 'my-secret-key';

// Authenticate user and generate JWT
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Connect to the MySQL database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-timer-app'
  });

  // Check if user exists and password is correct
  const sql = 'SELECT id FROM users WHERE username = ? AND password = ?';
  const values = [username, password];
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      // Generate JWT and send to client
      const userId = results[0].id;
      const token = jwt.sign({ userId }, secretKey);
      res.status(200).json({ token });
    }
    connection.end();
  });
});

// Register new user
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Connect to the MySQL database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-timer-app'
  });

  // Add new user to the database
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const values = [username, password];
  connection.query(sql, values, (error, results) => {
    if (error
