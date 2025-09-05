const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // adjust depending on RDS instance size
  queueLimit: 0,
});

// db.connect((err, str) => {
//   if (err) {
//     console.log("Error while connecting to db: ", err);
//     return;
//   }
//   console.log("Connected to db successfully with thread id: ", db.threadId);
// });

// health check endpoint
app.get("/ping", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (error) {
    res.status(500).json({ error: "DB not reachable", details: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("select * from student");
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching students", details: error.message });
  }
});

app.post("/add-student", async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query(
      "insert into student (name, email) values (?,?)",
      [name, email]
    );
    res.json({ id: result.insertId, name, email });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while inserting record", details: error.message });
  }
});

app.put("/edit-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const [result] = await pool.query(
      "update student set name = ?, email = ? where id = ?",
      [name, email, id]
    );
    res.json({ updated: result.affectedRows });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while updating record", details: error.message });
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("delete from student where id = ?", [id]);
    res.json({ deleted: result.affectedRows });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while deleting record", details: error.message });
  }
});

const PORT = process.env.APP_PORT || 8081;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
