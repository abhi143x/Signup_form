const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // <-- Load .env variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL Database.");
});

// Ping test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Signup Route
// Signup Route (insert + return all data)
app.post("/signup", (req, res) => {
  const { fullname, email, contact, password } = req.body;

  const Sql = "INSERT INTO users (fullname, email, contact, password) VALUES (?, ?, ?, ?)";
  db.query(Sql, [fullname, email, contact, password], (err, result) => {
    if (err) {
      console.error("MySQL Insert Error:", err.code, err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }

    // After successful insert, get all data
    const selectSql = "SELECT * FROM users";
    db.query(selectSql, (err, users) => {
      if (err) {
        console.error("MySQL Select Error:", err.code, err.sqlMessage);
        return res.status(500).json({ error: err.sqlMessage });
      }

      res.status(201).json({
        message: "User registered successfully!",
        users: users // send all users back
      });
    });
  });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

