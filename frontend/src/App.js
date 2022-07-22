import React from "react";
import "./App.css";
import { BrowserRouter as BRouter, Routes, Route } from "react-router-dom";
import { Home, Admin, Student } from "./pages/index";

const App = () => {
  return (
    <BRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BRouter>
  );
};

export default App;
