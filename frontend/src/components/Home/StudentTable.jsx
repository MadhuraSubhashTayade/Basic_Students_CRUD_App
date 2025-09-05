import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentTable.css";
import { Link } from "react-router";

const API_BASE = process.env.REACT_APP_API_URL;

export const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/`)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => setError(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/delete-student/${id}`);
      window.location.reload();
    } catch (error) {
      console.log("error while deleting record,", error);
    }
  };

  if (error) return <p>`Nothing to display, error from server ${error}`</p>;

  return (
    <div className="container">
      <div className="inner-container">
        <Link to="/add-student" className="btn-add">
          Add New Student +
        </Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td className="actions-row">
                    <Link
                      to={`/edit-student/${student.id}`}
                      className="btn-edit"
                    >
                      Update
                    </Link>
                    <button onClick={() => handleDelete(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
