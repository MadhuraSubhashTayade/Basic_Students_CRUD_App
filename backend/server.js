const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_app",
});

db.connect((err, str) => {
  if (err) console.log("Error while connecting to db: ", err);
  console.log(
    "Connected to db successfully with thread id: ",
    db.threadId + "\n" + str
  );
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

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("listening to port 8081");
});
