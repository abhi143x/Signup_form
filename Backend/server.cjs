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
app.post("/signup", (req, res) => {
  const { fullname, email, contact, password } = req.body;

  // Log user data to the console
  console.log("New signup request:");
  console.log("Full Name:", fullname);
  console.log("Email:", email);
  console.log("Contact:", contact);
  console.log("Password:", password);

  const sql =
    "INSERT INTO users (fullname, email, contact, password) VALUES (?, ?, ?, ?)";

  db.query(sql, [fullname, email, contact, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

