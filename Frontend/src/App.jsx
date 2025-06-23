import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageRoutes from "./Routes/PageRoutes";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Include more routes directly or use PageRoutes if it returns <Route /> elements */}
        <Route path="/*" element={<PageRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
