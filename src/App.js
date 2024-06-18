import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import './App.css';
import Login from "./Login";
import Search from "./Search";
import Match from "./Match";

function App() {
  return (
    <div className="App">

      {/* Router setup */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/matched-dog/:id" element={<Match />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
