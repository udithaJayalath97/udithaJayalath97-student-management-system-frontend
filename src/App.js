import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursesPage from './pages/CoursePage';
import StudentsPage from './pages/StudentPage';
import EnrollmentsPage from './pages/EnrollmentsPage';
import ResultsPage from './pages/ResultsPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/enrollments" element={<EnrollmentsPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



