import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { StudentTable } from "./components/Home/StudentTable";
import { CreateStudent } from "./components/CreateStudent/CreateStudent";
import { UpdateStudent } from "./components/UpdateStudent/UpdateStudent";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/add-student" element={<CreateStudent />} />
        <Route path="/edit-student" element={<UpdateStudent />} />
      </Routes>
    </BrowserRouter>
  );
};
