import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@src/context/AuthContext";
import PrivateRoute from "@src/context/PrivateRoute";
import "@src/style/index.css";
import App from "@src/pages/App";
import Home from "@src/pages/Home";
import Profile from "@src/pages/Profile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
