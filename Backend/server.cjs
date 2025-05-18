const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",  // Change to your MySQL username
    password: "abhi@123",  // Change to your MySQL password
    database: "signup_db"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL Database.");
});

// Signup Route
app.post("/signup", (req, res) => {
    const { fullname, email, contact, password } = req.body;
    const sql = "INSERT INTO users (fullname, email, contact, password) VALUES (?, ?, ?, ?)";

    db.query(sql, [fullname, email, contact, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User registered successfully!" });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
