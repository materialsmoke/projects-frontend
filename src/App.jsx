import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import ProjectsPage from './Pages/ProjectsPage';
import ProjectDetailsPage from './Pages/ProjectDetailsPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path='/projects/:id' element={<ProjectDetailsPage/>} />
    </Routes>
  );
}

export default App;
