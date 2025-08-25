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

app.listen(8081, () => {
  console.log("listening to port 8081");
});
