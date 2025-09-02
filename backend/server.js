const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err, str) => {
  if (err) {
    console.log("Error while connecting to db: ", err);
    return;
  }
  console.log("Connected to db successfully with thread id: ", db.threadId);
});

app.get("/", (req, res) => {
  const query = "SELECT * FROM student";
  db.query(query, (err, data) => {
    if (err) return res.json("Error", err);
    return res.json(data);
  });
});

app.post("/add-student", (req, res) => {
  const query = "INSERT INTO student (name, email) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(query, [values], (err, data) => {
    if (err) return res.json("Error", err);
    return res.json(data);
  });
});

app.put("/edit-student/:id", (req, res) => {
  const query = "UPDATE student SET name = ?, email = ? WHERE id = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  db.query(query, [...values, id], (err, data) => {
    if (err) return res.json("Error", err);
    return res.json(data);
  });
});

app.delete("/delete-student/:id", (req, res) => {
  const query = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;
  db.query(query, [id], (err, data) => {
    if (err) return res.json("Error", err);
    return res.json(data);
  });
});

const PORT = process.env.APP_PORT || 8081;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
