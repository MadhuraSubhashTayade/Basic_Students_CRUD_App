🎓 Students CRUD App

A full-stack Create, Read, Update, Delete (CRUD) application built with:

Frontend: React + React Router + Axios

Backend: Node.js + Express.js + MySQL

Database: MySQL

The app allows you to manage student records with a simple interface for adding, editing, deleting, and viewing students.

---

🚀 Features

📋 List Students: View all students in a table.

➕ Add Student: Insert new student records.

✏️ Update Student: Edit an existing student by ID.

❌ Delete Student: Remove a student from the database.

---

🔗 Routing with React Router:

/ → Show all students

/add-student → Add a new student

/edit-student/:id → Update a student

---

📂 Project Structure
Basic_Students_CRUD_App/
├── frontend/ # React frontend
│ ├── src/
│ │ ├── App.js
│ │ ├── components/
│ │ │ ├── Home/StudentTable.js
│ │ │ ├── CreateStudent/CreateStudent.js
│ │ │ ├── UpdateStudent/UpdateStudent.js
│ │ └── ...
│ └── package.json
│
├── backend/ # Node + Express backend
│ ├── server.js
│ └── package.json
│
├── .gitignore
└── README.md

---

⚙️ Setup Instructions

1. Clone the repository
   git clone https://github.com/MadhuraSubhashTayade/Basic_Students_CRUD_App.git
   cd Basic_Students_CRUD_App

2. Setup the Backend

Navigate to backend:

cd backend
npm install

Configure MySQL database:

Create a database:

CREATE DATABASE crud_app;

Create student table:

CREATE TABLE student (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100)
);

Start the backend server:

node server.js

Runs at 👉 http://localhost:8081

3. Setup the Frontend

Navigate to frontend:

cd ../frontend
npm install

Start the React app:

npm start

Runs at 👉 http://localhost:3000

---

🔄 API Endpoints
Method Endpoint Description
GET / Get all students
POST /add-student Add new student
PUT /edit-student/:id Update existing student
DELETE /delete-student/:id Delete student by ID

---

📌 Notes
Frontend assumes backend is running on http://localhost:8081.

Change the API base URL in frontend Axios calls if backend runs elsewhere.

Do not commit node_modules/ (already in .gitignore)
