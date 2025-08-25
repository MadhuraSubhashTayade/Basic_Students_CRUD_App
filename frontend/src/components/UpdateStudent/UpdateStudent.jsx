import axios from "axios";
import React, { useState } from "react";
import "./UpdateStudent.css";
import { useNavigate, useParams } from "react-router";

export const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/edit-student/${id}`, { name, email })
      .then((res) => {
        console.log("Student updated!", res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log("error while updating student!!!", err);
      });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleFormSubmit}>
          <h2>Update Student</h2>
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
          <button className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};
