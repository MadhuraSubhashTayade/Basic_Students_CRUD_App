import axios from "axios";
import React, { useState } from "react";
import "./CreateStudent.css";
import { useNavigate } from "react-router";

export const CreateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/add-student", { name, email })
      .then((res) => {
        console.log("Student added!", res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log("error while adding student!!!", err);
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleFormSubmit}>
          <h2>Add Student</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
