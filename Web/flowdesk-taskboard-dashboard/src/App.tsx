import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Layout/Navbar.tsx";
import HomePage from "./Components/Pages/HomePage.tsx";
import ProjectsPage from "./Components/Pages/ProjectsPage.tsx";
import LoginPage from "./Components/Pages/LoginPage.tsx";
import PrivateRoute from "./Components/Pages/Auth/PrivateRoute.tsx";
import TasksPage from "./Components/Pages/TaskPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/loginPage" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            </>
          }
        />

        <Route
          path="/projectsPage"
          element={
            <>
              <Navbar />
              <PrivateRoute>
                <ProjectsPage />
              </PrivateRoute>
            </>
          }
        />
        <Route
        path="/projects/:projectId/tasks"
        element={
        <PrivateRoute>
          <>
            <Navbar />
            <TasksPage />
          </>
        </PrivateRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;